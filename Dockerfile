FROM hayd/deno:alpine-1.0.0-rc2 AS build

#
#--------------------------------------------------------------------------
# Install deps
#--------------------------------------------------------------------------
#

ARG CLOUD_SDK_VERSION=292.0.0
ENV CLOUD_SDK_VERSION=$CLOUD_SDK_VERSION
ENV CLOUDSDK_PYTHON=python3
ENV PATH /google-cloud-sdk/bin:$PATH

RUN apk --no-cache add \
        make \
        curl \
        python3 \
        py3-crcmod \
        bash \
        openssh \
        git \
        gnupg \
    && curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    gcloud config set core/disable_usage_reporting true && \
    gcloud config set component_manager/disable_update_check true && \
    gcloud config set metrics/environment github_docker_image && \
    gcloud --version

RUN gcloud components install kubectl

#
#--------------------------------------------------------------------------
# Run
#--------------------------------------------------------------------------
#

RUN mkdir -p /var/drone-gke-plugin

ADD . /var/drone-gke-plugin

WORKDIR /var/drone-gke-plugin

RUN make build

ENTRYPOINT ["make"]

CMD ["run"]
