FROM debian:stretch

ENV GNU_HOST=arm-linux-gnueabihf
ENV C_COMPILER_ARM_LINUX=$GNU_HOST-gcc
ENV CXX_COMPILER_ARM_LINUX=$GNU_HOST-g++

ENV CROSS_INSTALL_PREFIX=/usr/$GNU_HOST
ENV CROSS_TOOLCHAIN=/arm.toolchain.cmake

# https://cmake.org/cmake/help/v3.16/manual/cmake-toolchains.7.html#cross-compiling-for-linux
# https://cmake.org/cmake/help/v2.8.11/cmake.html#variable%3aCMAKE_PREFIX_PATH
RUN echo "set(CMAKE_SYSTEM_NAME Linux)" >> $CROSS_TOOLCHAIN && \
  echo "set(CMAKE_SYSTEM_PROCESSOR arm)" >> $CROSS_TOOLCHAIN && \
  echo "set(CMAKE_C_COMPILER /usr/bin/$C_COMPILER_ARM_LINUX)" >> $CROSS_TOOLCHAIN && \
  echo "set(CMAKE_CXX_COMPILER /usr/bin/$CXX_COMPILER_ARM_LINUX)" >> $CROSS_TOOLCHAIN && \
  echo "set(CMAKE_PREFIX_PATH $CROSS_INSTALL_PREFIX)" >> $CROSS_TOOLCHAIN

RUN apt-get update && \
  apt-get --no-install-recommends install -y autoconf \
    automake \
    build-essential \
    ca-certificates \
    curl \
    # C/C++ cross compilers
    gcc-$GNU_HOST \
    g++-$GNU_HOST \
    git \
    gnupg \
    libssl-dev \
    openssh-client \
    pkg-config \
    software-properties-common \
    wget && \
  rm -rf /var/lib/apt/lists/*

ENV CMAKE_VERSION 3.16.4

RUN export CMAKE_DIR=cmake-$CMAKE_VERSION && \
  export CMAKE_ARCH=$CMAKE_DIR.tar.gz && \
  wget --progress=bar:force:noscroll https://github.com/Kitware/CMake/releases/download/v$CMAKE_VERSION/$CMAKE_ARCH && \
  tar -xzf $CMAKE_ARCH && \
  cd $CMAKE_DIR && \
  ./bootstrap --parallel=`nproc` && \
  make -j `nproc` && \
  make install && \
  rm -rf ../$CMAKE_ARCH \
    ../$CMAKE_DIR

#ADD https://golang.org/dl/go1.15.7.linux-armv6l.tar.gz /tmp/
ADD https://golang.org/dl/go1.15.7.linux-arm64.tar.gz /tmp/
RUN tar -C /usr/local -xzf /tmp/go1.15.7.linux-arm64.tar.gz
ENV PATH="/usr/local/go/bin:${PATH}"

# NOTE: These versions must be the same on the target host
ENV RPI_SHA=f73fca0
ENV WIRINGPI_SHA=6d9ce35

# MMAL/VCOS (https://github.com/raspberrypi/userland)
RUN RPI_DIR=/raspberrypi && \
  RPI_BUILD_DIR=$RPI_DIR/build/arm-linux/release && \
  git clone --single-branch --branch master https://github.com/raspberrypi/userland.git $RPI_DIR && \
  cd $RPI_DIR && \
  git checkout $RPI_SHA && \
  mkdir -p $RPI_BUILD_DIR && \
  cd $RPI_BUILD_DIR && \
  cmake -DCMAKE_TOOLCHAIN_FILE=../../../makefiles/cmake/toolchains/arm-linux-gnueabihf.cmake \
    -DCMAKE_BUILD_TYPE=Release \
    ../../.. && \
  make -j `nproc` && \
  make install DESTDIR=$CROSS_INSTALL_PREFIX/ && \
  cd / && \
  rm -rf $RPI_DIR && \
  # WiringPi
  # https://github.com/WiringPi/WiringPi
  WPI_DIR=/wpi && \
  WPI_WIRING_PI_DIR=$WPI_DIR/wiringPi && \
  git clone --single-branch --branch master https://github.com/WiringPi/WiringPi.git $WPI_DIR && \
  cd $WPI_DIR && \
  git checkout $WIRINGPI_SHA && \
  cd $WPI_WIRING_PI_DIR && \
  CC=$C_COMPILER_ARM_LINUX make -j `nproc` && \
  make install DESTDIR=$CROSS_INSTALL_PREFIX PREFIX="" && \
  cd / && \
  rm -rf $WPI_DIR

# This is supposed to fail
RUN go get github.com/mcuadros/go-rpi-rgb-led-matrix || true

RUN cd /root/go/src/github.com/mcuadros/go-rpi-rgb-led-matrix/vendor/rpi-rgb-led-matrix && \
    make && \
    cd /root/go/src/github.com/mcuadros/go-rpi-rgb-led-matrix && \
    rm -rf examples && \
    go install -v ./...
