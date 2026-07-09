FROM ubuntu:22.04

RUN dpkg --add-architecture i386 && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    curl \
    lib32gcc-s1 \
    lib32stdc++6 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install and initialize SteamCMD natively to avoid Windows WSL2 file-lock issues during self-update
RUN mkdir /steamcmd && \
    cd /steamcmd && \
    curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf - && \
    ./steamcmd.sh +quit

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
