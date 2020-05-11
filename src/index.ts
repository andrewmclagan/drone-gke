import Plugin from "./Plugin.ts";

let config = Plugin.getEnvConfig();

new Plugin(config).run();
