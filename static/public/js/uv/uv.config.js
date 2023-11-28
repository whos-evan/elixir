self.__uv$config = {
    prefix: '/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/js/uv/uv.handler.js',
    bundle: '/js/uv/uv.bundle.js',
    config: '/js/uv/uv.config.js',
    sw: '/js/uv/uv.sw.js',
};
