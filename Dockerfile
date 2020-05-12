FROM hayd/deno:alpine-1.0.0-rc2

ARG CLOUD_SDK_VERSION=290.0.0

ENV CLOUD_SDK_VERSION=$CLOUD_SDK_VERSION

ENV PATH /google-cloud-sdk/bin:$PATH

ENV CLOUDSDK_CONTAINER_USE_CLIENT_CERTIFICATE False

#
#--------------------------------------------------------------------------
# Install deps
#--------------------------------------------------------------------------
#

RUN apk --no-cache add \
        make \
        curl \
        python \
        py-crcmod \
        bash \
        openssh-client \
        git \
        gnupg \
    && curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    ln -s /lib /lib64 && \
    gcloud config set core/disable_usage_reporting true && \
    gcloud config set component_manager/disable_update_check true && \
    gcloud config set metrics/environment github_docker_image && \
    gcloud config unset container/use_client_certificate && \
    # Smoke test, its installed.
    gcloud --version

#
#--------------------------------------------------------------------------
# Install kubectl
#--------------------------------------------------------------------------
#

RUN gcloud components update kubectl

#
#--------------------------------------------------------------------------
# Build and run entrypoint
#--------------------------------------------------------------------------
#

RUN mkdir -p /var/drone-gke-plugin

ADD . /var/drone-gke-plugin

WORKDIR /var/drone-gke-plugin

# add deps to cache
RUN make bundle

ENTRYPOINT ["make"]

CMD ["run"]
