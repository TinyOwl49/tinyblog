---
title: "Discord.py+VoiceVox+Dockerで読み上げBotを作る"
slug: "discord-yomiage"
date: "2025/06/15"
author: tinyowl
description: "ずんだもんにチャンネルの発言を読み上げてもらいます。"
thumbnail: "/imgs/zunda.png"
tag: "programming"
---

## この記事の目標
DiscordのBotを作成し、VoiceVoxを使って発言を読み上げるBotを作成することです。
ついでにDockerでコンテナ化して、どこでも動くようにします。
なお私はDocker初心者なので、本当にこれでいいのかは疑問です。

## 参考
- [Discord.pyのドキュメント](https://discordpy.readthedocs.io/ja/stable/)
- [Github VOICEVOX Engine](https://github.com/VOICEVOX/voicevox_engine)

## Discord Botの作成
discord.pyをインストールします。
```bash
pip install "discord.py[voice]"
```
\[voice\]オプションをつけることで、音声機能を使用するために必要なライブラリもインストールされます。
\"\"をつけないとエラーが出る場合があるので注意してください。

VoiceVoxと通信するために、requestsもインストールします。
```bash
pip install requests
```

### 全体のコード
```py:bot.py 
import io
import asyncio
import os
from dotenv import load_dotenv
import discord
from discord.ext import commands
import voice

# .envファイルにTOKENを設定します。
load_dotenv()
TOKEN = os.getenv("TOKEN")
if not TOKEN:
    raise ValueError("TOKENが取得できません。")


intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="$", intents=intents)


VOICE_CHANNEL = {
    "yomiage": False,
    "channel": None,
}


@bot.command()
async def join(ctx: commands.Context):
    if ctx.author.voice is None:
        await ctx.send("あなたはボイスチャンネルに接続していません。")
        return

    await ctx.author.voice.channel.connect()

    await ctx.send("接続しました。")


@bot.command()
async def leave(ctx: commands.Context):
    if ctx.guild.voice_client is None:
        await ctx.send("ボイスチャンネルに接続していません。")
        return

    await ctx.guild.voice_client.disconnect()

    
    VOICE_CHANNEL["yomiage"] = False
    VOICE_CHANNEL["channel"] = None
    await ctx.send("切断しました。")


@bot.command()
async def yomiage(ctx, arg):
    if ctx.guild.voice_client is None:
        await ctx.send("ボイスチャンネルに接続していません。")
        return

    if arg == "on":
        VOICE_CHANNEL["yomiage"] = True
        VOICE_CHANNEL["channel"] = ctx.author.voice.channel
        await ctx.send("読み上げを開始します")
    elif arg == "off":
        VOICE_CHANNEL["yomiage"] = False
        VOICE_CHANNEL["channel"] = None
        await ctx.send("読み上げを終了します")

@bot.event
async def on_ready():
    print(f"We have logged in as {bot.user}")


@bot.listen()
async def on_message(message):
    if message.author == bot.user:
        return

    # コマンドだったら無視
    if message.content.startswith('$'):
        return

    # $yomiage on が実行されたチャンネルのメッセージだけを読み上げる
    if VOICE_CHANNEL["yomiage"] and message.channel == VOICE_CHANNEL["channel"]:
        fp = "./out/output.wav" # 生成した音声ファイルのパス
        voice.synthesize_voice(message.content, fp) # 音声を生成
        message.guild.voice_client.play(discord.FFmpegPCMAudio(fp)) # Discordへ送信


bot.run(TOKEN)
```
voice.pyでVOICEVOXを使って音声合成を行います。     
  
```python:voice.py
import requests
import json

# Dockerコンテナ内でVOICEVOXエンジンが動作している場合のURL
VOICEVOX_ENGINE_URL = "http://voicevox_engine:50021"


def synthesize_voice(text, filename, speaker=1):
    # 1. テキストから音声合成のためのクエリを作成
    query_payload = {"text": text, "speaker": speaker}
    query_response = requests.post(
        f"{VOICEVOX_ENGINE_URL}/audio_query", params=query_payload
    )

    if query_response.status_code != 200:
        print(f"Error in audio_query: {query_response.text}")
        return

    query = query_response.json()

    # 2. クエリを元に音声データを生成
    synthesis_payload = {"speaker": speaker}
    synthesis_response = requests.post(
        f"{VOICEVOX_ENGINE_URL}/synthesis", params=synthesis_payload, json=query
    )

    if synthesis_response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(synthesis_response.content)
        print(f"音声が {filename} に保存されました。")
    else:
        print(f"Error in synthesis: {synthesis_response.text}")
```
## Dockerで実行
### ファイル構成
```
├── docker-compose.yml  
├── Dockerfile  
└── src  
    ├── bot.py  
    ├── voice.py  
    └── voice.py  
```
srcディレクトリにbot.pyとvoice.pyを配置し、CMDで実行することを想定しています。
```yaml:docker-compose.yaml
version: '3'
services:
  discordbot:
    restart: always
    build: .
    working_dir: '/root/'
    env_file:
      - ./.env 
    tty: true
    volumes:
      - ./src:/root/src

  voicevox_engine:
    # NOTE: arm64 linux版
    image: voicevox/voicevox_engine:cpu-arm64-latest
    
    # VOICEVOXエンジンのAPIポートをホストのポート50021にマッピング
    ports:
      - "50021:50021"
    
    # コンテナが停止した場合に自動的に再起動するように設定
    restart: unless-stopped
    
    container_name: voicevox_engine_container
```
  

  
```docker:Dockerfile
FROM python:3
USER root

RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

RUN apt-get install -y vim less
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools


RUN apt update
RUN apt install -y ffmpeg libopus0 libopus-dev
RUN python -m pip install "discord.py[voice]" python-dotenv requests
RUN mkdir -p /root/out

CMD ["python", "src/bot.py"]
```


