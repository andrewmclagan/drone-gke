// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("file:///Users/andrewmclagan/development/drone-gke/src/utils", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function base64Decode(value) {
        try {
            return atob(value);
        }
        catch (error) {
            return "";
        }
    }
    exports_1("base64Decode", base64Decode);
    function jsonParse(value) {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            return {};
        }
    }
    exports_1("jsonParse", jsonParse);
    function jsonStringify(value) {
        try {
            return JSON.stringify(value);
        }
        catch (error) {
            return "";
        }
    }
    exports_1("jsonStringify", jsonStringify);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Env", ["file:///Users/andrewmclagan/development/drone-gke/src/utils"], function (exports_2, context_2) {
    "use strict";
    var utils_ts_1, Env;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            }
        ],
        execute: function () {
            Env = class Env {
                static get(key, fallback = "") {
                    let keys = typeof key === "string" ? [key] : key;
                    let value = "";
                    for (let attempt of keys) {
                        if (Deno.env.get(attempt)) {
                            value = Deno.env.get(attempt);
                            break;
                        }
                    }
                    return value || fallback;
                }
                static getJson(key) {
                    let value = Env.get(key);
                    return value ? utils_ts_1.jsonParse(value) : {};
                }
            };
            exports_2("default", Env);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Cmd", [], function (exports_3, context_3) {
    "use strict";
    var Cmd;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Cmd = class Cmd {
                async run(cmd) {
                    const process = Deno.run({ cmd: cmd });
                    const status = await process.status();
                    process.close();
                    return status.success;
                }
            };
            exports_3("default", Cmd);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/config", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/path/interface", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std/path/constants", [], function (exports_6, context_6) {
    "use strict";
    var build, CHAR_UPPERCASE_A, CHAR_LOWERCASE_A, CHAR_UPPERCASE_Z, CHAR_LOWERCASE_Z, CHAR_DOT, CHAR_FORWARD_SLASH, CHAR_BACKWARD_SLASH, CHAR_VERTICAL_LINE, CHAR_COLON, CHAR_QUESTION_MARK, CHAR_UNDERSCORE, CHAR_LINE_FEED, CHAR_CARRIAGE_RETURN, CHAR_TAB, CHAR_FORM_FEED, CHAR_EXCLAMATION_MARK, CHAR_HASH, CHAR_SPACE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_LEFT_ANGLE_BRACKET, CHAR_RIGHT_ANGLE_BRACKET, CHAR_LEFT_CURLY_BRACKET, CHAR_RIGHT_CURLY_BRACKET, CHAR_HYPHEN_MINUS, CHAR_PLUS, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_PERCENT, CHAR_SEMICOLON, CHAR_CIRCUMFLEX_ACCENT, CHAR_GRAVE_ACCENT, CHAR_AT, CHAR_AMPERSAND, CHAR_EQUAL, CHAR_0, CHAR_9, isWindows, EOL, SEP, SEP_PATTERN;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            build = Deno.build;
            // Alphabet chars.
            exports_6("CHAR_UPPERCASE_A", CHAR_UPPERCASE_A = 65); /* A */
            exports_6("CHAR_LOWERCASE_A", CHAR_LOWERCASE_A = 97); /* a */
            exports_6("CHAR_UPPERCASE_Z", CHAR_UPPERCASE_Z = 90); /* Z */
            exports_6("CHAR_LOWERCASE_Z", CHAR_LOWERCASE_Z = 122); /* z */
            // Non-alphabetic chars.
            exports_6("CHAR_DOT", CHAR_DOT = 46); /* . */
            exports_6("CHAR_FORWARD_SLASH", CHAR_FORWARD_SLASH = 47); /* / */
            exports_6("CHAR_BACKWARD_SLASH", CHAR_BACKWARD_SLASH = 92); /* \ */
            exports_6("CHAR_VERTICAL_LINE", CHAR_VERTICAL_LINE = 124); /* | */
            exports_6("CHAR_COLON", CHAR_COLON = 58); /* : */
            exports_6("CHAR_QUESTION_MARK", CHAR_QUESTION_MARK = 63); /* ? */
            exports_6("CHAR_UNDERSCORE", CHAR_UNDERSCORE = 95); /* _ */
            exports_6("CHAR_LINE_FEED", CHAR_LINE_FEED = 10); /* \n */
            exports_6("CHAR_CARRIAGE_RETURN", CHAR_CARRIAGE_RETURN = 13); /* \r */
            exports_6("CHAR_TAB", CHAR_TAB = 9); /* \t */
            exports_6("CHAR_FORM_FEED", CHAR_FORM_FEED = 12); /* \f */
            exports_6("CHAR_EXCLAMATION_MARK", CHAR_EXCLAMATION_MARK = 33); /* ! */
            exports_6("CHAR_HASH", CHAR_HASH = 35); /* # */
            exports_6("CHAR_SPACE", CHAR_SPACE = 32); /*   */
            exports_6("CHAR_NO_BREAK_SPACE", CHAR_NO_BREAK_SPACE = 160); /* \u00A0 */
            exports_6("CHAR_ZERO_WIDTH_NOBREAK_SPACE", CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279); /* \uFEFF */
            exports_6("CHAR_LEFT_SQUARE_BRACKET", CHAR_LEFT_SQUARE_BRACKET = 91); /* [ */
            exports_6("CHAR_RIGHT_SQUARE_BRACKET", CHAR_RIGHT_SQUARE_BRACKET = 93); /* ] */
            exports_6("CHAR_LEFT_ANGLE_BRACKET", CHAR_LEFT_ANGLE_BRACKET = 60); /* < */
            exports_6("CHAR_RIGHT_ANGLE_BRACKET", CHAR_RIGHT_ANGLE_BRACKET = 62); /* > */
            exports_6("CHAR_LEFT_CURLY_BRACKET", CHAR_LEFT_CURLY_BRACKET = 123); /* { */
            exports_6("CHAR_RIGHT_CURLY_BRACKET", CHAR_RIGHT_CURLY_BRACKET = 125); /* } */
            exports_6("CHAR_HYPHEN_MINUS", CHAR_HYPHEN_MINUS = 45); /* - */
            exports_6("CHAR_PLUS", CHAR_PLUS = 43); /* + */
            exports_6("CHAR_DOUBLE_QUOTE", CHAR_DOUBLE_QUOTE = 34); /* " */
            exports_6("CHAR_SINGLE_QUOTE", CHAR_SINGLE_QUOTE = 39); /* ' */
            exports_6("CHAR_PERCENT", CHAR_PERCENT = 37); /* % */
            exports_6("CHAR_SEMICOLON", CHAR_SEMICOLON = 59); /* ; */
            exports_6("CHAR_CIRCUMFLEX_ACCENT", CHAR_CIRCUMFLEX_ACCENT = 94); /* ^ */
            exports_6("CHAR_GRAVE_ACCENT", CHAR_GRAVE_ACCENT = 96); /* ` */
            exports_6("CHAR_AT", CHAR_AT = 64); /* @ */
            exports_6("CHAR_AMPERSAND", CHAR_AMPERSAND = 38); /* & */
            exports_6("CHAR_EQUAL", CHAR_EQUAL = 61); /* = */
            // Digits
            exports_6("CHAR_0", CHAR_0 = 48); /* 0 */
            exports_6("CHAR_9", CHAR_9 = 57); /* 9 */
            exports_6("isWindows", isWindows = build.os === "windows");
            exports_6("EOL", EOL = isWindows ? "\r\n" : "\n");
            exports_6("SEP", SEP = isWindows ? "\\" : "/");
            exports_6("SEP_PATTERN", SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/);
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std/path/utils", ["https://deno.land/std/path/constants"], function (exports_7, context_7) {
    "use strict";
    var constants_ts_1;
    var __moduleName = context_7 && context_7.id;
    function assertPath(path) {
        if (typeof path !== "string") {
            throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
        }
    }
    exports_7("assertPath", assertPath);
    function isPosixPathSeparator(code) {
        return code === constants_ts_1.CHAR_FORWARD_SLASH;
    }
    exports_7("isPosixPathSeparator", isPosixPathSeparator);
    function isPathSeparator(code) {
        return isPosixPathSeparator(code) || code === constants_ts_1.CHAR_BACKWARD_SLASH;
    }
    exports_7("isPathSeparator", isPathSeparator);
    function isWindowsDeviceRoot(code) {
        return ((code >= constants_ts_1.CHAR_LOWERCASE_A && code <= constants_ts_1.CHAR_LOWERCASE_Z) ||
            (code >= constants_ts_1.CHAR_UPPERCASE_A && code <= constants_ts_1.CHAR_UPPERCASE_Z));
    }
    exports_7("isWindowsDeviceRoot", isWindowsDeviceRoot);
    // Resolves . and .. elements in a path with directory names
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
        let res = "";
        let lastSegmentLength = 0;
        let lastSlash = -1;
        let dots = 0;
        let code;
        for (let i = 0, len = path.length; i <= len; ++i) {
            if (i < len)
                code = path.charCodeAt(i);
            else if (isPathSeparator(code))
                break;
            else
                code = constants_ts_1.CHAR_FORWARD_SLASH;
            if (isPathSeparator(code)) {
                if (lastSlash === i - 1 || dots === 1) {
                    // NOOP
                }
                else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 ||
                        lastSegmentLength !== 2 ||
                        res.charCodeAt(res.length - 1) !== constants_ts_1.CHAR_DOT ||
                        res.charCodeAt(res.length - 2) !== constants_ts_1.CHAR_DOT) {
                        if (res.length > 2) {
                            const lastSlashIndex = res.lastIndexOf(separator);
                            if (lastSlashIndex === -1) {
                                res = "";
                                lastSegmentLength = 0;
                            }
                            else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                        else if (res.length === 2 || res.length === 1) {
                            res = "";
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        if (res.length > 0)
                            res += `${separator}..`;
                        else
                            res = "..";
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0)
                        res += separator + path.slice(lastSlash + 1, i);
                    else
                        res = path.slice(lastSlash + 1, i);
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === constants_ts_1.CHAR_DOT && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    exports_7("normalizeString", normalizeString);
    function _format(sep, pathObject) {
        const dir = pathObject.dir || pathObject.root;
        const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
        if (!dir)
            return base;
        if (dir === pathObject.root)
            return dir + base;
        return dir + sep + base;
    }
    exports_7("_format", _format);
    return {
        setters: [
            function (constants_ts_1_1) {
                constants_ts_1 = constants_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/fmt/colors", [], function (exports_8, context_8) {
    "use strict";
    var noColor, enabled;
    var __moduleName = context_8 && context_8.id;
    function setColorEnabled(value) {
        if (noColor) {
            return;
        }
        enabled = value;
    }
    exports_8("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
        return enabled;
    }
    exports_8("getColorEnabled", getColorEnabled);
    function code(open, close) {
        return {
            open: `\x1b[${open}m`,
            close: `\x1b[${close}m`,
            regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
        };
    }
    function run(str, code) {
        return enabled
            ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
            : str;
    }
    function reset(str) {
        return run(str, code(0, 0));
    }
    exports_8("reset", reset);
    function bold(str) {
        return run(str, code(1, 22));
    }
    exports_8("bold", bold);
    function dim(str) {
        return run(str, code(2, 22));
    }
    exports_8("dim", dim);
    function italic(str) {
        return run(str, code(3, 23));
    }
    exports_8("italic", italic);
    function underline(str) {
        return run(str, code(4, 24));
    }
    exports_8("underline", underline);
    function inverse(str) {
        return run(str, code(7, 27));
    }
    exports_8("inverse", inverse);
    function hidden(str) {
        return run(str, code(8, 28));
    }
    exports_8("hidden", hidden);
    function strikethrough(str) {
        return run(str, code(9, 29));
    }
    exports_8("strikethrough", strikethrough);
    function black(str) {
        return run(str, code(30, 39));
    }
    exports_8("black", black);
    function red(str) {
        return run(str, code(31, 39));
    }
    exports_8("red", red);
    function green(str) {
        return run(str, code(32, 39));
    }
    exports_8("green", green);
    function yellow(str) {
        return run(str, code(33, 39));
    }
    exports_8("yellow", yellow);
    function blue(str) {
        return run(str, code(34, 39));
    }
    exports_8("blue", blue);
    function magenta(str) {
        return run(str, code(35, 39));
    }
    exports_8("magenta", magenta);
    function cyan(str) {
        return run(str, code(36, 39));
    }
    exports_8("cyan", cyan);
    function white(str) {
        return run(str, code(37, 39));
    }
    exports_8("white", white);
    function gray(str) {
        return run(str, code(90, 39));
    }
    exports_8("gray", gray);
    function bgBlack(str) {
        return run(str, code(40, 49));
    }
    exports_8("bgBlack", bgBlack);
    function bgRed(str) {
        return run(str, code(41, 49));
    }
    exports_8("bgRed", bgRed);
    function bgGreen(str) {
        return run(str, code(42, 49));
    }
    exports_8("bgGreen", bgGreen);
    function bgYellow(str) {
        return run(str, code(43, 49));
    }
    exports_8("bgYellow", bgYellow);
    function bgBlue(str) {
        return run(str, code(44, 49));
    }
    exports_8("bgBlue", bgBlue);
    function bgMagenta(str) {
        return run(str, code(45, 49));
    }
    exports_8("bgMagenta", bgMagenta);
    function bgCyan(str) {
        return run(str, code(46, 49));
    }
    exports_8("bgCyan", bgCyan);
    function bgWhite(str) {
        return run(str, code(47, 49));
    }
    exports_8("bgWhite", bgWhite);
    return {
        setters: [],
        execute: function () {
            // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
            /**
             * A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
             * on npm.
             *
             * ```
             * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
             * console.log(bgBlue(red(bold("Hello world!"))));
             * ```
             *
             * This module supports `NO_COLOR` environmental variable disabling any coloring
             * if `NO_COLOR` is set.
             */
            noColor = Deno.noColor;
            enabled = !noColor;
        }
    };
});
System.register("https://deno.land/std/testing/diff", [], function (exports_9, context_9) {
    "use strict";
    var DiffType, REMOVED, COMMON, ADDED;
    var __moduleName = context_9 && context_9.id;
    function createCommon(A, B, reverse) {
        const common = [];
        if (A.length === 0 || B.length === 0)
            return [];
        for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
            if (A[reverse ? A.length - i - 1 : i] === B[reverse ? B.length - i - 1 : i]) {
                common.push(A[reverse ? A.length - i - 1 : i]);
            }
            else {
                return common;
            }
        }
        return common;
    }
    function diff(A, B) {
        const prefixCommon = createCommon(A, B);
        const suffixCommon = createCommon(A.slice(prefixCommon.length), B.slice(prefixCommon.length), true).reverse();
        A = suffixCommon.length
            ? A.slice(prefixCommon.length, -suffixCommon.length)
            : A.slice(prefixCommon.length);
        B = suffixCommon.length
            ? B.slice(prefixCommon.length, -suffixCommon.length)
            : B.slice(prefixCommon.length);
        const swapped = B.length > A.length;
        [A, B] = swapped ? [B, A] : [A, B];
        const M = A.length;
        const N = B.length;
        if (!M && !N && !suffixCommon.length && !prefixCommon.length)
            return [];
        if (!N) {
            return [
                ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
                ...A.map((a) => ({
                    type: swapped ? DiffType.added : DiffType.removed,
                    value: a,
                })),
                ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
            ];
        }
        const offset = N;
        const delta = M - N;
        const size = M + N + 1;
        const fp = new Array(size).fill({ y: -1 });
        /**
         * INFO:
         * This buffer is used to save memory and improve performance.
         * The first half is used to save route and last half is used to save diff
         * type.
         * This is because, when I kept new uint8array area to save type,performance
         * worsened.
         */
        const routes = new Uint32Array((M * N + size + 1) * 2);
        const diffTypesPtrOffset = routes.length / 2;
        let ptr = 0;
        let p = -1;
        function backTrace(A, B, current, swapped) {
            const M = A.length;
            const N = B.length;
            const result = [];
            let a = M - 1;
            let b = N - 1;
            let j = routes[current.id];
            let type = routes[current.id + diffTypesPtrOffset];
            while (true) {
                if (!j && !type)
                    break;
                const prev = j;
                if (type === REMOVED) {
                    result.unshift({
                        type: swapped ? DiffType.removed : DiffType.added,
                        value: B[b],
                    });
                    b -= 1;
                }
                else if (type === ADDED) {
                    result.unshift({
                        type: swapped ? DiffType.added : DiffType.removed,
                        value: A[a],
                    });
                    a -= 1;
                }
                else {
                    result.unshift({ type: DiffType.common, value: A[a] });
                    a -= 1;
                    b -= 1;
                }
                j = routes[prev];
                type = routes[prev + diffTypesPtrOffset];
            }
            return result;
        }
        function createFP(slide, down, k, M) {
            if (slide && slide.y === -1 && down && down.y === -1) {
                return { y: 0, id: 0 };
            }
            if ((down && down.y === -1) ||
                k === M ||
                (slide && slide.y) > (down && down.y) + 1) {
                const prev = slide.id;
                ptr++;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = ADDED;
                return { y: slide.y, id: ptr };
            }
            else {
                const prev = down.id;
                ptr++;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = REMOVED;
                return { y: down.y + 1, id: ptr };
            }
        }
        function snake(k, slide, down, _offset, A, B) {
            const M = A.length;
            const N = B.length;
            if (k < -N || M < k)
                return { y: -1, id: -1 };
            const fp = createFP(slide, down, k, M);
            while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
                const prev = fp.id;
                ptr++;
                fp.id = ptr;
                fp.y += 1;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = COMMON;
            }
            return fp;
        }
        while (fp[delta + offset].y < N) {
            p = p + 1;
            for (let k = -p; k < delta; ++k) {
                fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
            }
            for (let k = delta + p; k > delta; --k) {
                fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
            }
            fp[delta + offset] = snake(delta, fp[delta - 1 + offset], fp[delta + 1 + offset], offset, A, B);
        }
        return [
            ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
            ...backTrace(A, B, fp[delta + offset], swapped),
            ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ];
    }
    exports_9("default", diff);
    return {
        setters: [],
        execute: function () {
            (function (DiffType) {
                DiffType["removed"] = "removed";
                DiffType["common"] = "common";
                DiffType["added"] = "added";
            })(DiffType || (DiffType = {}));
            exports_9("DiffType", DiffType);
            REMOVED = 1;
            COMMON = 2;
            ADDED = 3;
        }
    };
});
System.register("https://deno.land/std/testing/asserts", ["https://deno.land/std/fmt/colors", "https://deno.land/std/testing/diff"], function (exports_10, context_10) {
    "use strict";
    var colors_ts_1, diff_ts_1, CAN_NOT_DISPLAY, AssertionError;
    var __moduleName = context_10 && context_10.id;
    function format(v) {
        let string = Deno.inspect(v);
        if (typeof v == "string") {
            string = `"${string.replace(/(?=["\\])/g, "\\")}"`;
        }
        return string;
    }
    function createColor(diffType) {
        switch (diffType) {
            case diff_ts_1.DiffType.added:
                return (s) => colors_ts_1.green(colors_ts_1.bold(s));
            case diff_ts_1.DiffType.removed:
                return (s) => colors_ts_1.red(colors_ts_1.bold(s));
            default:
                return colors_ts_1.white;
        }
    }
    function createSign(diffType) {
        switch (diffType) {
            case diff_ts_1.DiffType.added:
                return "+   ";
            case diff_ts_1.DiffType.removed:
                return "-   ";
            default:
                return "    ";
        }
    }
    function buildMessage(diffResult) {
        const messages = [];
        messages.push("");
        messages.push("");
        messages.push(`    ${colors_ts_1.gray(colors_ts_1.bold("[Diff]"))} ${colors_ts_1.red(colors_ts_1.bold("Actual"))} / ${colors_ts_1.green(colors_ts_1.bold("Expected"))}`);
        messages.push("");
        messages.push("");
        diffResult.forEach((result) => {
            const c = createColor(result.type);
            messages.push(c(`${createSign(result.type)}${result.value}`));
        });
        messages.push("");
        return messages;
    }
    function isKeyedCollection(x) {
        return [Symbol.iterator, "size"].every((k) => k in x);
    }
    function equal(c, d) {
        const seen = new Map();
        return (function compare(a, b) {
            // Have to render RegExp & Date for string comparison
            // unless it's mistreated as object
            if (a &&
                b &&
                ((a instanceof RegExp && b instanceof RegExp) ||
                    (a instanceof Date && b instanceof Date))) {
                return String(a) === String(b);
            }
            if (Object.is(a, b)) {
                return true;
            }
            if (a && typeof a === "object" && b && typeof b === "object") {
                if (seen.get(a) === b) {
                    return true;
                }
                if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
                    return false;
                }
                if (isKeyedCollection(a) && isKeyedCollection(b)) {
                    if (a.size !== b.size) {
                        return false;
                    }
                    let unmatchedEntries = a.size;
                    for (const [aKey, aValue] of a.entries()) {
                        for (const [bKey, bValue] of b.entries()) {
                            /* Given that Map keys can be references, we need
                             * to ensure that they are also deeply equal */
                            if ((aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
                                (compare(aKey, bKey) && compare(aValue, bValue))) {
                                unmatchedEntries--;
                            }
                        }
                    }
                    return unmatchedEntries === 0;
                }
                const merged = { ...a, ...b };
                for (const key in merged) {
                    if (!compare(a && a[key], b && b[key])) {
                        return false;
                    }
                }
                seen.set(a, b);
                return true;
            }
            return false;
        })(c, d);
    }
    exports_10("equal", equal);
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
        if (!expr) {
            throw new AssertionError(msg);
        }
    }
    exports_10("assert", assert);
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     */
    function assertEquals(actual, expected, msg) {
        if (equal(actual, expected)) {
            return;
        }
        let message = "";
        const actualString = format(actual);
        const expectedString = format(expected);
        try {
            const diffResult = diff_ts_1.default(actualString.split("\n"), expectedString.split("\n"));
            message = buildMessage(diffResult).join("\n");
        }
        catch (e) {
            message = `\n${colors_ts_1.red(CAN_NOT_DISPLAY)} + \n\n`;
        }
        if (msg) {
            message = msg;
        }
        throw new AssertionError(message);
    }
    exports_10("assertEquals", assertEquals);
    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     */
    function assertNotEquals(actual, expected, msg) {
        if (!equal(actual, expected)) {
            return;
        }
        let actualString;
        let expectedString;
        try {
            actualString = String(actual);
        }
        catch (e) {
            actualString = "[Cannot display]";
        }
        try {
            expectedString = String(expected);
        }
        catch (e) {
            expectedString = "[Cannot display]";
        }
        if (!msg) {
            msg = `actual: ${actualString} expected: ${expectedString}`;
        }
        throw new AssertionError(msg);
    }
    exports_10("assertNotEquals", assertNotEquals);
    /**
     * Make an assertion that `actual` and `expected` are strictly equal.  If
     * not then throw.
     */
    function assertStrictEq(actual, expected, msg) {
        if (actual !== expected) {
            let actualString;
            let expectedString;
            try {
                actualString = String(actual);
            }
            catch (e) {
                actualString = "[Cannot display]";
            }
            try {
                expectedString = String(expected);
            }
            catch (e) {
                expectedString = "[Cannot display]";
            }
            if (!msg) {
                msg = `actual: ${actualString} expected: ${expectedString}`;
            }
            throw new AssertionError(msg);
        }
    }
    exports_10("assertStrictEq", assertStrictEq);
    /**
     * Make an assertion that actual contains expected. If not
     * then thrown.
     */
    function assertStrContains(actual, expected, msg) {
        if (!actual.includes(expected)) {
            if (!msg) {
                msg = `actual: "${actual}" expected to contains: "${expected}"`;
            }
            throw new AssertionError(msg);
        }
    }
    exports_10("assertStrContains", assertStrContains);
    /**
     * Make an assertion that `actual` contains the `expected` values
     * If not then thrown.
     */
    function assertArrayContains(actual, expected, msg) {
        const missing = [];
        for (let i = 0; i < expected.length; i++) {
            let found = false;
            for (let j = 0; j < actual.length; j++) {
                if (equal(expected[i], actual[j])) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                missing.push(expected[i]);
            }
        }
        if (missing.length === 0) {
            return;
        }
        if (!msg) {
            msg = `actual: "${actual}" expected to contains: "${expected}"`;
            msg += "\n";
            msg += `missing: ${missing}`;
        }
        throw new AssertionError(msg);
    }
    exports_10("assertArrayContains", assertArrayContains);
    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then thrown
     */
    function assertMatch(actual, expected, msg) {
        if (!expected.test(actual)) {
            if (!msg) {
                msg = `actual: "${actual}" expected to match: "${expected}"`;
            }
            throw new AssertionError(msg);
        }
    }
    exports_10("assertMatch", assertMatch);
    /**
     * Forcefully throws a failed assertion
     */
    function fail(msg) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        assert(false, `Failed assertion${msg ? `: ${msg}` : "."}`);
    }
    exports_10("fail", fail);
    /** Executes a function, expecting it to throw.  If it does not, then it
     * throws.  An error class and a string that should be included in the
     * error message can also be asserted.
     */
    function assertThrows(fn, ErrorClass, msgIncludes = "", msg) {
        let doesThrow = false;
        let error = null;
        try {
            fn();
        }
        catch (e) {
            if (ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)) {
                msg = `Expected error to be instance of "${ErrorClass.name}", but was "${e.constructor.name}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            if (msgIncludes && !e.message.includes(msgIncludes)) {
                msg = `Expected error message to include "${msgIncludes}", but got "${e.message}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            doesThrow = true;
            error = e;
        }
        if (!doesThrow) {
            msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
            throw new AssertionError(msg);
        }
        return error;
    }
    exports_10("assertThrows", assertThrows);
    async function assertThrowsAsync(fn, ErrorClass, msgIncludes = "", msg) {
        let doesThrow = false;
        let error = null;
        try {
            await fn();
        }
        catch (e) {
            if (ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)) {
                msg = `Expected error to be instance of "${ErrorClass.name}", but got "${e.name}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            if (msgIncludes && !e.message.includes(msgIncludes)) {
                msg = `Expected error message to include "${msgIncludes}", but got "${e.message}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            doesThrow = true;
            error = e;
        }
        if (!doesThrow) {
            msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
            throw new AssertionError(msg);
        }
        return error;
    }
    exports_10("assertThrowsAsync", assertThrowsAsync);
    /** Use this to stub out methods that will throw when invoked. */
    function unimplemented(msg) {
        throw new AssertionError(msg || "unimplemented");
    }
    exports_10("unimplemented", unimplemented);
    /** Use this to assert unreachable code. */
    function unreachable() {
        throw new AssertionError("unreachable");
    }
    exports_10("unreachable", unreachable);
    return {
        setters: [
            function (colors_ts_1_1) {
                colors_ts_1 = colors_ts_1_1;
            },
            function (diff_ts_1_1) {
                diff_ts_1 = diff_ts_1_1;
            }
        ],
        execute: function () {
            CAN_NOT_DISPLAY = "[Cannot display]";
            AssertionError = class AssertionError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "AssertionError";
                }
            };
            exports_10("AssertionError", AssertionError);
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std/path/win32", ["https://deno.land/std/path/constants", "https://deno.land/std/path/utils", "https://deno.land/std/testing/asserts"], function (exports_11, context_11) {
    "use strict";
    var cwd, env, constants_ts_2, utils_ts_2, asserts_ts_1, sep, delimiter;
    var __moduleName = context_11 && context_11.id;
    function resolve(...pathSegments) {
        let resolvedDevice = "";
        let resolvedTail = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
            }
            else if (!resolvedDevice) {
                path = cwd();
            }
            else {
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = env.get(`=${resolvedDevice}`) || cwd();
                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined ||
                    path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                    path = `${resolvedDevice}\\`;
                }
            }
            utils_ts_2.assertPath(path);
            const len = path.length;
            // Skip empty entries
            if (len === 0)
                continue;
            let rootEnd = 0;
            let device = "";
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len > 1) {
                if (utils_ts_2.isPathSeparator(code)) {
                    // Possible UNC root
                    // If we started with a separator, we know we at least have an
                    // absolute path of some kind (UNC or otherwise)
                    isAbsolute = true;
                    if (utils_ts_2.isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            const firstPart = path.slice(last, j);
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            for (; j < len; ++j) {
                                if (!utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                for (; j < len; ++j) {
                                    if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                        break;
                                }
                                if (j === len) {
                                    // We matched a UNC root only
                                    device = `\\\\${firstPart}\\${path.slice(last)}`;
                                    rootEnd = j;
                                }
                                else if (j !== last) {
                                    // We matched a UNC root with leftovers
                                    device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                    rootEnd = j;
                                }
                            }
                        }
                    }
                    else {
                        rootEnd = 1;
                    }
                }
                else if (utils_ts_2.isWindowsDeviceRoot(code)) {
                    // Possible device root
                    if (path.charCodeAt(1) === constants_ts_2.CHAR_COLON) {
                        device = path.slice(0, 2);
                        rootEnd = 2;
                        if (len > 2) {
                            if (utils_ts_2.isPathSeparator(path.charCodeAt(2))) {
                                // Treat separator following drive name as an absolute path
                                // indicator
                                isAbsolute = true;
                                rootEnd = 3;
                            }
                        }
                    }
                }
            }
            else if (utils_ts_2.isPathSeparator(code)) {
                // `path` contains just a path separator
                rootEnd = 1;
                isAbsolute = true;
            }
            if (device.length > 0 &&
                resolvedDevice.length > 0 &&
                device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                // This path points to another device so it is not applicable
                continue;
            }
            if (resolvedDevice.length === 0 && device.length > 0) {
                resolvedDevice = device;
            }
            if (!resolvedAbsolute) {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
            }
            if (resolvedAbsolute && resolvedDevice.length > 0)
                break;
        }
        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)
        // Normalize the tail path
        resolvedTail = utils_ts_2.normalizeString(resolvedTail, !resolvedAbsolute, "\\", utils_ts_2.isPathSeparator);
        return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
    }
    exports_11("resolve", resolve);
    function normalize(path) {
        utils_ts_2.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (utils_ts_2.isPathSeparator(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an absolute
                // path of some kind (UNC or otherwise)
                isAbsolute = true;
                if (utils_ts_2.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                // Return the normalized version of the UNC root since there
                                // is nothing left to process
                                return `\\\\${firstPart}\\${path.slice(last)}\\`;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (utils_ts_2.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === constants_ts_2.CHAR_COLON) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (utils_ts_2.isPathSeparator(path.charCodeAt(2))) {
                            // Treat separator following drive name as an absolute path
                            // indicator
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        }
        else if (utils_ts_2.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid unnecessary
            // work
            return "\\";
        }
        let tail;
        if (rootEnd < len) {
            tail = utils_ts_2.normalizeString(path.slice(rootEnd), !isAbsolute, "\\", utils_ts_2.isPathSeparator);
        }
        else {
            tail = "";
        }
        if (tail.length === 0 && !isAbsolute)
            tail = ".";
        if (tail.length > 0 && utils_ts_2.isPathSeparator(path.charCodeAt(len - 1))) {
            tail += "\\";
        }
        if (device === undefined) {
            if (isAbsolute) {
                if (tail.length > 0)
                    return `\\${tail}`;
                else
                    return "\\";
            }
            else if (tail.length > 0) {
                return tail;
            }
            else {
                return "";
            }
        }
        else if (isAbsolute) {
            if (tail.length > 0)
                return `${device}\\${tail}`;
            else
                return `${device}\\`;
        }
        else if (tail.length > 0) {
            return device + tail;
        }
        else {
            return device;
        }
    }
    exports_11("normalize", normalize);
    function isAbsolute(path) {
        utils_ts_2.assertPath(path);
        const len = path.length;
        if (len === 0)
            return false;
        const code = path.charCodeAt(0);
        if (utils_ts_2.isPathSeparator(code)) {
            return true;
        }
        else if (utils_ts_2.isWindowsDeviceRoot(code)) {
            // Possible device root
            if (len > 2 && path.charCodeAt(1) === constants_ts_2.CHAR_COLON) {
                if (utils_ts_2.isPathSeparator(path.charCodeAt(2)))
                    return true;
            }
        }
        return false;
    }
    exports_11("isAbsolute", isAbsolute);
    function join(...paths) {
        const pathsCount = paths.length;
        if (pathsCount === 0)
            return ".";
        let joined;
        let firstPart = null;
        for (let i = 0; i < pathsCount; ++i) {
            const path = paths[i];
            utils_ts_2.assertPath(path);
            if (path.length > 0) {
                if (joined === undefined)
                    joined = firstPart = path;
                else
                    joined += `\\${path}`;
            }
        }
        if (joined === undefined)
            return ".";
        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for an UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at an UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as an UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        asserts_ts_1.assert(firstPart != null);
        if (utils_ts_2.isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1) {
                if (utils_ts_2.isPathSeparator(firstPart.charCodeAt(1))) {
                    ++slashCount;
                    if (firstLen > 2) {
                        if (utils_ts_2.isPathSeparator(firstPart.charCodeAt(2)))
                            ++slashCount;
                        else {
                            // We matched a UNC path in the first part
                            needsReplace = false;
                        }
                    }
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            for (; slashCount < joined.length; ++slashCount) {
                if (!utils_ts_2.isPathSeparator(joined.charCodeAt(slashCount)))
                    break;
            }
            // Replace the slashes if needed
            if (slashCount >= 2)
                joined = `\\${joined.slice(slashCount)}`;
        }
        return normalize(joined);
    }
    exports_11("join", join);
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    function relative(from, to) {
        utils_ts_2.assertPath(from);
        utils_ts_2.assertPath(to);
        if (from === to)
            return "";
        const fromOrig = resolve(from);
        const toOrig = resolve(to);
        if (fromOrig === toOrig)
            return "";
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to)
            return "";
        // Trim any leading backslashes
        let fromStart = 0;
        let fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        for (; fromEnd - 1 > fromStart; --fromEnd) {
            if (from.charCodeAt(fromEnd - 1) !== constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 0;
        let toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        for (; toEnd - 1 > toStart; --toEnd) {
            if (to.charCodeAt(toEnd - 1) !== constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === constants_ts_2.CHAR_BACKWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                        return toOrig.slice(toStart + i + 1);
                    }
                    else if (i === 2) {
                        // We get here if `from` is the device root.
                        // For example: from='C:\\'; to='C:\\foo'
                        return toOrig.slice(toStart + i);
                    }
                }
                if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === constants_ts_2.CHAR_BACKWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo'
                        lastCommonSep = i;
                    }
                    else if (i === 2) {
                        // We get here if `to` is the device root.
                        // For example: from='C:\\foo\\bar'; to='C:\\'
                        lastCommonSep = 3;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === constants_ts_2.CHAR_BACKWARD_SLASH)
                lastCommonSep = i;
        }
        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length && lastCommonSep === -1) {
            return toOrig;
        }
        let out = "";
        if (lastCommonSep === -1)
            lastCommonSep = 0;
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === constants_ts_2.CHAR_BACKWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "\\..";
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) {
            return out + toOrig.slice(toStart + lastCommonSep, toEnd);
        }
        else {
            toStart += lastCommonSep;
            if (toOrig.charCodeAt(toStart) === constants_ts_2.CHAR_BACKWARD_SLASH)
                ++toStart;
            return toOrig.slice(toStart, toEnd);
        }
    }
    exports_11("relative", relative);
    function toNamespacedPath(path) {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== "string")
            return path;
        if (path.length === 0)
            return "";
        const resolvedPath = resolve(path);
        if (resolvedPath.length >= 3) {
            if (resolvedPath.charCodeAt(0) === constants_ts_2.CHAR_BACKWARD_SLASH) {
                // Possible UNC root
                if (resolvedPath.charCodeAt(1) === constants_ts_2.CHAR_BACKWARD_SLASH) {
                    const code = resolvedPath.charCodeAt(2);
                    if (code !== constants_ts_2.CHAR_QUESTION_MARK && code !== constants_ts_2.CHAR_DOT) {
                        // Matched non-long UNC root, convert the path to a long UNC path
                        return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                    }
                }
            }
            else if (utils_ts_2.isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
                // Possible device root
                if (resolvedPath.charCodeAt(1) === constants_ts_2.CHAR_COLON &&
                    resolvedPath.charCodeAt(2) === constants_ts_2.CHAR_BACKWARD_SLASH) {
                    // Matched device root, convert the path to a long UNC path
                    return `\\\\?\\${resolvedPath}`;
                }
            }
        }
        return path;
    }
    exports_11("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        utils_ts_2.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = -1;
        let end = -1;
        let matchedSlash = true;
        let offset = 0;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (utils_ts_2.isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = offset = 1;
                if (utils_ts_2.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                return path;
                            }
                            if (j !== last) {
                                // We matched a UNC root with leftovers
                                // Offset by 1 to include the separator after the UNC root to
                                // treat it as a "normal root" on top of a (UNC) root
                                rootEnd = offset = j + 1;
                            }
                        }
                    }
                }
            }
            else if (utils_ts_2.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === constants_ts_2.CHAR_COLON) {
                    rootEnd = offset = 2;
                    if (len > 2) {
                        if (utils_ts_2.isPathSeparator(path.charCodeAt(2)))
                            rootEnd = offset = 3;
                    }
                }
            }
        }
        else if (utils_ts_2.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work
            return path;
        }
        for (let i = len - 1; i >= offset; --i) {
            if (utils_ts_2.isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            if (rootEnd === -1)
                return ".";
            else
                end = rootEnd;
        }
        return path.slice(0, end);
    }
    exports_11("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        utils_ts_2.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2) {
            const drive = path.charCodeAt(0);
            if (utils_ts_2.isWindowsDeviceRoot(drive)) {
                if (path.charCodeAt(1) === constants_ts_2.CHAR_COLON)
                    start = 2;
            }
        }
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (utils_ts_2.isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= start; --i) {
                if (utils_ts_2.isPathSeparator(path.charCodeAt(i))) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_11("basename", basename);
    function extname(path) {
        utils_ts_2.assertPath(path);
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            path.charCodeAt(1) === constants_ts_2.CHAR_COLON &&
            utils_ts_2.isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }
        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (utils_ts_2.isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_2.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_11("extname", extname);
    function format(pathObject) {
        /* eslint-disable max-len */
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return utils_ts_2._format("\\", pathObject);
    }
    exports_11("format", format);
    function parse(path) {
        utils_ts_2.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        const len = path.length;
        if (len === 0)
            return ret;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (utils_ts_2.isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = 1;
                if (utils_ts_2.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (utils_ts_2.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                rootEnd = j;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                rootEnd = j + 1;
                            }
                        }
                    }
                }
            }
            else if (utils_ts_2.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === constants_ts_2.CHAR_COLON) {
                    rootEnd = 2;
                    if (len > 2) {
                        if (utils_ts_2.isPathSeparator(path.charCodeAt(2))) {
                            if (len === 3) {
                                // `path` contains just a drive root, exit early to avoid
                                // unnecessary work
                                ret.root = ret.dir = path;
                                return ret;
                            }
                            rootEnd = 3;
                        }
                    }
                    else {
                        // `path` contains just a drive root, exit early to avoid
                        // unnecessary work
                        ret.root = ret.dir = path;
                        return ret;
                    }
                }
            }
        }
        else if (utils_ts_2.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work
            ret.root = ret.dir = path;
            return ret;
        }
        if (rootEnd > 0)
            ret.root = path.slice(0, rootEnd);
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (utils_ts_2.isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_2.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
        else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
            ret.ext = path.slice(startDot, end);
        }
        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else
            ret.dir = ret.root;
        return ret;
    }
    exports_11("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///C:/Users/foo"); // "C:\\Users\\foo"
     *      fromFileUrl("file:///home/foo"); // "\\home\\foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
        return new URL(url).pathname
            .replace(/^\/*([A-Za-z]:)(\/|$)/, "$1/")
            .replace(/\//g, "\\");
    }
    exports_11("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (constants_ts_2_1) {
                constants_ts_2 = constants_ts_2_1;
            },
            function (utils_ts_2_1) {
                utils_ts_2 = utils_ts_2_1;
            },
            function (asserts_ts_1_1) {
                asserts_ts_1 = asserts_ts_1_1;
            }
        ],
        execute: function () {
            cwd = Deno.cwd, env = Deno.env;
            exports_11("sep", sep = "\\");
            exports_11("delimiter", delimiter = ";");
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std/path/posix", ["https://deno.land/std/path/constants", "https://deno.land/std/path/utils"], function (exports_12, context_12) {
    "use strict";
    var cwd, constants_ts_3, utils_ts_3, sep, delimiter;
    var __moduleName = context_12 && context_12.id;
    // path.resolve([from ...], to)
    function resolve(...pathSegments) {
        let resolvedPath = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            let path;
            if (i >= 0)
                path = pathSegments[i];
            else
                path = cwd();
            utils_ts_3.assertPath(path);
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === constants_ts_3.CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = utils_ts_3.normalizeString(resolvedPath, !resolvedAbsolute, "/", utils_ts_3.isPosixPathSeparator);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
                return `/${resolvedPath}`;
            else
                return "/";
        }
        else if (resolvedPath.length > 0)
            return resolvedPath;
        else
            return ".";
    }
    exports_12("resolve", resolve);
    function normalize(path) {
        utils_ts_3.assertPath(path);
        if (path.length === 0)
            return ".";
        const isAbsolute = path.charCodeAt(0) === constants_ts_3.CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === constants_ts_3.CHAR_FORWARD_SLASH;
        // Normalize the path
        path = utils_ts_3.normalizeString(path, !isAbsolute, "/", utils_ts_3.isPosixPathSeparator);
        if (path.length === 0 && !isAbsolute)
            path = ".";
        if (path.length > 0 && trailingSeparator)
            path += "/";
        if (isAbsolute)
            return `/${path}`;
        return path;
    }
    exports_12("normalize", normalize);
    function isAbsolute(path) {
        utils_ts_3.assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === constants_ts_3.CHAR_FORWARD_SLASH;
    }
    exports_12("isAbsolute", isAbsolute);
    function join(...paths) {
        if (paths.length === 0)
            return ".";
        let joined;
        for (let i = 0, len = paths.length; i < len; ++i) {
            const path = paths[i];
            utils_ts_3.assertPath(path);
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `/${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalize(joined);
    }
    exports_12("join", join);
    function relative(from, to) {
        utils_ts_3.assertPath(from);
        utils_ts_3.assertPath(to);
        if (from === to)
            return "";
        from = resolve(from);
        to = resolve(to);
        if (from === to)
            return "";
        // Trim any leading backslashes
        let fromStart = 1;
        const fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== constants_ts_3.CHAR_FORWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 1;
        const toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== constants_ts_3.CHAR_FORWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === constants_ts_3.CHAR_FORWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='/foo/bar'; to='/foo/bar/baz'
                        return to.slice(toStart + i + 1);
                    }
                    else if (i === 0) {
                        // We get here if `from` is the root
                        // For example: from='/'; to='/foo'
                        return to.slice(toStart + i);
                    }
                }
                else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === constants_ts_3.CHAR_FORWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='/foo/bar/baz'; to='/foo/bar'
                        lastCommonSep = i;
                    }
                    else if (i === 0) {
                        // We get here if `to` is the root.
                        // For example: from='/foo'; to='/'
                        lastCommonSep = 0;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === constants_ts_3.CHAR_FORWARD_SLASH)
                lastCommonSep = i;
        }
        let out = "";
        // Generate the relative path based on the path difference between `to`
        // and `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === constants_ts_3.CHAR_FORWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "/..";
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === constants_ts_3.CHAR_FORWARD_SLASH)
                ++toStart;
            return to.slice(toStart);
        }
    }
    exports_12("relative", relative);
    function toNamespacedPath(path) {
        // Non-op on posix systems
        return path;
    }
    exports_12("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        utils_ts_3.assertPath(path);
        if (path.length === 0)
            return ".";
        const hasRoot = path.charCodeAt(0) === constants_ts_3.CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === constants_ts_3.CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1)
            return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
            return "//";
        return path.slice(0, end);
    }
    exports_12("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        utils_ts_3.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === constants_ts_3.CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === constants_ts_3.CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_12("basename", basename);
    function extname(path) {
        utils_ts_3.assertPath(path);
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            const code = path.charCodeAt(i);
            if (code === constants_ts_3.CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_3.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_12("extname", extname);
    function format(pathObject) {
        /* eslint-disable max-len */
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return utils_ts_3._format("/", pathObject);
    }
    exports_12("format", format);
    function parse(path) {
        utils_ts_3.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
            return ret;
        const isAbsolute = path.charCodeAt(0) === constants_ts_3.CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = "/";
            start = 1;
        }
        else {
            start = 0;
        }
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (code === constants_ts_3.CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_3.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute) {
                    ret.base = ret.name = path.slice(1, end);
                }
                else {
                    ret.base = ret.name = path.slice(startPart, end);
                }
            }
        }
        else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
            ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
            ret.dir = "/";
        return ret;
    }
    exports_12("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///home/foo"); // "/home/foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
        return new URL(url).pathname;
    }
    exports_12("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (constants_ts_3_1) {
                constants_ts_3 = constants_ts_3_1;
            },
            function (utils_ts_3_1) {
                utils_ts_3 = utils_ts_3_1;
            }
        ],
        execute: function () {
            cwd = Deno.cwd;
            exports_12("sep", sep = "/");
            exports_12("delimiter", delimiter = ":");
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/path/common", ["https://deno.land/std/path/constants"], function (exports_13, context_13) {
    "use strict";
    var constants_ts_4;
    var __moduleName = context_13 && context_13.id;
    /** Determines the common path from a set of paths, using an optional separator,
     * which defaults to the OS default separator.
     *
     *       import { common } from "https://deno.land/std/path/mod.ts";
     *       const p = common([
     *         "./deno/std/path/mod.ts",
     *         "./deno/std/fs/mod.ts",
     *       ]);
     *       console.log(p); // "./deno/std/"
     *
     */
    function common(paths, sep = constants_ts_4.SEP) {
        const [first = "", ...remaining] = paths;
        if (first === "" || remaining.length === 0) {
            return first.substring(0, first.lastIndexOf(sep) + 1);
        }
        const parts = first.split(sep);
        let endOfPrefix = parts.length;
        for (const path of remaining) {
            const compare = path.split(sep);
            for (let i = 0; i < endOfPrefix; i++) {
                if (compare[i] !== parts[i]) {
                    endOfPrefix = i;
                }
            }
            if (endOfPrefix === 0) {
                return "";
            }
        }
        const prefix = parts.slice(0, endOfPrefix).join(sep);
        return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
    }
    exports_13("common", common);
    return {
        setters: [
            function (constants_ts_4_1) {
                constants_ts_4 = constants_ts_4_1;
            }
        ],
        execute: function () {
        }
    };
});
// This file is ported from globrex@0.1.2
// MIT License
// Copyright (c) 2018 Terkel Gjervig Nielsen
System.register("https://deno.land/std/path/globrex", [], function (exports_14, context_14) {
    "use strict";
    var isWin, SEP, SEP_ESC, SEP_RAW, GLOBSTAR, WILDCARD, GLOBSTAR_SEGMENT, WILDCARD_SEGMENT;
    var __moduleName = context_14 && context_14.id;
    /**
     * Convert any glob pattern to a JavaScript Regexp object
     * @param glob Glob pattern to convert
     * @param opts Configuration object
     * @returns Converted object with string, segments and RegExp object
     */
    function globrex(glob, { extended = false, globstar = false, strict = false, filepath = false, flags = "", } = {}) {
        const sepPattern = new RegExp(`^${SEP}${strict ? "" : "+"}$`);
        let regex = "";
        let segment = "";
        let pathRegexStr = "";
        const pathSegments = [];
        // If we are doing extended matching, this boolean is true when we are inside
        // a group (eg {*.html,*.js}), and false otherwise.
        let inGroup = false;
        let inRange = false;
        // extglob stack. Keep track of scope
        const ext = [];
        // Helper function to build string and segments
        function add(str, options = { split: false, last: false, only: "" }) {
            const { split, last, only } = options;
            if (only !== "path")
                regex += str;
            if (filepath && only !== "regex") {
                pathRegexStr += str.match(sepPattern) ? SEP : str;
                if (split) {
                    if (last)
                        segment += str;
                    if (segment !== "") {
                        // change it 'includes'
                        if (!flags.includes("g"))
                            segment = `^${segment}$`;
                        pathSegments.push(new RegExp(segment, flags));
                    }
                    segment = "";
                }
                else {
                    segment += str;
                }
            }
        }
        let c, n;
        for (let i = 0; i < glob.length; i++) {
            c = glob[i];
            n = glob[i + 1];
            if (["\\", "$", "^", ".", "="].includes(c)) {
                add(`\\${c}`);
                continue;
            }
            if (c.match(sepPattern)) {
                add(SEP, { split: true });
                if (n != null && n.match(sepPattern) && !strict)
                    regex += "?";
                continue;
            }
            if (c === "(") {
                if (ext.length) {
                    add(`${c}?:`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ")") {
                if (ext.length) {
                    add(c);
                    const type = ext.pop();
                    if (type === "@") {
                        add("{1}");
                    }
                    else if (type === "!") {
                        add(WILDCARD);
                    }
                    else {
                        add(type);
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "|") {
                if (ext.length) {
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "+") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "@" && extended) {
                if (n === "(") {
                    ext.push(c);
                    continue;
                }
            }
            if (c === "!") {
                if (extended) {
                    if (inRange) {
                        add("^");
                        continue;
                    }
                    if (n === "(") {
                        ext.push(c);
                        add("(?!");
                        i++;
                        continue;
                    }
                    add(`\\${c}`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "?") {
                if (extended) {
                    if (n === "(") {
                        ext.push(c);
                    }
                    else {
                        add(".");
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "[") {
                if (inRange && n === ":") {
                    i++; // skip [
                    let value = "";
                    while (glob[++i] !== ":")
                        value += glob[i];
                    if (value === "alnum")
                        add("(?:\\w|\\d)");
                    else if (value === "space")
                        add("\\s");
                    else if (value === "digit")
                        add("\\d");
                    i++; // skip last ]
                    continue;
                }
                if (extended) {
                    inRange = true;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "]") {
                if (extended) {
                    inRange = false;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "{") {
                if (extended) {
                    inGroup = true;
                    add("(?:");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "}") {
                if (extended) {
                    inGroup = false;
                    add(")");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ",") {
                if (inGroup) {
                    add("|");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "*") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                // Move over all consecutive "*"'s.
                // Also store the previous and next characters
                const prevChar = glob[i - 1];
                let starCount = 1;
                while (glob[i + 1] === "*") {
                    starCount++;
                    i++;
                }
                const nextChar = glob[i + 1];
                if (!globstar) {
                    // globstar is disabled, so treat any number of "*" as one
                    add(".*");
                }
                else {
                    // globstar is enabled, so determine if this is a globstar segment
                    const isGlobstar = starCount > 1 && // multiple "*"'s
                        // from the start of the segment
                        [SEP_RAW, "/", undefined].includes(prevChar) &&
                        // to the end of the segment
                        [SEP_RAW, "/", undefined].includes(nextChar);
                    if (isGlobstar) {
                        // it's a globstar, so match zero or more path segments
                        add(GLOBSTAR, { only: "regex" });
                        add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
                        i++; // move over the "/"
                    }
                    else {
                        // it's not a globstar, so only match one path segment
                        add(WILDCARD, { only: "regex" });
                        add(WILDCARD_SEGMENT, { only: "path" });
                    }
                }
                continue;
            }
            add(c);
        }
        // When regexp 'g' flag is specified don't
        // constrain the regular expression with ^ & $
        if (!flags.includes("g")) {
            regex = `^${regex}$`;
            segment = `^${segment}$`;
            if (filepath)
                pathRegexStr = `^${pathRegexStr}$`;
        }
        const result = { regex: new RegExp(regex, flags) };
        // Push the last segment
        if (filepath) {
            pathSegments.push(new RegExp(segment, flags));
            result.path = {
                regex: new RegExp(pathRegexStr, flags),
                segments: pathSegments,
                globstar: new RegExp(!flags.includes("g") ? `^${GLOBSTAR_SEGMENT}$` : GLOBSTAR_SEGMENT, flags),
            };
        }
        return result;
    }
    exports_14("globrex", globrex);
    return {
        setters: [],
        execute: function () {
            isWin = Deno.build.os === "windows";
            SEP = isWin ? `(?:\\\\|\\/)` : `\\/`;
            SEP_ESC = isWin ? `\\\\` : `/`;
            SEP_RAW = isWin ? `\\` : `/`;
            GLOBSTAR = `(?:(?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD = `(?:[^${SEP_ESC}/]*)`;
            GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD_SEGMENT = `(?:[^${SEP_ESC}/]*)`;
        }
    };
});
System.register("https://deno.land/std/path/glob", ["https://deno.land/std/path/constants", "https://deno.land/std/path/globrex", "https://deno.land/std/path/mod", "https://deno.land/std/testing/asserts"], function (exports_15, context_15) {
    "use strict";
    var constants_ts_5, globrex_ts_1, mod_ts_1, asserts_ts_2;
    var __moduleName = context_15 && context_15.id;
    /**
     * Generate a regex based on glob pattern and options
     * This was meant to be using the the `fs.walk` function
     * but can be used anywhere else.
     * Examples:
     *
     *     Looking for all the `ts` files:
     *     walkSync(".", {
     *       match: [globToRegExp("*.ts")]
     *     })
     *
     *     Looking for all the `.json` files in any subfolder:
     *     walkSync(".", {
     *       match: [globToRegExp(join("a", "**", "*.json"),{
     *         flags: "g",
     *         extended: true,
     *         globstar: true
     *       })]
     *     })
     *
     * @param glob - Glob pattern to be used
     * @param options - Specific options for the glob pattern
     * @returns A RegExp for the glob pattern
     */
    function globToRegExp(glob, { extended = false, globstar = true } = {}) {
        const result = globrex_ts_1.globrex(glob, {
            extended,
            globstar,
            strict: false,
            filepath: true,
        });
        asserts_ts_2.assert(result.path != null);
        return result.path.regex;
    }
    exports_15("globToRegExp", globToRegExp);
    /** Test whether the given string is a glob */
    function isGlob(str) {
        const chars = { "{": "}", "(": ")", "[": "]" };
        /* eslint-disable-next-line max-len */
        const regex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
        if (str === "") {
            return false;
        }
        let match;
        while ((match = regex.exec(str))) {
            if (match[2])
                return true;
            let idx = match.index + match[0].length;
            // if an open bracket/brace/paren is escaped,
            // set the index to the next closing character
            const open = match[1];
            const close = open ? chars[open] : null;
            if (open && close) {
                const n = str.indexOf(close, idx);
                if (n !== -1) {
                    idx = n + 1;
                }
            }
            str = str.slice(idx);
        }
        return false;
    }
    exports_15("isGlob", isGlob);
    /** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */
    function normalizeGlob(glob, { globstar = false } = {}) {
        if (!!glob.match(/\0/g)) {
            throw new Error(`Glob contains invalid characters: "${glob}"`);
        }
        if (!globstar) {
            return mod_ts_1.normalize(glob);
        }
        const s = constants_ts_5.SEP_PATTERN.source;
        const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
        return mod_ts_1.normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
    }
    exports_15("normalizeGlob", normalizeGlob);
    /** Like join(), but doesn't collapse "**\/.." when `globstar` is true. */
    function joinGlobs(globs, { extended = false, globstar = false } = {}) {
        if (!globstar || globs.length == 0) {
            return mod_ts_1.join(...globs);
        }
        if (globs.length === 0)
            return ".";
        let joined;
        for (const glob of globs) {
            const path = glob;
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `${constants_ts_5.SEP}${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalizeGlob(joined, { extended, globstar });
    }
    exports_15("joinGlobs", joinGlobs);
    return {
        setters: [
            function (constants_ts_5_1) {
                constants_ts_5 = constants_ts_5_1;
            },
            function (globrex_ts_1_1) {
                globrex_ts_1 = globrex_ts_1_1;
            },
            function (mod_ts_1_1) {
                mod_ts_1 = mod_ts_1_1;
            },
            function (asserts_ts_2_1) {
                asserts_ts_2 = asserts_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std/path/mod", ["https://deno.land/std/path/win32", "https://deno.land/std/path/posix", "https://deno.land/std/path/constants", "https://deno.land/std/path/common", "https://deno.land/std/path/glob", "https://deno.land/std/path/globrex"], function (exports_16, context_16) {
    "use strict";
    var _win32, _posix, constants_ts_6, path, win32, posix, basename, delimiter, dirname, extname, format, fromFileUrl, isAbsolute, join, normalize, parse, relative, resolve, sep, toNamespacedPath;
    var __moduleName = context_16 && context_16.id;
    var exportedNames_1 = {
        "win32": true,
        "posix": true,
        "basename": true,
        "delimiter": true,
        "dirname": true,
        "extname": true,
        "format": true,
        "fromFileUrl": true,
        "isAbsolute": true,
        "join": true,
        "normalize": true,
        "parse": true,
        "relative": true,
        "resolve": true,
        "sep": true,
        "toNamespacedPath": true,
        "common": true,
        "EOL": true,
        "SEP": true,
        "SEP_PATTERN": true,
        "isWindows": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_16(exports);
    }
    return {
        setters: [
            function (_win32_1) {
                _win32 = _win32_1;
            },
            function (_posix_1) {
                _posix = _posix_1;
            },
            function (constants_ts_6_1) {
                constants_ts_6 = constants_ts_6_1;
                exports_16({
                    "EOL": constants_ts_6_1["EOL"],
                    "SEP": constants_ts_6_1["SEP"],
                    "SEP_PATTERN": constants_ts_6_1["SEP_PATTERN"],
                    "isWindows": constants_ts_6_1["isWindows"]
                });
            },
            function (common_ts_1_1) {
                exports_16({
                    "common": common_ts_1_1["common"]
                });
            },
            function (glob_ts_1_1) {
                exportStar_1(glob_ts_1_1);
            },
            function (globrex_ts_2_1) {
                exportStar_1(globrex_ts_2_1);
            }
        ],
        execute: function () {
            path = constants_ts_6.isWindows ? _win32 : _posix;
            exports_16("win32", win32 = _win32);
            exports_16("posix", posix = _posix);
            exports_16("basename", basename = path.basename), exports_16("delimiter", delimiter = path.delimiter), exports_16("dirname", dirname = path.dirname), exports_16("extname", extname = path.extname), exports_16("format", format = path.format), exports_16("fromFileUrl", fromFileUrl = path.fromFileUrl), exports_16("isAbsolute", isAbsolute = path.isAbsolute), exports_16("join", join = path.join), exports_16("normalize", normalize = path.normalize), exports_16("parse", parse = path.parse), exports_16("relative", relative = path.relative), exports_16("resolve", resolve = path.resolve), exports_16("sep", sep = path.sep), exports_16("toNamespacedPath", toNamespacedPath = path.toNamespacedPath);
        }
    };
});
System.register("https://deno.land/std/fs/empty_dir", ["https://deno.land/std/path/mod"], function (exports_17, context_17) {
    "use strict";
    var mod_ts_2, readDir, readDirSync, mkdir, mkdirSync, remove, removeSync;
    var __moduleName = context_17 && context_17.id;
    /**
     * Ensures that a directory is empty.
     * Deletes directory contents if the directory is not empty.
     * If the directory does not exist, it is created.
     * The directory itself is not deleted.
     * Requires the `--allow-read` and `--alow-write` flag.
     */
    async function emptyDir(dir) {
        try {
            const items = [];
            for await (const dirEntry of readDir(dir)) {
                items.push(dirEntry);
            }
            while (items.length) {
                const item = items.shift();
                if (item && item.name) {
                    const filepath = mod_ts_2.join(dir, item.name);
                    await remove(filepath, { recursive: true });
                }
            }
        }
        catch (err) {
            if (!(err instanceof Deno.errors.NotFound)) {
                throw err;
            }
            // if not exist. then create it
            await mkdir(dir, { recursive: true });
        }
    }
    exports_17("emptyDir", emptyDir);
    /**
     * Ensures that a directory is empty.
     * Deletes directory contents if the directory is not empty.
     * If the directory does not exist, it is created.
     * The directory itself is not deleted.
     * Requires the `--allow-read` and `--alow-write` flag.
     */
    function emptyDirSync(dir) {
        try {
            const items = [...readDirSync(dir)];
            // if directory already exist. then remove it's child item.
            while (items.length) {
                const item = items.shift();
                if (item && item.name) {
                    const filepath = mod_ts_2.join(dir, item.name);
                    removeSync(filepath, { recursive: true });
                }
            }
        }
        catch (err) {
            if (!(err instanceof Deno.errors.NotFound)) {
                throw err;
            }
            // if not exist. then create it
            mkdirSync(dir, { recursive: true });
            return;
        }
    }
    exports_17("emptyDirSync", emptyDirSync);
    return {
        setters: [
            function (mod_ts_2_1) {
                mod_ts_2 = mod_ts_2_1;
            }
        ],
        execute: function () {
            readDir = Deno.readDir, readDirSync = Deno.readDirSync, mkdir = Deno.mkdir, mkdirSync = Deno.mkdirSync, remove = Deno.remove, removeSync = Deno.removeSync;
        }
    };
});
System.register("https://deno.land/std/fs/utils", ["https://deno.land/std/path/mod"], function (exports_18, context_18) {
    "use strict";
    var path;
    var __moduleName = context_18 && context_18.id;
    /**
     * Test whether or not `dest` is a sub-directory of `src`
     * @param src src file path
     * @param dest dest file path
     * @param sep path separator
     */
    function isSubdir(src, dest, sep = path.sep) {
        if (src === dest) {
            return false;
        }
        const srcArray = src.split(sep);
        const destArray = dest.split(sep);
        // see: https://github.com/Microsoft/TypeScript/issues/30821
        return srcArray.reduce(
        // @ts-ignore
        (acc, current, i) => {
            return acc && destArray[i] === current;
        }, true);
    }
    exports_18("isSubdir", isSubdir);
    /**
     * Get a human readable file type string.
     *
     * @param fileInfo A FileInfo describes a file and is returned by `stat`,
     *                 `lstat`
     */
    function getFileInfoType(fileInfo) {
        return fileInfo.isFile
            ? "file"
            : fileInfo.isDirectory
                ? "dir"
                : fileInfo.isSymlink
                    ? "symlink"
                    : undefined;
    }
    exports_18("getFileInfoType", getFileInfoType);
    return {
        setters: [
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/fs/ensure_dir", ["https://deno.land/std/fs/utils"], function (exports_19, context_19) {
    "use strict";
    var utils_ts_4, lstat, lstatSync, mkdir, mkdirSync;
    var __moduleName = context_19 && context_19.id;
    /**
     * Ensures that the directory exists.
     * If the directory structure does not exist, it is created. Like mkdir -p.
     * Requires the `--allow-read` and `--alow-write` flag.
     */
    async function ensureDir(dir) {
        try {
            const fileInfo = await lstat(dir);
            if (!fileInfo.isDirectory) {
                throw new Error(`Ensure path exists, expected 'dir', got '${utils_ts_4.getFileInfoType(fileInfo)}'`);
            }
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                // if dir not exists. then create it.
                await mkdir(dir, { recursive: true });
                return;
            }
            throw err;
        }
    }
    exports_19("ensureDir", ensureDir);
    /**
     * Ensures that the directory exists.
     * If the directory structure does not exist, it is created. Like mkdir -p.
     * Requires the `--allow-read` and `--alow-write` flag.
     */
    function ensureDirSync(dir) {
        try {
            const fileInfo = lstatSync(dir);
            if (!fileInfo.isDirectory) {
                throw new Error(`Ensure path exists, expected 'dir', got '${utils_ts_4.getFileInfoType(fileInfo)}'`);
            }
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                // if dir not exists. then create it.
                mkdirSync(dir, { recursive: true });
                return;
            }
            throw err;
        }
    }
    exports_19("ensureDirSync", ensureDirSync);
    return {
        setters: [
            function (utils_ts_4_1) {
                utils_ts_4 = utils_ts_4_1;
            }
        ],
        execute: function () {
            lstat = Deno.lstat, lstatSync = Deno.lstatSync, mkdir = Deno.mkdir, mkdirSync = Deno.mkdirSync;
        }
    };
});
System.register("https://deno.land/std/fs/ensure_file", ["https://deno.land/std/path/mod", "https://deno.land/std/fs/ensure_dir", "https://deno.land/std/fs/utils"], function (exports_20, context_20) {
    "use strict";
    var path, ensure_dir_ts_1, utils_ts_5, lstat, lstatSync, writeFile, writeFileSync;
    var __moduleName = context_20 && context_20.id;
    /**
     * Ensures that the file exists.
     * If the file that is requested to be created is in directories that do not
     * exist.
     * these directories are created. If the file already exists,
     * it is NOTMODIFIED.
     * Requires the `--allow-read` and `--alow-write` flag.
     */
    async function ensureFile(filePath) {
        try {
            // if file exists
            const stat = await lstat(filePath);
            if (!stat.isFile) {
                throw new Error(`Ensure path exists, expected 'file', got '${utils_ts_5.getFileInfoType(stat)}'`);
            }
        }
        catch (err) {
            // if file not exists
            if (err instanceof Deno.errors.NotFound) {
                // ensure dir exists
                await ensure_dir_ts_1.ensureDir(path.dirname(filePath));
                // create file
                await writeFile(filePath, new Uint8Array());
                return;
            }
            throw err;
        }
    }
    exports_20("ensureFile", ensureFile);
    /**
     * Ensures that the file exists.
     * If the file that is requested to be created is in directories that do not
     * exist,
     * these directories are created. If the file already exists,
     * it is NOT MODIFIED.
     * Requires the `--allow-read` and `--alow-write` flag.
     */
    function ensureFileSync(filePath) {
        try {
            // if file exists
            const stat = lstatSync(filePath);
            if (!stat.isFile) {
                throw new Error(`Ensure path exists, expected 'file', got '${utils_ts_5.getFileInfoType(stat)}'`);
            }
        }
        catch (err) {
            // if file not exists
            if (err instanceof Deno.errors.NotFound) {
                // ensure dir exists
                ensure_dir_ts_1.ensureDirSync(path.dirname(filePath));
                // create file
                writeFileSync(filePath, new Uint8Array());
                return;
            }
            throw err;
        }
    }
    exports_20("ensureFileSync", ensureFileSync);
    return {
        setters: [
            function (path_2) {
                path = path_2;
            },
            function (ensure_dir_ts_1_1) {
                ensure_dir_ts_1 = ensure_dir_ts_1_1;
            },
            function (utils_ts_5_1) {
                utils_ts_5 = utils_ts_5_1;
            }
        ],
        execute: function () {
            lstat = Deno.lstat, lstatSync = Deno.lstatSync, writeFile = Deno.writeFile, writeFileSync = Deno.writeFileSync;
        }
    };
});
System.register("https://deno.land/std/fs/exists", [], function (exports_21, context_21) {
    "use strict";
    var lstat, lstatSync;
    var __moduleName = context_21 && context_21.id;
    /**
     * Test whether or not the given path exists by checking with the file system
     */
    async function exists(filePath) {
        try {
            await lstat(filePath);
            return true;
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return false;
            }
            throw err;
        }
    }
    exports_21("exists", exists);
    /**
     * Test whether or not the given path exists by checking with the file system
     */
    function existsSync(filePath) {
        try {
            lstatSync(filePath);
            return true;
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return false;
            }
            throw err;
        }
    }
    exports_21("existsSync", existsSync);
    return {
        setters: [],
        execute: function () {
            // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
            lstat = Deno.lstat, lstatSync = Deno.lstatSync;
        }
    };
});
System.register("https://deno.land/std/fs/ensure_link", ["https://deno.land/std/path/mod", "https://deno.land/std/fs/ensure_dir", "https://deno.land/std/fs/exists", "https://deno.land/std/fs/utils"], function (exports_22, context_22) {
    "use strict";
    var path, ensure_dir_ts_2, exists_ts_1, utils_ts_6;
    var __moduleName = context_22 && context_22.id;
    /**
     * Ensures that the hard link exists.
     * If the directory structure does not exist, it is created.
     *
     * @param src the source file path. Directory hard links are not allowed.
     * @param dest the destination link path
     */
    async function ensureLink(src, dest) {
        if (await exists_ts_1.exists(dest)) {
            const destStatInfo = await Deno.lstat(dest);
            const destFilePathType = utils_ts_6.getFileInfoType(destStatInfo);
            if (destFilePathType !== "file") {
                throw new Error(`Ensure path exists, expected 'file', got '${destFilePathType}'`);
            }
            return;
        }
        await ensure_dir_ts_2.ensureDir(path.dirname(dest));
        await Deno.link(src, dest);
    }
    exports_22("ensureLink", ensureLink);
    /**
     * Ensures that the hard link exists.
     * If the directory structure does not exist, it is created.
     *
     * @param src the source file path. Directory hard links are not allowed.
     * @param dest the destination link path
     */
    function ensureLinkSync(src, dest) {
        if (exists_ts_1.existsSync(dest)) {
            const destStatInfo = Deno.lstatSync(dest);
            const destFilePathType = utils_ts_6.getFileInfoType(destStatInfo);
            if (destFilePathType !== "file") {
                throw new Error(`Ensure path exists, expected 'file', got '${destFilePathType}'`);
            }
            return;
        }
        ensure_dir_ts_2.ensureDirSync(path.dirname(dest));
        Deno.linkSync(src, dest);
    }
    exports_22("ensureLinkSync", ensureLinkSync);
    return {
        setters: [
            function (path_3) {
                path = path_3;
            },
            function (ensure_dir_ts_2_1) {
                ensure_dir_ts_2 = ensure_dir_ts_2_1;
            },
            function (exists_ts_1_1) {
                exists_ts_1 = exists_ts_1_1;
            },
            function (utils_ts_6_1) {
                utils_ts_6 = utils_ts_6_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/fs/ensure_symlink", ["https://deno.land/std/path/mod", "https://deno.land/std/fs/ensure_dir", "https://deno.land/std/fs/exists", "https://deno.land/std/fs/utils"], function (exports_23, context_23) {
    "use strict";
    var path, ensure_dir_ts_3, exists_ts_2, utils_ts_7;
    var __moduleName = context_23 && context_23.id;
    /**
     * Ensures that the link exists.
     * If the directory structure does not exist, it is created.
     *
     * @param src the source file path
     * @param dest the destination link path
     */
    async function ensureSymlink(src, dest) {
        const srcStatInfo = await Deno.lstat(src);
        const srcFilePathType = utils_ts_7.getFileInfoType(srcStatInfo);
        if (await exists_ts_2.exists(dest)) {
            const destStatInfo = await Deno.lstat(dest);
            const destFilePathType = utils_ts_7.getFileInfoType(destStatInfo);
            if (destFilePathType !== "symlink") {
                throw new Error(`Ensure path exists, expected 'symlink', got '${destFilePathType}'`);
            }
            return;
        }
        await ensure_dir_ts_3.ensureDir(path.dirname(dest));
        await Deno.symlink(src, dest, srcFilePathType);
    }
    exports_23("ensureSymlink", ensureSymlink);
    /**
     * Ensures that the link exists.
     * If the directory structure does not exist, it is created.
     *
     * @param src the source file path
     * @param dest the destination link path
     */
    function ensureSymlinkSync(src, dest) {
        const srcStatInfo = Deno.lstatSync(src);
        const srcFilePathType = utils_ts_7.getFileInfoType(srcStatInfo);
        if (exists_ts_2.existsSync(dest)) {
            const destStatInfo = Deno.lstatSync(dest);
            const destFilePathType = utils_ts_7.getFileInfoType(destStatInfo);
            if (destFilePathType !== "symlink") {
                throw new Error(`Ensure path exists, expected 'symlink', got '${destFilePathType}'`);
            }
            return;
        }
        ensure_dir_ts_3.ensureDirSync(path.dirname(dest));
        Deno.symlinkSync(src, dest, srcFilePathType);
    }
    exports_23("ensureSymlinkSync", ensureSymlinkSync);
    return {
        setters: [
            function (path_4) {
                path = path_4;
            },
            function (ensure_dir_ts_3_1) {
                ensure_dir_ts_3 = ensure_dir_ts_3_1;
            },
            function (exists_ts_2_1) {
                exists_ts_2 = exists_ts_2_1;
            },
            function (utils_ts_7_1) {
                utils_ts_7 = utils_ts_7_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/fs/walk", ["https://deno.land/std/testing/asserts", "https://deno.land/std/path/mod"], function (exports_24, context_24) {
    "use strict";
    var asserts_ts_3, mod_ts_3, readDir, readDirSync, stat, statSync;
    var __moduleName = context_24 && context_24.id;
    function createWalkEntrySync(path) {
        path = mod_ts_3.normalize(path);
        const name = mod_ts_3.basename(path);
        const info = statSync(path);
        return {
            path,
            name,
            isFile: info.isFile,
            isDirectory: info.isDirectory,
            isSymlink: info.isSymlink,
        };
    }
    exports_24("createWalkEntrySync", createWalkEntrySync);
    async function createWalkEntry(path) {
        path = mod_ts_3.normalize(path);
        const name = mod_ts_3.basename(path);
        const info = await stat(path);
        return {
            path,
            name,
            isFile: info.isFile,
            isDirectory: info.isDirectory,
            isSymlink: info.isSymlink,
        };
    }
    exports_24("createWalkEntry", createWalkEntry);
    function include(path, exts, match, skip) {
        if (exts && !exts.some((ext) => path.endsWith(ext))) {
            return false;
        }
        if (match && !match.some((pattern) => !!path.match(pattern))) {
            return false;
        }
        if (skip && skip.some((pattern) => !!path.match(pattern))) {
            return false;
        }
        return true;
    }
    /** Walks the file tree rooted at root, yielding each file or directory in the
     * tree filtered according to the given options. The files are walked in lexical
     * order, which makes the output deterministic but means that for very large
     * directories walk() can be inefficient.
     *
     * Options:
     * - maxDepth?: number = Infinity;
     * - includeFiles?: boolean = true;
     * - includeDirs?: boolean = true;
     * - followSymlinks?: boolean = false;
     * - exts?: string[];
     * - match?: RegExp[];
     * - skip?: RegExp[];
     *
     *      for await (const entry of walk(".")) {
     *        console.log(entry.path);
     *        assert(entry.isFile);
     *      };
     */
    async function* walk(root, { maxDepth = Infinity, includeFiles = true, includeDirs = true, followSymlinks = false, exts = undefined, match = undefined, skip = undefined, } = {}) {
        if (maxDepth < 0) {
            return;
        }
        if (includeDirs && include(root, exts, match, skip)) {
            yield await createWalkEntry(root);
        }
        if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
            return;
        }
        for await (const entry of readDir(root)) {
            if (entry.isSymlink) {
                if (followSymlinks) {
                    // TODO(ry) Re-enable followSymlinks.
                    asserts_ts_3.unimplemented();
                }
                else {
                    continue;
                }
            }
            asserts_ts_3.assert(entry.name != null);
            const path = mod_ts_3.join(root, entry.name);
            if (entry.isFile) {
                if (includeFiles && include(path, exts, match, skip)) {
                    yield { path, ...entry };
                }
            }
            else {
                yield* walk(path, {
                    maxDepth: maxDepth - 1,
                    includeFiles,
                    includeDirs,
                    followSymlinks,
                    exts,
                    match,
                    skip,
                });
            }
        }
    }
    exports_24("walk", walk);
    /** Same as walk() but uses synchronous ops */
    function* walkSync(root, { maxDepth = Infinity, includeFiles = true, includeDirs = true, followSymlinks = false, exts = undefined, match = undefined, skip = undefined, } = {}) {
        if (maxDepth < 0) {
            return;
        }
        if (includeDirs && include(root, exts, match, skip)) {
            yield createWalkEntrySync(root);
        }
        if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
            return;
        }
        for (const entry of readDirSync(root)) {
            if (entry.isSymlink) {
                if (followSymlinks) {
                    asserts_ts_3.unimplemented();
                }
                else {
                    continue;
                }
            }
            asserts_ts_3.assert(entry.name != null);
            const path = mod_ts_3.join(root, entry.name);
            if (entry.isFile) {
                if (includeFiles && include(path, exts, match, skip)) {
                    yield { path, ...entry };
                }
            }
            else {
                yield* walkSync(path, {
                    maxDepth: maxDepth - 1,
                    includeFiles,
                    includeDirs,
                    followSymlinks,
                    exts,
                    match,
                    skip,
                });
            }
        }
    }
    exports_24("walkSync", walkSync);
    return {
        setters: [
            function (asserts_ts_3_1) {
                asserts_ts_3 = asserts_ts_3_1;
            },
            function (mod_ts_3_1) {
                mod_ts_3 = mod_ts_3_1;
            }
        ],
        execute: function () {
            readDir = Deno.readDir, readDirSync = Deno.readDirSync, stat = Deno.stat, statSync = Deno.statSync;
        }
    };
});
System.register("https://deno.land/std/fs/expand_glob", ["https://deno.land/std/path/mod", "https://deno.land/std/fs/walk", "https://deno.land/std/testing/asserts"], function (exports_25, context_25) {
    "use strict";
    var mod_ts_4, walk_ts_1, asserts_ts_4, cwd;
    var __moduleName = context_25 && context_25.id;
    // TODO: Maybe make this public somewhere.
    function split(path) {
        const s = mod_ts_4.SEP_PATTERN.source;
        const segments = path
            .replace(new RegExp(`^${s}|${s}$`, "g"), "")
            .split(mod_ts_4.SEP_PATTERN);
        const isAbsolute_ = mod_ts_4.isAbsolute(path);
        return {
            segments,
            isAbsolute: isAbsolute_,
            hasTrailingSep: !!path.match(new RegExp(`${s}$`)),
            winRoot: mod_ts_4.isWindows && isAbsolute_ ? segments.shift() : undefined,
        };
    }
    function throwUnlessNotFound(error) {
        if (!(error instanceof Deno.errors.NotFound)) {
            throw error;
        }
    }
    function comparePath(a, b) {
        if (a.path < b.path)
            return -1;
        if (a.path > b.path)
            return 1;
        return 0;
    }
    /**
     * Expand the glob string from the specified `root` directory and yield each
     * result as a `WalkEntry` object.
     */
    async function* expandGlob(glob, { root = cwd(), exclude = [], includeDirs = true, extended = false, globstar = false, } = {}) {
        const globOptions = { extended, globstar };
        const absRoot = mod_ts_4.isAbsolute(root)
            ? mod_ts_4.normalize(root)
            : mod_ts_4.joinGlobs([cwd(), root], globOptions);
        const resolveFromRoot = (path) => mod_ts_4.isAbsolute(path)
            ? mod_ts_4.normalize(path)
            : mod_ts_4.joinGlobs([absRoot, path], globOptions);
        const excludePatterns = exclude
            .map(resolveFromRoot)
            .map((s) => mod_ts_4.globToRegExp(s, globOptions));
        const shouldInclude = (path) => !excludePatterns.some((p) => !!path.match(p));
        const { segments, hasTrailingSep, winRoot } = split(resolveFromRoot(glob));
        let fixedRoot = winRoot != undefined ? winRoot : "/";
        while (segments.length > 0 && !mod_ts_4.isGlob(segments[0])) {
            const seg = segments.shift();
            asserts_ts_4.assert(seg != null);
            fixedRoot = mod_ts_4.joinGlobs([fixedRoot, seg], globOptions);
        }
        let fixedRootInfo;
        try {
            fixedRootInfo = await walk_ts_1.createWalkEntry(fixedRoot);
        }
        catch (error) {
            return throwUnlessNotFound(error);
        }
        async function* advanceMatch(walkInfo, globSegment) {
            if (!walkInfo.isDirectory) {
                return;
            }
            else if (globSegment == "..") {
                const parentPath = mod_ts_4.joinGlobs([walkInfo.path, ".."], globOptions);
                try {
                    if (shouldInclude(parentPath)) {
                        return yield await walk_ts_1.createWalkEntry(parentPath);
                    }
                }
                catch (error) {
                    throwUnlessNotFound(error);
                }
                return;
            }
            else if (globSegment == "**") {
                return yield* walk_ts_1.walk(walkInfo.path, {
                    includeFiles: false,
                    skip: excludePatterns,
                });
            }
            yield* walk_ts_1.walk(walkInfo.path, {
                maxDepth: 1,
                match: [
                    mod_ts_4.globToRegExp(mod_ts_4.joinGlobs([walkInfo.path, globSegment], globOptions), globOptions),
                ],
                skip: excludePatterns,
            });
        }
        let currentMatches = [fixedRootInfo];
        for (const segment of segments) {
            // Advancing the list of current matches may introduce duplicates, so we
            // pass everything through this Map.
            const nextMatchMap = new Map();
            for (const currentMatch of currentMatches) {
                for await (const nextMatch of advanceMatch(currentMatch, segment)) {
                    nextMatchMap.set(nextMatch.path, nextMatch);
                }
            }
            currentMatches = [...nextMatchMap.values()].sort(comparePath);
        }
        if (hasTrailingSep) {
            currentMatches = currentMatches.filter((entry) => entry.isDirectory);
        }
        if (!includeDirs) {
            currentMatches = currentMatches.filter((entry) => !entry.isDirectory);
        }
        yield* currentMatches;
    }
    exports_25("expandGlob", expandGlob);
    /** Synchronous version of `expandGlob()`. */
    function* expandGlobSync(glob, { root = cwd(), exclude = [], includeDirs = true, extended = false, globstar = false, } = {}) {
        const globOptions = { extended, globstar };
        const absRoot = mod_ts_4.isAbsolute(root)
            ? mod_ts_4.normalize(root)
            : mod_ts_4.joinGlobs([cwd(), root], globOptions);
        const resolveFromRoot = (path) => mod_ts_4.isAbsolute(path)
            ? mod_ts_4.normalize(path)
            : mod_ts_4.joinGlobs([absRoot, path], globOptions);
        const excludePatterns = exclude
            .map(resolveFromRoot)
            .map((s) => mod_ts_4.globToRegExp(s, globOptions));
        const shouldInclude = (path) => !excludePatterns.some((p) => !!path.match(p));
        const { segments, hasTrailingSep, winRoot } = split(resolveFromRoot(glob));
        let fixedRoot = winRoot != undefined ? winRoot : "/";
        while (segments.length > 0 && !mod_ts_4.isGlob(segments[0])) {
            const seg = segments.shift();
            asserts_ts_4.assert(seg != null);
            fixedRoot = mod_ts_4.joinGlobs([fixedRoot, seg], globOptions);
        }
        let fixedRootInfo;
        try {
            fixedRootInfo = walk_ts_1.createWalkEntrySync(fixedRoot);
        }
        catch (error) {
            return throwUnlessNotFound(error);
        }
        function* advanceMatch(walkInfo, globSegment) {
            if (!walkInfo.isDirectory) {
                return;
            }
            else if (globSegment == "..") {
                const parentPath = mod_ts_4.joinGlobs([walkInfo.path, ".."], globOptions);
                try {
                    if (shouldInclude(parentPath)) {
                        return yield walk_ts_1.createWalkEntrySync(parentPath);
                    }
                }
                catch (error) {
                    throwUnlessNotFound(error);
                }
                return;
            }
            else if (globSegment == "**") {
                return yield* walk_ts_1.walkSync(walkInfo.path, {
                    includeFiles: false,
                    skip: excludePatterns,
                });
            }
            yield* walk_ts_1.walkSync(walkInfo.path, {
                maxDepth: 1,
                match: [
                    mod_ts_4.globToRegExp(mod_ts_4.joinGlobs([walkInfo.path, globSegment], globOptions), globOptions),
                ],
                skip: excludePatterns,
            });
        }
        let currentMatches = [fixedRootInfo];
        for (const segment of segments) {
            // Advancing the list of current matches may introduce duplicates, so we
            // pass everything through this Map.
            const nextMatchMap = new Map();
            for (const currentMatch of currentMatches) {
                for (const nextMatch of advanceMatch(currentMatch, segment)) {
                    nextMatchMap.set(nextMatch.path, nextMatch);
                }
            }
            currentMatches = [...nextMatchMap.values()].sort(comparePath);
        }
        if (hasTrailingSep) {
            currentMatches = currentMatches.filter((entry) => entry.isDirectory);
        }
        if (!includeDirs) {
            currentMatches = currentMatches.filter((entry) => !entry.isDirectory);
        }
        yield* currentMatches;
    }
    exports_25("expandGlobSync", expandGlobSync);
    return {
        setters: [
            function (mod_ts_4_1) {
                mod_ts_4 = mod_ts_4_1;
            },
            function (walk_ts_1_1) {
                walk_ts_1 = walk_ts_1_1;
            },
            function (asserts_ts_4_1) {
                asserts_ts_4 = asserts_ts_4_1;
            }
        ],
        execute: function () {
            cwd = Deno.cwd;
        }
    };
});
System.register("https://deno.land/std/fs/move", ["https://deno.land/std/fs/exists", "https://deno.land/std/fs/utils"], function (exports_26, context_26) {
    "use strict";
    var exists_ts_3, utils_ts_8;
    var __moduleName = context_26 && context_26.id;
    /** Moves a file or directory */
    async function move(src, dest, { overwrite = false } = {}) {
        const srcStat = await Deno.stat(src);
        if (srcStat.isDirectory && utils_ts_8.isSubdir(src, dest)) {
            throw new Error(`Cannot move '${src}' to a subdirectory of itself, '${dest}'.`);
        }
        if (overwrite) {
            if (await exists_ts_3.exists(dest)) {
                await Deno.remove(dest, { recursive: true });
            }
            await Deno.rename(src, dest);
        }
        else {
            if (await exists_ts_3.exists(dest)) {
                throw new Error("dest already exists.");
            }
            await Deno.rename(src, dest);
        }
        return;
    }
    exports_26("move", move);
    /** Moves a file or directory */
    function moveSync(src, dest, { overwrite = false } = {}) {
        const srcStat = Deno.statSync(src);
        if (srcStat.isDirectory && utils_ts_8.isSubdir(src, dest)) {
            throw new Error(`Cannot move '${src}' to a subdirectory of itself, '${dest}'.`);
        }
        if (overwrite) {
            if (exists_ts_3.existsSync(dest)) {
                Deno.removeSync(dest, { recursive: true });
            }
            Deno.renameSync(src, dest);
        }
        else {
            if (exists_ts_3.existsSync(dest)) {
                throw new Error("dest already exists.");
            }
            Deno.renameSync(src, dest);
        }
    }
    exports_26("moveSync", moveSync);
    return {
        setters: [
            function (exists_ts_3_1) {
                exists_ts_3 = exists_ts_3_1;
            },
            function (utils_ts_8_1) {
                utils_ts_8 = utils_ts_8_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/fs/copy", ["https://deno.land/std/path/mod", "https://deno.land/std/fs/ensure_dir", "https://deno.land/std/fs/utils", "https://deno.land/std/testing/asserts"], function (exports_27, context_27) {
    "use strict";
    var path, ensure_dir_ts_4, utils_ts_9, asserts_ts_5;
    var __moduleName = context_27 && context_27.id;
    async function ensureValidCopy(src, dest, options, isCopyFolder = false) {
        let destStat;
        try {
            destStat = await Deno.lstat(dest);
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return;
            }
            throw err;
        }
        if (isCopyFolder && !destStat.isDirectory) {
            throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!options.overwrite) {
            throw new Error(`'${dest}' already exists.`);
        }
        return destStat;
    }
    function ensureValidCopySync(src, dest, options, isCopyFolder = false) {
        let destStat;
        try {
            destStat = Deno.lstatSync(dest);
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return;
            }
            throw err;
        }
        if (isCopyFolder && !destStat.isDirectory) {
            throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!options.overwrite) {
            throw new Error(`'${dest}' already exists.`);
        }
        return destStat;
    }
    /* copy file to dest */
    async function copyFile(src, dest, options) {
        await ensureValidCopy(src, dest, options);
        await Deno.copyFile(src, dest);
        if (options.preserveTimestamps) {
            const statInfo = await Deno.stat(src);
            asserts_ts_5.assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
            asserts_ts_5.assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
            await Deno.utime(dest, statInfo.atime, statInfo.mtime);
        }
    }
    /* copy file to dest synchronously */
    function copyFileSync(src, dest, options) {
        ensureValidCopySync(src, dest, options);
        Deno.copyFileSync(src, dest);
        if (options.preserveTimestamps) {
            const statInfo = Deno.statSync(src);
            asserts_ts_5.assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
            asserts_ts_5.assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
            Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
        }
    }
    /* copy symlink to dest */
    async function copySymLink(src, dest, options) {
        await ensureValidCopy(src, dest, options);
        const originSrcFilePath = await Deno.readLink(src);
        const type = utils_ts_9.getFileInfoType(await Deno.lstat(src));
        await Deno.symlink(originSrcFilePath, dest, type);
        if (options.preserveTimestamps) {
            const statInfo = await Deno.lstat(src);
            asserts_ts_5.assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
            asserts_ts_5.assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
            await Deno.utime(dest, statInfo.atime, statInfo.mtime);
        }
    }
    /* copy symlink to dest synchronously */
    function copySymlinkSync(src, dest, options) {
        ensureValidCopySync(src, dest, options);
        const originSrcFilePath = Deno.readLinkSync(src);
        const type = utils_ts_9.getFileInfoType(Deno.lstatSync(src));
        Deno.symlinkSync(originSrcFilePath, dest, type);
        if (options.preserveTimestamps) {
            const statInfo = Deno.lstatSync(src);
            asserts_ts_5.assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
            asserts_ts_5.assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
            Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
        }
    }
    /* copy folder from src to dest. */
    async function copyDir(src, dest, options) {
        const destStat = await ensureValidCopy(src, dest, options, true);
        if (!destStat) {
            await ensure_dir_ts_4.ensureDir(dest);
        }
        if (options.preserveTimestamps) {
            const srcStatInfo = await Deno.stat(src);
            asserts_ts_5.assert(srcStatInfo.atime instanceof Date, `statInfo.atime is unavailable`);
            asserts_ts_5.assert(srcStatInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
            await Deno.utime(dest, srcStatInfo.atime, srcStatInfo.mtime);
        }
        for await (const entry of Deno.readDir(src)) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, path.basename(srcPath));
            if (entry.isSymlink) {
                await copySymLink(srcPath, destPath, options);
            }
            else if (entry.isDirectory) {
                await copyDir(srcPath, destPath, options);
            }
            else if (entry.isFile) {
                await copyFile(srcPath, destPath, options);
            }
        }
    }
    /* copy folder from src to dest synchronously */
    function copyDirSync(src, dest, options) {
        const destStat = ensureValidCopySync(src, dest, options, true);
        if (!destStat) {
            ensure_dir_ts_4.ensureDirSync(dest);
        }
        if (options.preserveTimestamps) {
            const srcStatInfo = Deno.statSync(src);
            asserts_ts_5.assert(srcStatInfo.atime instanceof Date, `statInfo.atime is unavailable`);
            asserts_ts_5.assert(srcStatInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
            Deno.utimeSync(dest, srcStatInfo.atime, srcStatInfo.mtime);
        }
        for (const entry of Deno.readDirSync(src)) {
            asserts_ts_5.assert(entry.name != null, "file.name must be set");
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, path.basename(srcPath));
            if (entry.isSymlink) {
                copySymlinkSync(srcPath, destPath, options);
            }
            else if (entry.isDirectory) {
                copyDirSync(srcPath, destPath, options);
            }
            else if (entry.isFile) {
                copyFileSync(srcPath, destPath, options);
            }
        }
    }
    /**
     * Copy a file or directory. The directory can have contents. Like `cp -r`.
     * Requires the `--allow-read` and `--alow-write` flag.
     * @param src the file/directory path.
     *            Note that if `src` is a directory it will copy everything inside
     *            of this directory, not the entire directory itself
     * @param dest the destination path. Note that if `src` is a file, `dest` cannot
     *             be a directory
     * @param options
     */
    async function copy(src, dest, options = {}) {
        src = path.resolve(src);
        dest = path.resolve(dest);
        if (src === dest) {
            throw new Error("Source and destination cannot be the same.");
        }
        const srcStat = await Deno.lstat(src);
        if (srcStat.isDirectory && utils_ts_9.isSubdir(src, dest)) {
            throw new Error(`Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`);
        }
        if (srcStat.isSymlink) {
            await copySymLink(src, dest, options);
        }
        else if (srcStat.isDirectory) {
            await copyDir(src, dest, options);
        }
        else if (srcStat.isFile) {
            await copyFile(src, dest, options);
        }
    }
    exports_27("copy", copy);
    /**
     * Copy a file or directory. The directory can have contents. Like `cp -r`.
     * Requires the `--allow-read` and `--alow-write` flag.
     * @param src the file/directory path.
     *            Note that if `src` is a directory it will copy everything inside
     *            of this directory, not the entire directory itself
     * @param dest the destination path. Note that if `src` is a file, `dest` cannot
     *             be a directory
     * @param options
     */
    function copySync(src, dest, options = {}) {
        src = path.resolve(src);
        dest = path.resolve(dest);
        if (src === dest) {
            throw new Error("Source and destination cannot be the same.");
        }
        const srcStat = Deno.lstatSync(src);
        if (srcStat.isDirectory && utils_ts_9.isSubdir(src, dest)) {
            throw new Error(`Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`);
        }
        if (srcStat.isSymlink) {
            copySymlinkSync(src, dest, options);
        }
        else if (srcStat.isDirectory) {
            copyDirSync(src, dest, options);
        }
        else if (srcStat.isFile) {
            copyFileSync(src, dest, options);
        }
    }
    exports_27("copySync", copySync);
    return {
        setters: [
            function (path_5) {
                path = path_5;
            },
            function (ensure_dir_ts_4_1) {
                ensure_dir_ts_4 = ensure_dir_ts_4_1;
            },
            function (utils_ts_9_1) {
                utils_ts_9 = utils_ts_9_1;
            },
            function (asserts_ts_5_1) {
                asserts_ts_5 = asserts_ts_5_1;
            }
        ],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/fs/read_file_str", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    /**
     * Read file synchronously and output it as a string.
     *
     * @param filename File to read
     * @param opts Read options
     */
    function readFileStrSync(filename, opts = {}) {
        const decoder = new TextDecoder(opts.encoding);
        return decoder.decode(Deno.readFileSync(filename));
    }
    exports_28("readFileStrSync", readFileStrSync);
    /**
     * Read file and output it as a string.
     *
     * @param filename File to read
     * @param opts Read options
     */
    async function readFileStr(filename, opts = {}) {
        const decoder = new TextDecoder(opts.encoding);
        return decoder.decode(await Deno.readFile(filename));
    }
    exports_28("readFileStr", readFileStr);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/fs/write_file_str", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    /**
     * Write the string to file synchronously.
     *
     * @param filename File to write
     * @param content The content write to file
     * @returns void
     */
    function writeFileStrSync(filename, content) {
        const encoder = new TextEncoder();
        Deno.writeFileSync(filename, encoder.encode(content));
    }
    exports_29("writeFileStrSync", writeFileStrSync);
    /**
     * Write the string to file.
     *
     * @param filename File to write
     * @param content The content write to file
     * @returns Promise<void>
     */
    async function writeFileStr(filename, content) {
        const encoder = new TextEncoder();
        await Deno.writeFile(filename, encoder.encode(content));
    }
    exports_29("writeFileStr", writeFileStr);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/fs/read_json", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    /** Reads a JSON file and then parses it into an object */
    async function readJson(filePath) {
        const decoder = new TextDecoder("utf-8");
        const content = decoder.decode(await Deno.readFile(filePath));
        try {
            return JSON.parse(content);
        }
        catch (err) {
            err.message = `${filePath}: ${err.message}`;
            throw err;
        }
    }
    exports_30("readJson", readJson);
    /** Reads a JSON file and then parses it into an object */
    function readJsonSync(filePath) {
        const decoder = new TextDecoder("utf-8");
        const content = decoder.decode(Deno.readFileSync(filePath));
        try {
            return JSON.parse(content);
        }
        catch (err) {
            err.message = `${filePath}: ${err.message}`;
            throw err;
        }
    }
    exports_30("readJsonSync", readJsonSync);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std/fs/write_json", [], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    /* Writes an object to a JSON file. */
    async function writeJson(filePath, object, options = {}) {
        let contentRaw = "";
        try {
            contentRaw = JSON.stringify(object, options.replacer, options.spaces);
        }
        catch (err) {
            err.message = `${filePath}: ${err.message}`;
            throw err;
        }
        await Deno.writeFile(filePath, new TextEncoder().encode(contentRaw));
    }
    exports_31("writeJson", writeJson);
    /* Writes an object to a JSON file. */
    function writeJsonSync(filePath, object, options = {}) {
        let contentRaw = "";
        try {
            contentRaw = JSON.stringify(object, options.replacer, options.spaces);
        }
        catch (err) {
            err.message = `${filePath}: ${err.message}`;
            throw err;
        }
        Deno.writeFileSync(filePath, new TextEncoder().encode(contentRaw));
    }
    exports_31("writeJsonSync", writeJsonSync);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/fs/eol", [], function (exports_32, context_32) {
    "use strict";
    var EOL, regDetect;
    var __moduleName = context_32 && context_32.id;
    /**
     * Detect the EOL character for string input.
     * returns null if no newline
     */
    function detect(content) {
        const d = content.match(regDetect);
        if (!d || d.length === 0) {
            return null;
        }
        const crlf = d.filter((x) => x === EOL.CRLF);
        if (crlf.length > 0) {
            return EOL.CRLF;
        }
        else {
            return EOL.LF;
        }
    }
    exports_32("detect", detect);
    /** Format the file to the targeted EOL */
    function format(content, eol) {
        return content.replace(regDetect, eol);
    }
    exports_32("format", format);
    return {
        setters: [],
        execute: function () {
            /** EndOfLine character enum */
            (function (EOL) {
                EOL["LF"] = "\n";
                EOL["CRLF"] = "\r\n";
            })(EOL || (EOL = {}));
            exports_32("EOL", EOL);
            regDetect = /(?:\r?\n)/g;
        }
    };
});
System.register("https://deno.land/std/fs/mod", ["https://deno.land/std/fs/empty_dir", "https://deno.land/std/fs/ensure_dir", "https://deno.land/std/fs/ensure_file", "https://deno.land/std/fs/ensure_link", "https://deno.land/std/fs/ensure_symlink", "https://deno.land/std/fs/exists", "https://deno.land/std/fs/expand_glob", "https://deno.land/std/fs/move", "https://deno.land/std/fs/copy", "https://deno.land/std/fs/read_file_str", "https://deno.land/std/fs/write_file_str", "https://deno.land/std/fs/read_json", "https://deno.land/std/fs/write_json", "https://deno.land/std/fs/walk", "https://deno.land/std/fs/eol"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_33(exports);
    }
    return {
        setters: [
            function (empty_dir_ts_1_1) {
                exportStar_2(empty_dir_ts_1_1);
            },
            function (ensure_dir_ts_5_1) {
                exportStar_2(ensure_dir_ts_5_1);
            },
            function (ensure_file_ts_1_1) {
                exportStar_2(ensure_file_ts_1_1);
            },
            function (ensure_link_ts_1_1) {
                exportStar_2(ensure_link_ts_1_1);
            },
            function (ensure_symlink_ts_1_1) {
                exportStar_2(ensure_symlink_ts_1_1);
            },
            function (exists_ts_4_1) {
                exportStar_2(exists_ts_4_1);
            },
            function (expand_glob_ts_1_1) {
                exportStar_2(expand_glob_ts_1_1);
            },
            function (move_ts_1_1) {
                exportStar_2(move_ts_1_1);
            },
            function (copy_ts_1_1) {
                exportStar_2(copy_ts_1_1);
            },
            function (read_file_str_ts_1_1) {
                exportStar_2(read_file_str_ts_1_1);
            },
            function (write_file_str_ts_1_1) {
                exportStar_2(write_file_str_ts_1_1);
            },
            function (read_json_ts_1_1) {
                exportStar_2(read_json_ts_1_1);
            },
            function (write_json_ts_1_1) {
                exportStar_2(write_json_ts_1_1);
            },
            function (walk_ts_2_1) {
                exportStar_2(walk_ts_2_1);
            },
            function (eol_ts_1_1) {
                exportStar_2(eol_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Templates/Resolver", ["https://deno.land/std/fs/mod", "https://deno.land/std/path/mod"], function (exports_34, context_34) {
    "use strict";
    var mod_ts_5, mod_ts_6, Resolver;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (mod_ts_5_1) {
                mod_ts_5 = mod_ts_5_1;
            },
            function (mod_ts_6_1) {
                mod_ts_6 = mod_ts_6_1;
            }
        ],
        execute: function () {
            Resolver = class Resolver {
                constructor(glob, root = ".") {
                    this.glob = glob;
                    this.root = root;
                }
                async resolve() {
                    return await this.getPaths();
                }
                async getPaths() {
                    let paths = [];
                    let files = mod_ts_5.walk(this.root, { match: [this.getRegEx()] });
                    for await (const entry of files) {
                        paths.push(entry.path);
                    }
                    return paths;
                }
                getRegEx() {
                    return mod_ts_6.globToRegExp(this.glob, {
                        extended: true,
                    });
                }
            };
            exports_34("default", Resolver);
        }
    };
});
System.register("https://deno.land/std/uuid/_common", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
    function bytesToUuid(bytes) {
        const bits = [...bytes].map((bit) => {
            const s = bit.toString(16);
            return bit < 0x10 ? "0" + s : s;
        });
        return [
            ...bits.slice(0, 4),
            "-",
            ...bits.slice(4, 6),
            "-",
            ...bits.slice(6, 8),
            "-",
            ...bits.slice(8, 10),
            "-",
            ...bits.slice(10, 16),
        ].join("");
    }
    exports_35("bytesToUuid", bytesToUuid);
    function uuidToBytes(uuid) {
        const bytes = [];
        uuid.replace(/[a-fA-F0-9]{2}/g, (hex) => {
            bytes.push(parseInt(hex, 16));
            return "";
        });
        return bytes;
    }
    exports_35("uuidToBytes", uuidToBytes);
    function stringToBytes(str) {
        str = unescape(encodeURIComponent(str));
        const bytes = new Array(str.length);
        for (let i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }
    exports_35("stringToBytes", stringToBytes);
    function createBuffer(content) {
        const arrayBuffer = new ArrayBuffer(content.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < content.length; i++) {
            uint8Array[i] = content[i];
        }
        return arrayBuffer;
    }
    exports_35("createBuffer", createBuffer);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/uuid/v1", ["https://deno.land/std/uuid/_common"], function (exports_36, context_36) {
    "use strict";
    var _common_ts_1, UUID_RE, _nodeId, _clockseq, _lastMSecs, _lastNSecs;
    var __moduleName = context_36 && context_36.id;
    function validate(id) {
        return UUID_RE.test(id);
    }
    exports_36("validate", validate);
    function generate(options, buf, offset) {
        let i = (buf && offset) || 0;
        const b = buf || [];
        options = options || {};
        let node = options.node || _nodeId;
        let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
        if (node == null || clockseq == null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const seedBytes = options.random ||
                options.rng ||
                crypto.getRandomValues(new Uint8Array(16));
            if (node == null) {
                node = _nodeId = [
                    seedBytes[0] | 0x01,
                    seedBytes[1],
                    seedBytes[2],
                    seedBytes[3],
                    seedBytes[4],
                    seedBytes[5],
                ];
            }
            if (clockseq == null) {
                clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
            }
        }
        let msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
        let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
        const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
        if (dt < 0 && options.clockseq === undefined) {
            clockseq = (clockseq + 1) & 0x3fff;
        }
        if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
            nsecs = 0;
        }
        if (nsecs >= 10000) {
            throw new Error("Can't create more than 10M uuids/sec");
        }
        _lastMSecs = msecs;
        _lastNSecs = nsecs;
        _clockseq = clockseq;
        msecs += 12219292800000;
        const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
        b[i++] = (tl >>> 24) & 0xff;
        b[i++] = (tl >>> 16) & 0xff;
        b[i++] = (tl >>> 8) & 0xff;
        b[i++] = tl & 0xff;
        const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
        b[i++] = (tmh >>> 8) & 0xff;
        b[i++] = tmh & 0xff;
        b[i++] = ((tmh >>> 24) & 0xf) | 0x10;
        b[i++] = (tmh >>> 16) & 0xff;
        b[i++] = (clockseq >>> 8) | 0x80;
        b[i++] = clockseq & 0xff;
        for (let n = 0; n < 6; ++n) {
            b[i + n] = node[n];
        }
        return buf ? buf : _common_ts_1.bytesToUuid(b);
    }
    exports_36("generate", generate);
    return {
        setters: [
            function (_common_ts_1_1) {
                _common_ts_1 = _common_ts_1_1;
            }
        ],
        execute: function () {
            UUID_RE = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i");
            _lastMSecs = 0;
            _lastNSecs = 0;
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/uuid/v4", ["https://deno.land/std/uuid/_common"], function (exports_37, context_37) {
    "use strict";
    var _common_ts_2, UUID_RE;
    var __moduleName = context_37 && context_37.id;
    function validate(id) {
        return UUID_RE.test(id);
    }
    exports_37("validate", validate);
    function generate() {
        const rnds = crypto.getRandomValues(new Uint8Array(16));
        rnds[6] = (rnds[6] & 0x0f) | 0x40; // Version 4
        rnds[8] = (rnds[8] & 0x3f) | 0x80; // Variant 10
        return _common_ts_2.bytesToUuid(rnds);
    }
    exports_37("generate", generate);
    return {
        setters: [
            function (_common_ts_2_1) {
                _common_ts_2 = _common_ts_2_1;
            }
        ],
        execute: function () {
            UUID_RE = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i");
        }
    };
});
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
System.register("https://deno.land/std/hash/sha1", [], function (exports_38, context_38) {
    "use strict";
    var HEX_CHARS, EXTRA, SHIFT, blocks, Sha1;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [],
        execute: function () {
            HEX_CHARS = "0123456789abcdef".split("");
            EXTRA = Uint32Array.of(-2147483648, 8388608, 32768, 128);
            SHIFT = Uint32Array.of(24, 16, 8, 0);
            blocks = new Uint32Array(80);
            Sha1 = class Sha1 {
                constructor(sharedMemory = false) {
                    this.#h0 = 0x67452301;
                    this.#h1 = 0xefcdab89;
                    this.#h2 = 0x98badcfe;
                    this.#h3 = 0x10325476;
                    this.#h4 = 0xc3d2e1f0;
                    this.#lastByteIndex = 0;
                    if (sharedMemory) {
                        this.#blocks = blocks.fill(0, 0, 17);
                    }
                    else {
                        this.#blocks = new Uint32Array(80);
                    }
                    this.#h0 = 0x67452301;
                    this.#h1 = 0xefcdab89;
                    this.#h2 = 0x98badcfe;
                    this.#h3 = 0x10325476;
                    this.#h4 = 0xc3d2e1f0;
                    this.#block = this.#start = this.#bytes = this.#hBytes = 0;
                    this.#finalized = this.#hashed = false;
                }
                #blocks;
                #block;
                #start;
                #bytes;
                #hBytes;
                #finalized;
                #hashed;
                #h0;
                #h1;
                #h2;
                #h3;
                #h4;
                #lastByteIndex;
                update(data) {
                    if (this.#finalized) {
                        return this;
                    }
                    let notString = true;
                    let message;
                    if (data instanceof ArrayBuffer) {
                        message = new Uint8Array(data);
                    }
                    else if (ArrayBuffer.isView(data)) {
                        message = new Uint8Array(data.buffer);
                    }
                    else {
                        notString = false;
                        message = String(data);
                    }
                    let code;
                    let index = 0;
                    let i;
                    const start = this.#start;
                    const length = message.length || 0;
                    const blocks = this.#blocks;
                    while (index < length) {
                        if (this.#hashed) {
                            this.#hashed = false;
                            blocks[0] = this.#block;
                            blocks.fill(0, 1, 17);
                        }
                        if (notString) {
                            for (i = start; index < length && i < 64; ++index) {
                                blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                            }
                        }
                        else {
                            for (i = start; index < length && i < 64; ++index) {
                                code = message.charCodeAt(index);
                                if (code < 0x80) {
                                    blocks[i >> 2] |= code << SHIFT[i++ & 3];
                                }
                                else if (code < 0x800) {
                                    blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
                                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                                }
                                else if (code < 0xd800 || code >= 0xe000) {
                                    blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
                                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                                }
                                else {
                                    code =
                                        0x10000 +
                                            (((code & 0x3ff) << 10) |
                                                (message.charCodeAt(++index) & 0x3ff));
                                    blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
                                    blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
                                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                                }
                            }
                        }
                        this.#lastByteIndex = i;
                        this.#bytes += i - start;
                        if (i >= 64) {
                            this.#block = blocks[16];
                            this.#start = i - 64;
                            this.hash();
                            this.#hashed = true;
                        }
                        else {
                            this.#start = i;
                        }
                    }
                    if (this.#bytes > 4294967295) {
                        this.#hBytes += (this.#bytes / 4294967296) >>> 0;
                        this.#bytes = this.#bytes >>> 0;
                    }
                    return this;
                }
                finalize() {
                    if (this.#finalized) {
                        return;
                    }
                    this.#finalized = true;
                    const blocks = this.#blocks;
                    const i = this.#lastByteIndex;
                    blocks[16] = this.#block;
                    blocks[i >> 2] |= EXTRA[i & 3];
                    this.#block = blocks[16];
                    if (i >= 56) {
                        if (!this.#hashed) {
                            this.hash();
                        }
                        blocks[0] = this.#block;
                        blocks.fill(0, 1, 17);
                    }
                    blocks[14] = (this.#hBytes << 3) | (this.#bytes >>> 29);
                    blocks[15] = this.#bytes << 3;
                    this.hash();
                }
                hash() {
                    let a = this.#h0;
                    let b = this.#h1;
                    let c = this.#h2;
                    let d = this.#h3;
                    let e = this.#h4;
                    let f, j, t;
                    const blocks = this.#blocks;
                    for (j = 16; j < 80; ++j) {
                        t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
                        blocks[j] = (t << 1) | (t >>> 31);
                    }
                    for (j = 0; j < 20; j += 5) {
                        f = (b & c) | (~b & d);
                        t = (a << 5) | (a >>> 27);
                        e = (t + f + e + 1518500249 + blocks[j]) >>> 0;
                        b = (b << 30) | (b >>> 2);
                        f = (a & b) | (~a & c);
                        t = (e << 5) | (e >>> 27);
                        d = (t + f + d + 1518500249 + blocks[j + 1]) >>> 0;
                        a = (a << 30) | (a >>> 2);
                        f = (e & a) | (~e & b);
                        t = (d << 5) | (d >>> 27);
                        c = (t + f + c + 1518500249 + blocks[j + 2]) >>> 0;
                        e = (e << 30) | (e >>> 2);
                        f = (d & e) | (~d & a);
                        t = (c << 5) | (c >>> 27);
                        b = (t + f + b + 1518500249 + blocks[j + 3]) >>> 0;
                        d = (d << 30) | (d >>> 2);
                        f = (c & d) | (~c & e);
                        t = (b << 5) | (b >>> 27);
                        a = (t + f + a + 1518500249 + blocks[j + 4]) >>> 0;
                        c = (c << 30) | (c >>> 2);
                    }
                    for (; j < 40; j += 5) {
                        f = b ^ c ^ d;
                        t = (a << 5) | (a >>> 27);
                        e = (t + f + e + 1859775393 + blocks[j]) >>> 0;
                        b = (b << 30) | (b >>> 2);
                        f = a ^ b ^ c;
                        t = (e << 5) | (e >>> 27);
                        d = (t + f + d + 1859775393 + blocks[j + 1]) >>> 0;
                        a = (a << 30) | (a >>> 2);
                        f = e ^ a ^ b;
                        t = (d << 5) | (d >>> 27);
                        c = (t + f + c + 1859775393 + blocks[j + 2]) >>> 0;
                        e = (e << 30) | (e >>> 2);
                        f = d ^ e ^ a;
                        t = (c << 5) | (c >>> 27);
                        b = (t + f + b + 1859775393 + blocks[j + 3]) >>> 0;
                        d = (d << 30) | (d >>> 2);
                        f = c ^ d ^ e;
                        t = (b << 5) | (b >>> 27);
                        a = (t + f + a + 1859775393 + blocks[j + 4]) >>> 0;
                        c = (c << 30) | (c >>> 2);
                    }
                    for (; j < 60; j += 5) {
                        f = (b & c) | (b & d) | (c & d);
                        t = (a << 5) | (a >>> 27);
                        e = (t + f + e - 1894007588 + blocks[j]) >>> 0;
                        b = (b << 30) | (b >>> 2);
                        f = (a & b) | (a & c) | (b & c);
                        t = (e << 5) | (e >>> 27);
                        d = (t + f + d - 1894007588 + blocks[j + 1]) >>> 0;
                        a = (a << 30) | (a >>> 2);
                        f = (e & a) | (e & b) | (a & b);
                        t = (d << 5) | (d >>> 27);
                        c = (t + f + c - 1894007588 + blocks[j + 2]) >>> 0;
                        e = (e << 30) | (e >>> 2);
                        f = (d & e) | (d & a) | (e & a);
                        t = (c << 5) | (c >>> 27);
                        b = (t + f + b - 1894007588 + blocks[j + 3]) >>> 0;
                        d = (d << 30) | (d >>> 2);
                        f = (c & d) | (c & e) | (d & e);
                        t = (b << 5) | (b >>> 27);
                        a = (t + f + a - 1894007588 + blocks[j + 4]) >>> 0;
                        c = (c << 30) | (c >>> 2);
                    }
                    for (; j < 80; j += 5) {
                        f = b ^ c ^ d;
                        t = (a << 5) | (a >>> 27);
                        e = (t + f + e - 899497514 + blocks[j]) >>> 0;
                        b = (b << 30) | (b >>> 2);
                        f = a ^ b ^ c;
                        t = (e << 5) | (e >>> 27);
                        d = (t + f + d - 899497514 + blocks[j + 1]) >>> 0;
                        a = (a << 30) | (a >>> 2);
                        f = e ^ a ^ b;
                        t = (d << 5) | (d >>> 27);
                        c = (t + f + c - 899497514 + blocks[j + 2]) >>> 0;
                        e = (e << 30) | (e >>> 2);
                        f = d ^ e ^ a;
                        t = (c << 5) | (c >>> 27);
                        b = (t + f + b - 899497514 + blocks[j + 3]) >>> 0;
                        d = (d << 30) | (d >>> 2);
                        f = c ^ d ^ e;
                        t = (b << 5) | (b >>> 27);
                        a = (t + f + a - 899497514 + blocks[j + 4]) >>> 0;
                        c = (c << 30) | (c >>> 2);
                    }
                    this.#h0 = (this.#h0 + a) >>> 0;
                    this.#h1 = (this.#h1 + b) >>> 0;
                    this.#h2 = (this.#h2 + c) >>> 0;
                    this.#h3 = (this.#h3 + d) >>> 0;
                    this.#h4 = (this.#h4 + e) >>> 0;
                }
                hex() {
                    this.finalize();
                    const h0 = this.#h0;
                    const h1 = this.#h1;
                    const h2 = this.#h2;
                    const h3 = this.#h3;
                    const h4 = this.#h4;
                    return (HEX_CHARS[(h0 >> 28) & 0x0f] +
                        HEX_CHARS[(h0 >> 24) & 0x0f] +
                        HEX_CHARS[(h0 >> 20) & 0x0f] +
                        HEX_CHARS[(h0 >> 16) & 0x0f] +
                        HEX_CHARS[(h0 >> 12) & 0x0f] +
                        HEX_CHARS[(h0 >> 8) & 0x0f] +
                        HEX_CHARS[(h0 >> 4) & 0x0f] +
                        HEX_CHARS[h0 & 0x0f] +
                        HEX_CHARS[(h1 >> 28) & 0x0f] +
                        HEX_CHARS[(h1 >> 24) & 0x0f] +
                        HEX_CHARS[(h1 >> 20) & 0x0f] +
                        HEX_CHARS[(h1 >> 16) & 0x0f] +
                        HEX_CHARS[(h1 >> 12) & 0x0f] +
                        HEX_CHARS[(h1 >> 8) & 0x0f] +
                        HEX_CHARS[(h1 >> 4) & 0x0f] +
                        HEX_CHARS[h1 & 0x0f] +
                        HEX_CHARS[(h2 >> 28) & 0x0f] +
                        HEX_CHARS[(h2 >> 24) & 0x0f] +
                        HEX_CHARS[(h2 >> 20) & 0x0f] +
                        HEX_CHARS[(h2 >> 16) & 0x0f] +
                        HEX_CHARS[(h2 >> 12) & 0x0f] +
                        HEX_CHARS[(h2 >> 8) & 0x0f] +
                        HEX_CHARS[(h2 >> 4) & 0x0f] +
                        HEX_CHARS[h2 & 0x0f] +
                        HEX_CHARS[(h3 >> 28) & 0x0f] +
                        HEX_CHARS[(h3 >> 24) & 0x0f] +
                        HEX_CHARS[(h3 >> 20) & 0x0f] +
                        HEX_CHARS[(h3 >> 16) & 0x0f] +
                        HEX_CHARS[(h3 >> 12) & 0x0f] +
                        HEX_CHARS[(h3 >> 8) & 0x0f] +
                        HEX_CHARS[(h3 >> 4) & 0x0f] +
                        HEX_CHARS[h3 & 0x0f] +
                        HEX_CHARS[(h4 >> 28) & 0x0f] +
                        HEX_CHARS[(h4 >> 24) & 0x0f] +
                        HEX_CHARS[(h4 >> 20) & 0x0f] +
                        HEX_CHARS[(h4 >> 16) & 0x0f] +
                        HEX_CHARS[(h4 >> 12) & 0x0f] +
                        HEX_CHARS[(h4 >> 8) & 0x0f] +
                        HEX_CHARS[(h4 >> 4) & 0x0f] +
                        HEX_CHARS[h4 & 0x0f]);
                }
                toString() {
                    return this.hex();
                }
                digest() {
                    this.finalize();
                    const h0 = this.#h0;
                    const h1 = this.#h1;
                    const h2 = this.#h2;
                    const h3 = this.#h3;
                    const h4 = this.#h4;
                    return [
                        (h0 >> 24) & 0xff,
                        (h0 >> 16) & 0xff,
                        (h0 >> 8) & 0xff,
                        h0 & 0xff,
                        (h1 >> 24) & 0xff,
                        (h1 >> 16) & 0xff,
                        (h1 >> 8) & 0xff,
                        h1 & 0xff,
                        (h2 >> 24) & 0xff,
                        (h2 >> 16) & 0xff,
                        (h2 >> 8) & 0xff,
                        h2 & 0xff,
                        (h3 >> 24) & 0xff,
                        (h3 >> 16) & 0xff,
                        (h3 >> 8) & 0xff,
                        h3 & 0xff,
                        (h4 >> 24) & 0xff,
                        (h4 >> 16) & 0xff,
                        (h4 >> 8) & 0xff,
                        h4 & 0xff,
                    ];
                }
                array() {
                    return this.digest();
                }
                arrayBuffer() {
                    this.finalize();
                    return Uint32Array.of(this.#h0, this.#h1, this.#h2, this.#h3, this.#h4)
                        .buffer;
                }
            };
            exports_38("Sha1", Sha1);
        }
    };
});
System.register("https://deno.land/std/node/util", [], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    function isArray(value) {
        return Array.isArray(value);
    }
    exports_39("isArray", isArray);
    function isBoolean(value) {
        return typeof value === "boolean" || value instanceof Boolean;
    }
    exports_39("isBoolean", isBoolean);
    function isNull(value) {
        return value === null;
    }
    exports_39("isNull", isNull);
    function isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    exports_39("isNullOrUndefined", isNullOrUndefined);
    function isNumber(value) {
        return typeof value === "number" || value instanceof Number;
    }
    exports_39("isNumber", isNumber);
    function isString(value) {
        return typeof value === "string" || value instanceof String;
    }
    exports_39("isString", isString);
    function isSymbol(value) {
        return typeof value === "symbol";
    }
    exports_39("isSymbol", isSymbol);
    function isUndefined(value) {
        return value === undefined;
    }
    exports_39("isUndefined", isUndefined);
    function isObject(value) {
        return value !== null && typeof value === "object";
    }
    exports_39("isObject", isObject);
    function isError(e) {
        return e instanceof Error;
    }
    exports_39("isError", isError);
    function isFunction(value) {
        return typeof value === "function";
    }
    exports_39("isFunction", isFunction);
    function isRegExp(value) {
        return value instanceof RegExp;
    }
    exports_39("isRegExp", isRegExp);
    function isPrimitive(value) {
        return (value === null || (typeof value !== "object" && typeof value !== "function"));
    }
    exports_39("isPrimitive", isPrimitive);
    function validateIntegerRange(value, name, min = -2147483648, max = 2147483647) {
        // The defaults for min and max correspond to the limits of 32-bit integers.
        if (!Number.isInteger(value)) {
            throw new Error(`${name} must be 'an integer' but was ${value}`);
        }
        if (value < min || value > max) {
            throw new Error(`${name} must be >= ${min} && <= ${max}.  Value was ${value}`);
        }
    }
    exports_39("validateIntegerRange", validateIntegerRange);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/uuid/v5", ["https://deno.land/std/uuid/_common", "https://deno.land/std/hash/sha1", "https://deno.land/std/node/util", "https://deno.land/std/testing/asserts"], function (exports_40, context_40) {
    "use strict";
    var _common_ts_3, sha1_ts_1, util_ts_1, asserts_ts_6, UUID_RE;
    var __moduleName = context_40 && context_40.id;
    function validate(id) {
        return UUID_RE.test(id);
    }
    exports_40("validate", validate);
    function generate(options, buf, offset) {
        const i = (buf && offset) || 0;
        let { value, namespace } = options;
        if (util_ts_1.isString(value))
            value = _common_ts_3.stringToBytes(value);
        if (util_ts_1.isString(namespace))
            namespace = _common_ts_3.uuidToBytes(namespace);
        asserts_ts_6.assert(namespace.length === 16, "namespace must be uuid string or an Array of 16 byte values");
        const content = namespace.concat(value);
        const bytes = new sha1_ts_1.Sha1().update(_common_ts_3.createBuffer(content)).digest();
        bytes[6] = (bytes[6] & 0x0f) | 0x50;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        if (buf) {
            for (let idx = 0; idx < 16; ++idx) {
                buf[i + idx] = bytes[idx];
            }
        }
        return buf || _common_ts_3.bytesToUuid(bytes);
    }
    exports_40("generate", generate);
    return {
        setters: [
            function (_common_ts_3_1) {
                _common_ts_3 = _common_ts_3_1;
            },
            function (sha1_ts_1_1) {
                sha1_ts_1 = sha1_ts_1_1;
            },
            function (util_ts_1_1) {
                util_ts_1 = util_ts_1_1;
            },
            function (asserts_ts_6_1) {
                asserts_ts_6 = asserts_ts_6_1;
            }
        ],
        execute: function () {
            UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        }
    };
});
System.register("https://deno.land/std/uuid/mod", ["https://deno.land/std/uuid/v1", "https://deno.land/std/uuid/v4", "https://deno.land/std/uuid/v5"], function (exports_41, context_41) {
    "use strict";
    var v1, v4, v5, NIL_UUID, NOT_IMPLEMENTED, v3;
    var __moduleName = context_41 && context_41.id;
    function isNil(val) {
        return val === NIL_UUID;
    }
    exports_41("isNil", isNil);
    return {
        setters: [
            function (v1_1) {
                v1 = v1_1;
            },
            function (v4_1) {
                v4 = v4_1;
            },
            function (v5_1) {
                v5 = v5_1;
            }
        ],
        execute: function () {
            exports_41("v1", v1);
            exports_41("v4", v4);
            exports_41("v5", v5);
            exports_41("NIL_UUID", NIL_UUID = "00000000-0000-0000-0000-000000000000");
            NOT_IMPLEMENTED = {
                generate() {
                    throw new Error("Not implemented");
                },
                validate() {
                    throw new Error("Not implemented");
                },
            };
            // TODO Implement
            exports_41("v3", v3 = NOT_IMPLEMENTED);
        }
    };
});
System.register("https://deno.land/std@v0.42.0/path/interface", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std@v0.42.0/path/constants", [], function (exports_43, context_43) {
    "use strict";
    var build, CHAR_UPPERCASE_A, CHAR_LOWERCASE_A, CHAR_UPPERCASE_Z, CHAR_LOWERCASE_Z, CHAR_DOT, CHAR_FORWARD_SLASH, CHAR_BACKWARD_SLASH, CHAR_VERTICAL_LINE, CHAR_COLON, CHAR_QUESTION_MARK, CHAR_UNDERSCORE, CHAR_LINE_FEED, CHAR_CARRIAGE_RETURN, CHAR_TAB, CHAR_FORM_FEED, CHAR_EXCLAMATION_MARK, CHAR_HASH, CHAR_SPACE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_LEFT_ANGLE_BRACKET, CHAR_RIGHT_ANGLE_BRACKET, CHAR_LEFT_CURLY_BRACKET, CHAR_RIGHT_CURLY_BRACKET, CHAR_HYPHEN_MINUS, CHAR_PLUS, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_PERCENT, CHAR_SEMICOLON, CHAR_CIRCUMFLEX_ACCENT, CHAR_GRAVE_ACCENT, CHAR_AT, CHAR_AMPERSAND, CHAR_EQUAL, CHAR_0, CHAR_9, isWindows, EOL, SEP, SEP_PATTERN;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [],
        execute: function () {
            build = Deno.build;
            // Alphabet chars.
            exports_43("CHAR_UPPERCASE_A", CHAR_UPPERCASE_A = 65); /* A */
            exports_43("CHAR_LOWERCASE_A", CHAR_LOWERCASE_A = 97); /* a */
            exports_43("CHAR_UPPERCASE_Z", CHAR_UPPERCASE_Z = 90); /* Z */
            exports_43("CHAR_LOWERCASE_Z", CHAR_LOWERCASE_Z = 122); /* z */
            // Non-alphabetic chars.
            exports_43("CHAR_DOT", CHAR_DOT = 46); /* . */
            exports_43("CHAR_FORWARD_SLASH", CHAR_FORWARD_SLASH = 47); /* / */
            exports_43("CHAR_BACKWARD_SLASH", CHAR_BACKWARD_SLASH = 92); /* \ */
            exports_43("CHAR_VERTICAL_LINE", CHAR_VERTICAL_LINE = 124); /* | */
            exports_43("CHAR_COLON", CHAR_COLON = 58); /* : */
            exports_43("CHAR_QUESTION_MARK", CHAR_QUESTION_MARK = 63); /* ? */
            exports_43("CHAR_UNDERSCORE", CHAR_UNDERSCORE = 95); /* _ */
            exports_43("CHAR_LINE_FEED", CHAR_LINE_FEED = 10); /* \n */
            exports_43("CHAR_CARRIAGE_RETURN", CHAR_CARRIAGE_RETURN = 13); /* \r */
            exports_43("CHAR_TAB", CHAR_TAB = 9); /* \t */
            exports_43("CHAR_FORM_FEED", CHAR_FORM_FEED = 12); /* \f */
            exports_43("CHAR_EXCLAMATION_MARK", CHAR_EXCLAMATION_MARK = 33); /* ! */
            exports_43("CHAR_HASH", CHAR_HASH = 35); /* # */
            exports_43("CHAR_SPACE", CHAR_SPACE = 32); /*   */
            exports_43("CHAR_NO_BREAK_SPACE", CHAR_NO_BREAK_SPACE = 160); /* \u00A0 */
            exports_43("CHAR_ZERO_WIDTH_NOBREAK_SPACE", CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279); /* \uFEFF */
            exports_43("CHAR_LEFT_SQUARE_BRACKET", CHAR_LEFT_SQUARE_BRACKET = 91); /* [ */
            exports_43("CHAR_RIGHT_SQUARE_BRACKET", CHAR_RIGHT_SQUARE_BRACKET = 93); /* ] */
            exports_43("CHAR_LEFT_ANGLE_BRACKET", CHAR_LEFT_ANGLE_BRACKET = 60); /* < */
            exports_43("CHAR_RIGHT_ANGLE_BRACKET", CHAR_RIGHT_ANGLE_BRACKET = 62); /* > */
            exports_43("CHAR_LEFT_CURLY_BRACKET", CHAR_LEFT_CURLY_BRACKET = 123); /* { */
            exports_43("CHAR_RIGHT_CURLY_BRACKET", CHAR_RIGHT_CURLY_BRACKET = 125); /* } */
            exports_43("CHAR_HYPHEN_MINUS", CHAR_HYPHEN_MINUS = 45); /* - */
            exports_43("CHAR_PLUS", CHAR_PLUS = 43); /* + */
            exports_43("CHAR_DOUBLE_QUOTE", CHAR_DOUBLE_QUOTE = 34); /* " */
            exports_43("CHAR_SINGLE_QUOTE", CHAR_SINGLE_QUOTE = 39); /* ' */
            exports_43("CHAR_PERCENT", CHAR_PERCENT = 37); /* % */
            exports_43("CHAR_SEMICOLON", CHAR_SEMICOLON = 59); /* ; */
            exports_43("CHAR_CIRCUMFLEX_ACCENT", CHAR_CIRCUMFLEX_ACCENT = 94); /* ^ */
            exports_43("CHAR_GRAVE_ACCENT", CHAR_GRAVE_ACCENT = 96); /* ` */
            exports_43("CHAR_AT", CHAR_AT = 64); /* @ */
            exports_43("CHAR_AMPERSAND", CHAR_AMPERSAND = 38); /* & */
            exports_43("CHAR_EQUAL", CHAR_EQUAL = 61); /* = */
            // Digits
            exports_43("CHAR_0", CHAR_0 = 48); /* 0 */
            exports_43("CHAR_9", CHAR_9 = 57); /* 9 */
            exports_43("isWindows", isWindows = build.os === "windows");
            exports_43("EOL", EOL = isWindows ? "\r\n" : "\n");
            exports_43("SEP", SEP = isWindows ? "\\" : "/");
            exports_43("SEP_PATTERN", SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/);
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std@v0.42.0/path/utils", ["https://deno.land/std@v0.42.0/path/constants"], function (exports_44, context_44) {
    "use strict";
    var constants_ts_7;
    var __moduleName = context_44 && context_44.id;
    function assertPath(path) {
        if (typeof path !== "string") {
            throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
        }
    }
    exports_44("assertPath", assertPath);
    function isPosixPathSeparator(code) {
        return code === constants_ts_7.CHAR_FORWARD_SLASH;
    }
    exports_44("isPosixPathSeparator", isPosixPathSeparator);
    function isPathSeparator(code) {
        return isPosixPathSeparator(code) || code === constants_ts_7.CHAR_BACKWARD_SLASH;
    }
    exports_44("isPathSeparator", isPathSeparator);
    function isWindowsDeviceRoot(code) {
        return ((code >= constants_ts_7.CHAR_LOWERCASE_A && code <= constants_ts_7.CHAR_LOWERCASE_Z) ||
            (code >= constants_ts_7.CHAR_UPPERCASE_A && code <= constants_ts_7.CHAR_UPPERCASE_Z));
    }
    exports_44("isWindowsDeviceRoot", isWindowsDeviceRoot);
    // Resolves . and .. elements in a path with directory names
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
        let res = "";
        let lastSegmentLength = 0;
        let lastSlash = -1;
        let dots = 0;
        let code;
        for (let i = 0, len = path.length; i <= len; ++i) {
            if (i < len)
                code = path.charCodeAt(i);
            else if (isPathSeparator(code))
                break;
            else
                code = constants_ts_7.CHAR_FORWARD_SLASH;
            if (isPathSeparator(code)) {
                if (lastSlash === i - 1 || dots === 1) {
                    // NOOP
                }
                else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 ||
                        lastSegmentLength !== 2 ||
                        res.charCodeAt(res.length - 1) !== constants_ts_7.CHAR_DOT ||
                        res.charCodeAt(res.length - 2) !== constants_ts_7.CHAR_DOT) {
                        if (res.length > 2) {
                            const lastSlashIndex = res.lastIndexOf(separator);
                            if (lastSlashIndex === -1) {
                                res = "";
                                lastSegmentLength = 0;
                            }
                            else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                        else if (res.length === 2 || res.length === 1) {
                            res = "";
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        if (res.length > 0)
                            res += `${separator}..`;
                        else
                            res = "..";
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0)
                        res += separator + path.slice(lastSlash + 1, i);
                    else
                        res = path.slice(lastSlash + 1, i);
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === constants_ts_7.CHAR_DOT && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    exports_44("normalizeString", normalizeString);
    function _format(sep, pathObject) {
        const dir = pathObject.dir || pathObject.root;
        const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
        if (!dir)
            return base;
        if (dir === pathObject.root)
            return dir + base;
        return dir + sep + base;
    }
    exports_44("_format", _format);
    return {
        setters: [
            function (constants_ts_7_1) {
                constants_ts_7 = constants_ts_7_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@v0.42.0/fmt/colors", [], function (exports_45, context_45) {
    "use strict";
    var noColor, enabled;
    var __moduleName = context_45 && context_45.id;
    function setColorEnabled(value) {
        if (noColor) {
            return;
        }
        enabled = value;
    }
    exports_45("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
        return enabled;
    }
    exports_45("getColorEnabled", getColorEnabled);
    function code(open, close) {
        return {
            open: `\x1b[${open}m`,
            close: `\x1b[${close}m`,
            regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
        };
    }
    function run(str, code) {
        return enabled
            ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
            : str;
    }
    function reset(str) {
        return run(str, code(0, 0));
    }
    exports_45("reset", reset);
    function bold(str) {
        return run(str, code(1, 22));
    }
    exports_45("bold", bold);
    function dim(str) {
        return run(str, code(2, 22));
    }
    exports_45("dim", dim);
    function italic(str) {
        return run(str, code(3, 23));
    }
    exports_45("italic", italic);
    function underline(str) {
        return run(str, code(4, 24));
    }
    exports_45("underline", underline);
    function inverse(str) {
        return run(str, code(7, 27));
    }
    exports_45("inverse", inverse);
    function hidden(str) {
        return run(str, code(8, 28));
    }
    exports_45("hidden", hidden);
    function strikethrough(str) {
        return run(str, code(9, 29));
    }
    exports_45("strikethrough", strikethrough);
    function black(str) {
        return run(str, code(30, 39));
    }
    exports_45("black", black);
    function red(str) {
        return run(str, code(31, 39));
    }
    exports_45("red", red);
    function green(str) {
        return run(str, code(32, 39));
    }
    exports_45("green", green);
    function yellow(str) {
        return run(str, code(33, 39));
    }
    exports_45("yellow", yellow);
    function blue(str) {
        return run(str, code(34, 39));
    }
    exports_45("blue", blue);
    function magenta(str) {
        return run(str, code(35, 39));
    }
    exports_45("magenta", magenta);
    function cyan(str) {
        return run(str, code(36, 39));
    }
    exports_45("cyan", cyan);
    function white(str) {
        return run(str, code(37, 39));
    }
    exports_45("white", white);
    function gray(str) {
        return run(str, code(90, 39));
    }
    exports_45("gray", gray);
    function bgBlack(str) {
        return run(str, code(40, 49));
    }
    exports_45("bgBlack", bgBlack);
    function bgRed(str) {
        return run(str, code(41, 49));
    }
    exports_45("bgRed", bgRed);
    function bgGreen(str) {
        return run(str, code(42, 49));
    }
    exports_45("bgGreen", bgGreen);
    function bgYellow(str) {
        return run(str, code(43, 49));
    }
    exports_45("bgYellow", bgYellow);
    function bgBlue(str) {
        return run(str, code(44, 49));
    }
    exports_45("bgBlue", bgBlue);
    function bgMagenta(str) {
        return run(str, code(45, 49));
    }
    exports_45("bgMagenta", bgMagenta);
    function bgCyan(str) {
        return run(str, code(46, 49));
    }
    exports_45("bgCyan", bgCyan);
    function bgWhite(str) {
        return run(str, code(47, 49));
    }
    exports_45("bgWhite", bgWhite);
    return {
        setters: [],
        execute: function () {
            // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
            /**
             * A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
             * on npm.
             *
             * ```
             * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
             * console.log(bgBlue(red(bold("Hello world!"))));
             * ```
             *
             * This module supports `NO_COLOR` environmental variable disabling any coloring
             * if `NO_COLOR` is set.
             */
            noColor = Deno.noColor;
            enabled = !noColor;
        }
    };
});
System.register("https://deno.land/std@v0.42.0/testing/diff", [], function (exports_46, context_46) {
    "use strict";
    var DiffType, REMOVED, COMMON, ADDED;
    var __moduleName = context_46 && context_46.id;
    function createCommon(A, B, reverse) {
        const common = [];
        if (A.length === 0 || B.length === 0)
            return [];
        for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
            if (A[reverse ? A.length - i - 1 : i] === B[reverse ? B.length - i - 1 : i]) {
                common.push(A[reverse ? A.length - i - 1 : i]);
            }
            else {
                return common;
            }
        }
        return common;
    }
    function diff(A, B) {
        const prefixCommon = createCommon(A, B);
        const suffixCommon = createCommon(A.slice(prefixCommon.length), B.slice(prefixCommon.length), true).reverse();
        A = suffixCommon.length
            ? A.slice(prefixCommon.length, -suffixCommon.length)
            : A.slice(prefixCommon.length);
        B = suffixCommon.length
            ? B.slice(prefixCommon.length, -suffixCommon.length)
            : B.slice(prefixCommon.length);
        const swapped = B.length > A.length;
        [A, B] = swapped ? [B, A] : [A, B];
        const M = A.length;
        const N = B.length;
        if (!M && !N && !suffixCommon.length && !prefixCommon.length)
            return [];
        if (!N) {
            return [
                ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
                ...A.map((a) => ({
                    type: swapped ? DiffType.added : DiffType.removed,
                    value: a,
                })),
                ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
            ];
        }
        const offset = N;
        const delta = M - N;
        const size = M + N + 1;
        const fp = new Array(size).fill({ y: -1 });
        /**
         * INFO:
         * This buffer is used to save memory and improve performance.
         * The first half is used to save route and last half is used to save diff
         * type.
         * This is because, when I kept new uint8array area to save type,performance
         * worsened.
         */
        const routes = new Uint32Array((M * N + size + 1) * 2);
        const diffTypesPtrOffset = routes.length / 2;
        let ptr = 0;
        let p = -1;
        function backTrace(A, B, current, swapped) {
            const M = A.length;
            const N = B.length;
            const result = [];
            let a = M - 1;
            let b = N - 1;
            let j = routes[current.id];
            let type = routes[current.id + diffTypesPtrOffset];
            while (true) {
                if (!j && !type)
                    break;
                const prev = j;
                if (type === REMOVED) {
                    result.unshift({
                        type: swapped ? DiffType.removed : DiffType.added,
                        value: B[b],
                    });
                    b -= 1;
                }
                else if (type === ADDED) {
                    result.unshift({
                        type: swapped ? DiffType.added : DiffType.removed,
                        value: A[a],
                    });
                    a -= 1;
                }
                else {
                    result.unshift({ type: DiffType.common, value: A[a] });
                    a -= 1;
                    b -= 1;
                }
                j = routes[prev];
                type = routes[prev + diffTypesPtrOffset];
            }
            return result;
        }
        function createFP(slide, down, k, M) {
            if (slide && slide.y === -1 && down && down.y === -1) {
                return { y: 0, id: 0 };
            }
            if ((down && down.y === -1) ||
                k === M ||
                (slide && slide.y) > (down && down.y) + 1) {
                const prev = slide.id;
                ptr++;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = ADDED;
                return { y: slide.y, id: ptr };
            }
            else {
                const prev = down.id;
                ptr++;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = REMOVED;
                return { y: down.y + 1, id: ptr };
            }
        }
        function snake(k, slide, down, _offset, A, B) {
            const M = A.length;
            const N = B.length;
            if (k < -N || M < k)
                return { y: -1, id: -1 };
            const fp = createFP(slide, down, k, M);
            while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
                const prev = fp.id;
                ptr++;
                fp.id = ptr;
                fp.y += 1;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = COMMON;
            }
            return fp;
        }
        while (fp[delta + offset].y < N) {
            p = p + 1;
            for (let k = -p; k < delta; ++k) {
                fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
            }
            for (let k = delta + p; k > delta; --k) {
                fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
            }
            fp[delta + offset] = snake(delta, fp[delta - 1 + offset], fp[delta + 1 + offset], offset, A, B);
        }
        return [
            ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
            ...backTrace(A, B, fp[delta + offset], swapped),
            ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ];
    }
    exports_46("default", diff);
    return {
        setters: [],
        execute: function () {
            (function (DiffType) {
                DiffType["removed"] = "removed";
                DiffType["common"] = "common";
                DiffType["added"] = "added";
            })(DiffType || (DiffType = {}));
            exports_46("DiffType", DiffType);
            REMOVED = 1;
            COMMON = 2;
            ADDED = 3;
        }
    };
});
System.register("https://deno.land/std@v0.42.0/testing/asserts", ["https://deno.land/std@v0.42.0/fmt/colors", "https://deno.land/std@v0.42.0/testing/diff"], function (exports_47, context_47) {
    "use strict";
    var colors_ts_2, diff_ts_2, CAN_NOT_DISPLAY, AssertionError;
    var __moduleName = context_47 && context_47.id;
    function format(v) {
        let string = Deno.inspect(v);
        if (typeof v == "string") {
            string = `"${string.replace(/(?=["\\])/g, "\\")}"`;
        }
        return string;
    }
    function createColor(diffType) {
        switch (diffType) {
            case diff_ts_2.DiffType.added:
                return (s) => colors_ts_2.green(colors_ts_2.bold(s));
            case diff_ts_2.DiffType.removed:
                return (s) => colors_ts_2.red(colors_ts_2.bold(s));
            default:
                return colors_ts_2.white;
        }
    }
    function createSign(diffType) {
        switch (diffType) {
            case diff_ts_2.DiffType.added:
                return "+   ";
            case diff_ts_2.DiffType.removed:
                return "-   ";
            default:
                return "    ";
        }
    }
    function buildMessage(diffResult) {
        const messages = [];
        messages.push("");
        messages.push("");
        messages.push(`    ${colors_ts_2.gray(colors_ts_2.bold("[Diff]"))} ${colors_ts_2.red(colors_ts_2.bold("Actual"))} / ${colors_ts_2.green(colors_ts_2.bold("Expected"))}`);
        messages.push("");
        messages.push("");
        diffResult.forEach((result) => {
            const c = createColor(result.type);
            messages.push(c(`${createSign(result.type)}${result.value}`));
        });
        messages.push("");
        return messages;
    }
    function isKeyedCollection(x) {
        return [Symbol.iterator, "size"].every((k) => k in x);
    }
    function equal(c, d) {
        const seen = new Map();
        return (function compare(a, b) {
            // Have to render RegExp & Date for string comparison
            // unless it's mistreated as object
            if (a &&
                b &&
                ((a instanceof RegExp && b instanceof RegExp) ||
                    (a instanceof Date && b instanceof Date))) {
                return String(a) === String(b);
            }
            if (Object.is(a, b)) {
                return true;
            }
            if (a && typeof a === "object" && b && typeof b === "object") {
                if (seen.get(a) === b) {
                    return true;
                }
                if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
                    return false;
                }
                if (isKeyedCollection(a) && isKeyedCollection(b)) {
                    if (a.size !== b.size) {
                        return false;
                    }
                    let unmatchedEntries = a.size;
                    for (const [aKey, aValue] of a.entries()) {
                        for (const [bKey, bValue] of b.entries()) {
                            /* Given that Map keys can be references, we need
                             * to ensure that they are also deeply equal */
                            if ((aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
                                (compare(aKey, bKey) && compare(aValue, bValue))) {
                                unmatchedEntries--;
                            }
                        }
                    }
                    return unmatchedEntries === 0;
                }
                const merged = { ...a, ...b };
                for (const key in merged) {
                    if (!compare(a && a[key], b && b[key])) {
                        return false;
                    }
                }
                seen.set(a, b);
                return true;
            }
            return false;
        })(c, d);
    }
    exports_47("equal", equal);
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
        if (!expr) {
            throw new AssertionError(msg);
        }
    }
    exports_47("assert", assert);
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     */
    function assertEquals(actual, expected, msg) {
        if (equal(actual, expected)) {
            return;
        }
        let message = "";
        const actualString = format(actual);
        const expectedString = format(expected);
        try {
            const diffResult = diff_ts_2.default(actualString.split("\n"), expectedString.split("\n"));
            message = buildMessage(diffResult).join("\n");
        }
        catch (e) {
            message = `\n${colors_ts_2.red(CAN_NOT_DISPLAY)} + \n\n`;
        }
        if (msg) {
            message = msg;
        }
        throw new AssertionError(message);
    }
    exports_47("assertEquals", assertEquals);
    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     */
    function assertNotEquals(actual, expected, msg) {
        if (!equal(actual, expected)) {
            return;
        }
        let actualString;
        let expectedString;
        try {
            actualString = String(actual);
        }
        catch (e) {
            actualString = "[Cannot display]";
        }
        try {
            expectedString = String(expected);
        }
        catch (e) {
            expectedString = "[Cannot display]";
        }
        if (!msg) {
            msg = `actual: ${actualString} expected: ${expectedString}`;
        }
        throw new AssertionError(msg);
    }
    exports_47("assertNotEquals", assertNotEquals);
    /**
     * Make an assertion that `actual` and `expected` are strictly equal.  If
     * not then throw.
     */
    function assertStrictEq(actual, expected, msg) {
        if (actual !== expected) {
            let actualString;
            let expectedString;
            try {
                actualString = String(actual);
            }
            catch (e) {
                actualString = "[Cannot display]";
            }
            try {
                expectedString = String(expected);
            }
            catch (e) {
                expectedString = "[Cannot display]";
            }
            if (!msg) {
                msg = `actual: ${actualString} expected: ${expectedString}`;
            }
            throw new AssertionError(msg);
        }
    }
    exports_47("assertStrictEq", assertStrictEq);
    /**
     * Make an assertion that actual contains expected. If not
     * then thrown.
     */
    function assertStrContains(actual, expected, msg) {
        if (!actual.includes(expected)) {
            if (!msg) {
                msg = `actual: "${actual}" expected to contains: "${expected}"`;
            }
            throw new AssertionError(msg);
        }
    }
    exports_47("assertStrContains", assertStrContains);
    /**
     * Make an assertion that `actual` contains the `expected` values
     * If not then thrown.
     */
    function assertArrayContains(actual, expected, msg) {
        const missing = [];
        for (let i = 0; i < expected.length; i++) {
            let found = false;
            for (let j = 0; j < actual.length; j++) {
                if (equal(expected[i], actual[j])) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                missing.push(expected[i]);
            }
        }
        if (missing.length === 0) {
            return;
        }
        if (!msg) {
            msg = `actual: "${actual}" expected to contains: "${expected}"`;
            msg += "\n";
            msg += `missing: ${missing}`;
        }
        throw new AssertionError(msg);
    }
    exports_47("assertArrayContains", assertArrayContains);
    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then thrown
     */
    function assertMatch(actual, expected, msg) {
        if (!expected.test(actual)) {
            if (!msg) {
                msg = `actual: "${actual}" expected to match: "${expected}"`;
            }
            throw new AssertionError(msg);
        }
    }
    exports_47("assertMatch", assertMatch);
    /**
     * Forcefully throws a failed assertion
     */
    function fail(msg) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        assert(false, `Failed assertion${msg ? `: ${msg}` : "."}`);
    }
    exports_47("fail", fail);
    /** Executes a function, expecting it to throw.  If it does not, then it
     * throws.  An error class and a string that should be included in the
     * error message can also be asserted.
     */
    function assertThrows(fn, ErrorClass, msgIncludes = "", msg) {
        let doesThrow = false;
        let error = null;
        try {
            fn();
        }
        catch (e) {
            if (ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)) {
                msg = `Expected error to be instance of "${ErrorClass.name}", but was "${e.constructor.name}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            if (msgIncludes && !e.message.includes(msgIncludes)) {
                msg = `Expected error message to include "${msgIncludes}", but got "${e.message}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            doesThrow = true;
            error = e;
        }
        if (!doesThrow) {
            msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
            throw new AssertionError(msg);
        }
        return error;
    }
    exports_47("assertThrows", assertThrows);
    async function assertThrowsAsync(fn, ErrorClass, msgIncludes = "", msg) {
        let doesThrow = false;
        let error = null;
        try {
            await fn();
        }
        catch (e) {
            if (ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)) {
                msg = `Expected error to be instance of "${ErrorClass.name}", but got "${e.name}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            if (msgIncludes && !e.message.includes(msgIncludes)) {
                msg = `Expected error message to include "${msgIncludes}", but got "${e.message}"${msg ? `: ${msg}` : "."}`;
                throw new AssertionError(msg);
            }
            doesThrow = true;
            error = e;
        }
        if (!doesThrow) {
            msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
            throw new AssertionError(msg);
        }
        return error;
    }
    exports_47("assertThrowsAsync", assertThrowsAsync);
    /** Use this to stub out methods that will throw when invoked. */
    function unimplemented(msg) {
        throw new AssertionError(msg || "unimplemented");
    }
    exports_47("unimplemented", unimplemented);
    /** Use this to assert unreachable code. */
    function unreachable() {
        throw new AssertionError("unreachable");
    }
    exports_47("unreachable", unreachable);
    return {
        setters: [
            function (colors_ts_2_1) {
                colors_ts_2 = colors_ts_2_1;
            },
            function (diff_ts_2_1) {
                diff_ts_2 = diff_ts_2_1;
            }
        ],
        execute: function () {
            CAN_NOT_DISPLAY = "[Cannot display]";
            AssertionError = class AssertionError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "AssertionError";
                }
            };
            exports_47("AssertionError", AssertionError);
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std@v0.42.0/path/win32", ["https://deno.land/std@v0.42.0/path/constants", "https://deno.land/std@v0.42.0/path/utils", "https://deno.land/std@v0.42.0/testing/asserts"], function (exports_48, context_48) {
    "use strict";
    var cwd, env, constants_ts_8, utils_ts_10, asserts_ts_7, sep, delimiter;
    var __moduleName = context_48 && context_48.id;
    function resolve(...pathSegments) {
        let resolvedDevice = "";
        let resolvedTail = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
            }
            else if (!resolvedDevice) {
                path = cwd();
            }
            else {
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = env.get(`=${resolvedDevice}`) || cwd();
                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined ||
                    path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                    path = `${resolvedDevice}\\`;
                }
            }
            utils_ts_10.assertPath(path);
            const len = path.length;
            // Skip empty entries
            if (len === 0)
                continue;
            let rootEnd = 0;
            let device = "";
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len > 1) {
                if (utils_ts_10.isPathSeparator(code)) {
                    // Possible UNC root
                    // If we started with a separator, we know we at least have an
                    // absolute path of some kind (UNC or otherwise)
                    isAbsolute = true;
                    if (utils_ts_10.isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            const firstPart = path.slice(last, j);
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            for (; j < len; ++j) {
                                if (!utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                for (; j < len; ++j) {
                                    if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                        break;
                                }
                                if (j === len) {
                                    // We matched a UNC root only
                                    device = `\\\\${firstPart}\\${path.slice(last)}`;
                                    rootEnd = j;
                                }
                                else if (j !== last) {
                                    // We matched a UNC root with leftovers
                                    device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                    rootEnd = j;
                                }
                            }
                        }
                    }
                    else {
                        rootEnd = 1;
                    }
                }
                else if (utils_ts_10.isWindowsDeviceRoot(code)) {
                    // Possible device root
                    if (path.charCodeAt(1) === constants_ts_8.CHAR_COLON) {
                        device = path.slice(0, 2);
                        rootEnd = 2;
                        if (len > 2) {
                            if (utils_ts_10.isPathSeparator(path.charCodeAt(2))) {
                                // Treat separator following drive name as an absolute path
                                // indicator
                                isAbsolute = true;
                                rootEnd = 3;
                            }
                        }
                    }
                }
            }
            else if (utils_ts_10.isPathSeparator(code)) {
                // `path` contains just a path separator
                rootEnd = 1;
                isAbsolute = true;
            }
            if (device.length > 0 &&
                resolvedDevice.length > 0 &&
                device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                // This path points to another device so it is not applicable
                continue;
            }
            if (resolvedDevice.length === 0 && device.length > 0) {
                resolvedDevice = device;
            }
            if (!resolvedAbsolute) {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
            }
            if (resolvedAbsolute && resolvedDevice.length > 0)
                break;
        }
        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)
        // Normalize the tail path
        resolvedTail = utils_ts_10.normalizeString(resolvedTail, !resolvedAbsolute, "\\", utils_ts_10.isPathSeparator);
        return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
    }
    exports_48("resolve", resolve);
    function normalize(path) {
        utils_ts_10.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (utils_ts_10.isPathSeparator(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an absolute
                // path of some kind (UNC or otherwise)
                isAbsolute = true;
                if (utils_ts_10.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                // Return the normalized version of the UNC root since there
                                // is nothing left to process
                                return `\\\\${firstPart}\\${path.slice(last)}\\`;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (utils_ts_10.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === constants_ts_8.CHAR_COLON) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (utils_ts_10.isPathSeparator(path.charCodeAt(2))) {
                            // Treat separator following drive name as an absolute path
                            // indicator
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        }
        else if (utils_ts_10.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid unnecessary
            // work
            return "\\";
        }
        let tail;
        if (rootEnd < len) {
            tail = utils_ts_10.normalizeString(path.slice(rootEnd), !isAbsolute, "\\", utils_ts_10.isPathSeparator);
        }
        else {
            tail = "";
        }
        if (tail.length === 0 && !isAbsolute)
            tail = ".";
        if (tail.length > 0 && utils_ts_10.isPathSeparator(path.charCodeAt(len - 1))) {
            tail += "\\";
        }
        if (device === undefined) {
            if (isAbsolute) {
                if (tail.length > 0)
                    return `\\${tail}`;
                else
                    return "\\";
            }
            else if (tail.length > 0) {
                return tail;
            }
            else {
                return "";
            }
        }
        else if (isAbsolute) {
            if (tail.length > 0)
                return `${device}\\${tail}`;
            else
                return `${device}\\`;
        }
        else if (tail.length > 0) {
            return device + tail;
        }
        else {
            return device;
        }
    }
    exports_48("normalize", normalize);
    function isAbsolute(path) {
        utils_ts_10.assertPath(path);
        const len = path.length;
        if (len === 0)
            return false;
        const code = path.charCodeAt(0);
        if (utils_ts_10.isPathSeparator(code)) {
            return true;
        }
        else if (utils_ts_10.isWindowsDeviceRoot(code)) {
            // Possible device root
            if (len > 2 && path.charCodeAt(1) === constants_ts_8.CHAR_COLON) {
                if (utils_ts_10.isPathSeparator(path.charCodeAt(2)))
                    return true;
            }
        }
        return false;
    }
    exports_48("isAbsolute", isAbsolute);
    function join(...paths) {
        const pathsCount = paths.length;
        if (pathsCount === 0)
            return ".";
        let joined;
        let firstPart = null;
        for (let i = 0; i < pathsCount; ++i) {
            const path = paths[i];
            utils_ts_10.assertPath(path);
            if (path.length > 0) {
                if (joined === undefined)
                    joined = firstPart = path;
                else
                    joined += `\\${path}`;
            }
        }
        if (joined === undefined)
            return ".";
        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for an UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at an UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as an UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        asserts_ts_7.assert(firstPart != null);
        if (utils_ts_10.isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1) {
                if (utils_ts_10.isPathSeparator(firstPart.charCodeAt(1))) {
                    ++slashCount;
                    if (firstLen > 2) {
                        if (utils_ts_10.isPathSeparator(firstPart.charCodeAt(2)))
                            ++slashCount;
                        else {
                            // We matched a UNC path in the first part
                            needsReplace = false;
                        }
                    }
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            for (; slashCount < joined.length; ++slashCount) {
                if (!utils_ts_10.isPathSeparator(joined.charCodeAt(slashCount)))
                    break;
            }
            // Replace the slashes if needed
            if (slashCount >= 2)
                joined = `\\${joined.slice(slashCount)}`;
        }
        return normalize(joined);
    }
    exports_48("join", join);
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    function relative(from, to) {
        utils_ts_10.assertPath(from);
        utils_ts_10.assertPath(to);
        if (from === to)
            return "";
        const fromOrig = resolve(from);
        const toOrig = resolve(to);
        if (fromOrig === toOrig)
            return "";
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to)
            return "";
        // Trim any leading backslashes
        let fromStart = 0;
        let fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== constants_ts_8.CHAR_BACKWARD_SLASH)
                break;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        for (; fromEnd - 1 > fromStart; --fromEnd) {
            if (from.charCodeAt(fromEnd - 1) !== constants_ts_8.CHAR_BACKWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 0;
        let toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== constants_ts_8.CHAR_BACKWARD_SLASH)
                break;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        for (; toEnd - 1 > toStart; --toEnd) {
            if (to.charCodeAt(toEnd - 1) !== constants_ts_8.CHAR_BACKWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === constants_ts_8.CHAR_BACKWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                        return toOrig.slice(toStart + i + 1);
                    }
                    else if (i === 2) {
                        // We get here if `from` is the device root.
                        // For example: from='C:\\'; to='C:\\foo'
                        return toOrig.slice(toStart + i);
                    }
                }
                if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === constants_ts_8.CHAR_BACKWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo'
                        lastCommonSep = i;
                    }
                    else if (i === 2) {
                        // We get here if `to` is the device root.
                        // For example: from='C:\\foo\\bar'; to='C:\\'
                        lastCommonSep = 3;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === constants_ts_8.CHAR_BACKWARD_SLASH)
                lastCommonSep = i;
        }
        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length && lastCommonSep === -1) {
            return toOrig;
        }
        let out = "";
        if (lastCommonSep === -1)
            lastCommonSep = 0;
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === constants_ts_8.CHAR_BACKWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "\\..";
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) {
            return out + toOrig.slice(toStart + lastCommonSep, toEnd);
        }
        else {
            toStart += lastCommonSep;
            if (toOrig.charCodeAt(toStart) === constants_ts_8.CHAR_BACKWARD_SLASH)
                ++toStart;
            return toOrig.slice(toStart, toEnd);
        }
    }
    exports_48("relative", relative);
    function toNamespacedPath(path) {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== "string")
            return path;
        if (path.length === 0)
            return "";
        const resolvedPath = resolve(path);
        if (resolvedPath.length >= 3) {
            if (resolvedPath.charCodeAt(0) === constants_ts_8.CHAR_BACKWARD_SLASH) {
                // Possible UNC root
                if (resolvedPath.charCodeAt(1) === constants_ts_8.CHAR_BACKWARD_SLASH) {
                    const code = resolvedPath.charCodeAt(2);
                    if (code !== constants_ts_8.CHAR_QUESTION_MARK && code !== constants_ts_8.CHAR_DOT) {
                        // Matched non-long UNC root, convert the path to a long UNC path
                        return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                    }
                }
            }
            else if (utils_ts_10.isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
                // Possible device root
                if (resolvedPath.charCodeAt(1) === constants_ts_8.CHAR_COLON &&
                    resolvedPath.charCodeAt(2) === constants_ts_8.CHAR_BACKWARD_SLASH) {
                    // Matched device root, convert the path to a long UNC path
                    return `\\\\?\\${resolvedPath}`;
                }
            }
        }
        return path;
    }
    exports_48("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        utils_ts_10.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = -1;
        let end = -1;
        let matchedSlash = true;
        let offset = 0;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (utils_ts_10.isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = offset = 1;
                if (utils_ts_10.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                return path;
                            }
                            if (j !== last) {
                                // We matched a UNC root with leftovers
                                // Offset by 1 to include the separator after the UNC root to
                                // treat it as a "normal root" on top of a (UNC) root
                                rootEnd = offset = j + 1;
                            }
                        }
                    }
                }
            }
            else if (utils_ts_10.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === constants_ts_8.CHAR_COLON) {
                    rootEnd = offset = 2;
                    if (len > 2) {
                        if (utils_ts_10.isPathSeparator(path.charCodeAt(2)))
                            rootEnd = offset = 3;
                    }
                }
            }
        }
        else if (utils_ts_10.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work
            return path;
        }
        for (let i = len - 1; i >= offset; --i) {
            if (utils_ts_10.isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            if (rootEnd === -1)
                return ".";
            else
                end = rootEnd;
        }
        return path.slice(0, end);
    }
    exports_48("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        utils_ts_10.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2) {
            const drive = path.charCodeAt(0);
            if (utils_ts_10.isWindowsDeviceRoot(drive)) {
                if (path.charCodeAt(1) === constants_ts_8.CHAR_COLON)
                    start = 2;
            }
        }
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (utils_ts_10.isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= start; --i) {
                if (utils_ts_10.isPathSeparator(path.charCodeAt(i))) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_48("basename", basename);
    function extname(path) {
        utils_ts_10.assertPath(path);
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            path.charCodeAt(1) === constants_ts_8.CHAR_COLON &&
            utils_ts_10.isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }
        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (utils_ts_10.isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_8.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_48("extname", extname);
    function format(pathObject) {
        /* eslint-disable max-len */
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return utils_ts_10._format("\\", pathObject);
    }
    exports_48("format", format);
    function parse(path) {
        utils_ts_10.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        const len = path.length;
        if (len === 0)
            return ret;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (utils_ts_10.isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = 1;
                if (utils_ts_10.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (utils_ts_10.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                rootEnd = j;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                rootEnd = j + 1;
                            }
                        }
                    }
                }
            }
            else if (utils_ts_10.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === constants_ts_8.CHAR_COLON) {
                    rootEnd = 2;
                    if (len > 2) {
                        if (utils_ts_10.isPathSeparator(path.charCodeAt(2))) {
                            if (len === 3) {
                                // `path` contains just a drive root, exit early to avoid
                                // unnecessary work
                                ret.root = ret.dir = path;
                                return ret;
                            }
                            rootEnd = 3;
                        }
                    }
                    else {
                        // `path` contains just a drive root, exit early to avoid
                        // unnecessary work
                        ret.root = ret.dir = path;
                        return ret;
                    }
                }
            }
        }
        else if (utils_ts_10.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work
            ret.root = ret.dir = path;
            return ret;
        }
        if (rootEnd > 0)
            ret.root = path.slice(0, rootEnd);
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (utils_ts_10.isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_8.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
        else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
            ret.ext = path.slice(startDot, end);
        }
        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else
            ret.dir = ret.root;
        return ret;
    }
    exports_48("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///C:/Users/foo"); // "C:\\Users\\foo"
     *      fromFileUrl("file:///home/foo"); // "\\home\\foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
        return new URL(url).pathname
            .replace(/^\/(?=[A-Za-z]:\/)/, "")
            .replace(/\//g, "\\");
    }
    exports_48("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (constants_ts_8_1) {
                constants_ts_8 = constants_ts_8_1;
            },
            function (utils_ts_10_1) {
                utils_ts_10 = utils_ts_10_1;
            },
            function (asserts_ts_7_1) {
                asserts_ts_7 = asserts_ts_7_1;
            }
        ],
        execute: function () {
            cwd = Deno.cwd, env = Deno.env;
            exports_48("sep", sep = "\\");
            exports_48("delimiter", delimiter = ";");
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std@v0.42.0/path/posix", ["https://deno.land/std@v0.42.0/path/constants", "https://deno.land/std@v0.42.0/path/utils"], function (exports_49, context_49) {
    "use strict";
    var cwd, constants_ts_9, utils_ts_11, sep, delimiter;
    var __moduleName = context_49 && context_49.id;
    // path.resolve([from ...], to)
    function resolve(...pathSegments) {
        let resolvedPath = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            let path;
            if (i >= 0)
                path = pathSegments[i];
            else
                path = cwd();
            utils_ts_11.assertPath(path);
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === constants_ts_9.CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = utils_ts_11.normalizeString(resolvedPath, !resolvedAbsolute, "/", utils_ts_11.isPosixPathSeparator);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
                return `/${resolvedPath}`;
            else
                return "/";
        }
        else if (resolvedPath.length > 0)
            return resolvedPath;
        else
            return ".";
    }
    exports_49("resolve", resolve);
    function normalize(path) {
        utils_ts_11.assertPath(path);
        if (path.length === 0)
            return ".";
        const isAbsolute = path.charCodeAt(0) === constants_ts_9.CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === constants_ts_9.CHAR_FORWARD_SLASH;
        // Normalize the path
        path = utils_ts_11.normalizeString(path, !isAbsolute, "/", utils_ts_11.isPosixPathSeparator);
        if (path.length === 0 && !isAbsolute)
            path = ".";
        if (path.length > 0 && trailingSeparator)
            path += "/";
        if (isAbsolute)
            return `/${path}`;
        return path;
    }
    exports_49("normalize", normalize);
    function isAbsolute(path) {
        utils_ts_11.assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === constants_ts_9.CHAR_FORWARD_SLASH;
    }
    exports_49("isAbsolute", isAbsolute);
    function join(...paths) {
        if (paths.length === 0)
            return ".";
        let joined;
        for (let i = 0, len = paths.length; i < len; ++i) {
            const path = paths[i];
            utils_ts_11.assertPath(path);
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `/${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalize(joined);
    }
    exports_49("join", join);
    function relative(from, to) {
        utils_ts_11.assertPath(from);
        utils_ts_11.assertPath(to);
        if (from === to)
            return "";
        from = resolve(from);
        to = resolve(to);
        if (from === to)
            return "";
        // Trim any leading backslashes
        let fromStart = 1;
        const fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== constants_ts_9.CHAR_FORWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 1;
        const toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== constants_ts_9.CHAR_FORWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === constants_ts_9.CHAR_FORWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='/foo/bar'; to='/foo/bar/baz'
                        return to.slice(toStart + i + 1);
                    }
                    else if (i === 0) {
                        // We get here if `from` is the root
                        // For example: from='/'; to='/foo'
                        return to.slice(toStart + i);
                    }
                }
                else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === constants_ts_9.CHAR_FORWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='/foo/bar/baz'; to='/foo/bar'
                        lastCommonSep = i;
                    }
                    else if (i === 0) {
                        // We get here if `to` is the root.
                        // For example: from='/foo'; to='/'
                        lastCommonSep = 0;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === constants_ts_9.CHAR_FORWARD_SLASH)
                lastCommonSep = i;
        }
        let out = "";
        // Generate the relative path based on the path difference between `to`
        // and `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === constants_ts_9.CHAR_FORWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "/..";
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === constants_ts_9.CHAR_FORWARD_SLASH)
                ++toStart;
            return to.slice(toStart);
        }
    }
    exports_49("relative", relative);
    function toNamespacedPath(path) {
        // Non-op on posix systems
        return path;
    }
    exports_49("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        utils_ts_11.assertPath(path);
        if (path.length === 0)
            return ".";
        const hasRoot = path.charCodeAt(0) === constants_ts_9.CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === constants_ts_9.CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1)
            return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
            return "//";
        return path.slice(0, end);
    }
    exports_49("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        utils_ts_11.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === constants_ts_9.CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === constants_ts_9.CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_49("basename", basename);
    function extname(path) {
        utils_ts_11.assertPath(path);
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            const code = path.charCodeAt(i);
            if (code === constants_ts_9.CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_9.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_49("extname", extname);
    function format(pathObject) {
        /* eslint-disable max-len */
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return utils_ts_11._format("/", pathObject);
    }
    exports_49("format", format);
    function parse(path) {
        utils_ts_11.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
            return ret;
        const isAbsolute = path.charCodeAt(0) === constants_ts_9.CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = "/";
            start = 1;
        }
        else {
            start = 0;
        }
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (code === constants_ts_9.CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === constants_ts_9.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute) {
                    ret.base = ret.name = path.slice(1, end);
                }
                else {
                    ret.base = ret.name = path.slice(startPart, end);
                }
            }
        }
        else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
            ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
            ret.dir = "/";
        return ret;
    }
    exports_49("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///home/foo"); // "/home/foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
        return new URL(url).pathname;
    }
    exports_49("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (constants_ts_9_1) {
                constants_ts_9 = constants_ts_9_1;
            },
            function (utils_ts_11_1) {
                utils_ts_11 = utils_ts_11_1;
            }
        ],
        execute: function () {
            cwd = Deno.cwd;
            exports_49("sep", sep = "/");
            exports_49("delimiter", delimiter = ":");
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std@v0.42.0/path/common", ["https://deno.land/std@v0.42.0/path/constants"], function (exports_50, context_50) {
    "use strict";
    var constants_ts_10;
    var __moduleName = context_50 && context_50.id;
    /** Determines the common path from a set of paths, using an optional separator,
     * which defaults to the OS default separator.
     *
     *       import { common } from "https://deno.land/std/path/mod.ts";
     *       const p = common([
     *         "./deno/std/path/mod.ts",
     *         "./deno/std/fs/mod.ts",
     *       ]);
     *       console.log(p); // "./deno/std/"
     *
     */
    function common(paths, sep = constants_ts_10.SEP) {
        const [first = "", ...remaining] = paths;
        if (first === "" || remaining.length === 0) {
            return first.substring(0, first.lastIndexOf(sep) + 1);
        }
        const parts = first.split(sep);
        let endOfPrefix = parts.length;
        for (const path of remaining) {
            const compare = path.split(sep);
            for (let i = 0; i < endOfPrefix; i++) {
                if (compare[i] !== parts[i]) {
                    endOfPrefix = i;
                }
            }
            if (endOfPrefix === 0) {
                return "";
            }
        }
        const prefix = parts.slice(0, endOfPrefix).join(sep);
        return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
    }
    exports_50("common", common);
    return {
        setters: [
            function (constants_ts_10_1) {
                constants_ts_10 = constants_ts_10_1;
            }
        ],
        execute: function () {
        }
    };
});
// This file is ported from globrex@0.1.2
// MIT License
// Copyright (c) 2018 Terkel Gjervig Nielsen
System.register("https://deno.land/std@v0.42.0/path/globrex", [], function (exports_51, context_51) {
    "use strict";
    var isWin, SEP, SEP_ESC, SEP_RAW, GLOBSTAR, WILDCARD, GLOBSTAR_SEGMENT, WILDCARD_SEGMENT;
    var __moduleName = context_51 && context_51.id;
    /**
     * Convert any glob pattern to a JavaScript Regexp object
     * @param glob Glob pattern to convert
     * @param opts Configuration object
     * @returns Converted object with string, segments and RegExp object
     */
    function globrex(glob, { extended = false, globstar = false, strict = false, filepath = false, flags = "", } = {}) {
        const sepPattern = new RegExp(`^${SEP}${strict ? "" : "+"}$`);
        let regex = "";
        let segment = "";
        let pathRegexStr = "";
        const pathSegments = [];
        // If we are doing extended matching, this boolean is true when we are inside
        // a group (eg {*.html,*.js}), and false otherwise.
        let inGroup = false;
        let inRange = false;
        // extglob stack. Keep track of scope
        const ext = [];
        // Helper function to build string and segments
        function add(str, options = { split: false, last: false, only: "" }) {
            const { split, last, only } = options;
            if (only !== "path")
                regex += str;
            if (filepath && only !== "regex") {
                pathRegexStr += str.match(sepPattern) ? SEP : str;
                if (split) {
                    if (last)
                        segment += str;
                    if (segment !== "") {
                        // change it 'includes'
                        if (!flags.includes("g"))
                            segment = `^${segment}$`;
                        pathSegments.push(new RegExp(segment, flags));
                    }
                    segment = "";
                }
                else {
                    segment += str;
                }
            }
        }
        let c, n;
        for (let i = 0; i < glob.length; i++) {
            c = glob[i];
            n = glob[i + 1];
            if (["\\", "$", "^", ".", "="].includes(c)) {
                add(`\\${c}`);
                continue;
            }
            if (c.match(sepPattern)) {
                add(SEP, { split: true });
                if (n != null && n.match(sepPattern) && !strict)
                    regex += "?";
                continue;
            }
            if (c === "(") {
                if (ext.length) {
                    add(`${c}?:`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ")") {
                if (ext.length) {
                    add(c);
                    const type = ext.pop();
                    if (type === "@") {
                        add("{1}");
                    }
                    else if (type === "!") {
                        add(WILDCARD);
                    }
                    else {
                        add(type);
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "|") {
                if (ext.length) {
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "+") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "@" && extended) {
                if (n === "(") {
                    ext.push(c);
                    continue;
                }
            }
            if (c === "!") {
                if (extended) {
                    if (inRange) {
                        add("^");
                        continue;
                    }
                    if (n === "(") {
                        ext.push(c);
                        add("(?!");
                        i++;
                        continue;
                    }
                    add(`\\${c}`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "?") {
                if (extended) {
                    if (n === "(") {
                        ext.push(c);
                    }
                    else {
                        add(".");
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "[") {
                if (inRange && n === ":") {
                    i++; // skip [
                    let value = "";
                    while (glob[++i] !== ":")
                        value += glob[i];
                    if (value === "alnum")
                        add("(?:\\w|\\d)");
                    else if (value === "space")
                        add("\\s");
                    else if (value === "digit")
                        add("\\d");
                    i++; // skip last ]
                    continue;
                }
                if (extended) {
                    inRange = true;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "]") {
                if (extended) {
                    inRange = false;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "{") {
                if (extended) {
                    inGroup = true;
                    add("(?:");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "}") {
                if (extended) {
                    inGroup = false;
                    add(")");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ",") {
                if (inGroup) {
                    add("|");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "*") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                // Move over all consecutive "*"'s.
                // Also store the previous and next characters
                const prevChar = glob[i - 1];
                let starCount = 1;
                while (glob[i + 1] === "*") {
                    starCount++;
                    i++;
                }
                const nextChar = glob[i + 1];
                if (!globstar) {
                    // globstar is disabled, so treat any number of "*" as one
                    add(".*");
                }
                else {
                    // globstar is enabled, so determine if this is a globstar segment
                    const isGlobstar = starCount > 1 && // multiple "*"'s
                        // from the start of the segment
                        [SEP_RAW, "/", undefined].includes(prevChar) &&
                        // to the end of the segment
                        [SEP_RAW, "/", undefined].includes(nextChar);
                    if (isGlobstar) {
                        // it's a globstar, so match zero or more path segments
                        add(GLOBSTAR, { only: "regex" });
                        add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
                        i++; // move over the "/"
                    }
                    else {
                        // it's not a globstar, so only match one path segment
                        add(WILDCARD, { only: "regex" });
                        add(WILDCARD_SEGMENT, { only: "path" });
                    }
                }
                continue;
            }
            add(c);
        }
        // When regexp 'g' flag is specified don't
        // constrain the regular expression with ^ & $
        if (!flags.includes("g")) {
            regex = `^${regex}$`;
            segment = `^${segment}$`;
            if (filepath)
                pathRegexStr = `^${pathRegexStr}$`;
        }
        const result = { regex: new RegExp(regex, flags) };
        // Push the last segment
        if (filepath) {
            pathSegments.push(new RegExp(segment, flags));
            result.path = {
                regex: new RegExp(pathRegexStr, flags),
                segments: pathSegments,
                globstar: new RegExp(!flags.includes("g") ? `^${GLOBSTAR_SEGMENT}$` : GLOBSTAR_SEGMENT, flags),
            };
        }
        return result;
    }
    exports_51("globrex", globrex);
    return {
        setters: [],
        execute: function () {
            isWin = Deno.build.os === "windows";
            SEP = isWin ? `(?:\\\\|\\/)` : `\\/`;
            SEP_ESC = isWin ? `\\\\` : `/`;
            SEP_RAW = isWin ? `\\` : `/`;
            GLOBSTAR = `(?:(?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD = `(?:[^${SEP_ESC}/]*)`;
            GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD_SEGMENT = `(?:[^${SEP_ESC}/]*)`;
        }
    };
});
System.register("https://deno.land/std@v0.42.0/path/glob", ["https://deno.land/std@v0.42.0/path/constants", "https://deno.land/std@v0.42.0/path/globrex", "https://deno.land/std@v0.42.0/path/mod", "https://deno.land/std@v0.42.0/testing/asserts"], function (exports_52, context_52) {
    "use strict";
    var constants_ts_11, globrex_ts_3, mod_ts_7, asserts_ts_8;
    var __moduleName = context_52 && context_52.id;
    /**
     * Generate a regex based on glob pattern and options
     * This was meant to be using the the `fs.walk` function
     * but can be used anywhere else.
     * Examples:
     *
     *     Looking for all the `ts` files:
     *     walkSync(".", {
     *       match: [globToRegExp("*.ts")]
     *     })
     *
     *     Looking for all the `.json` files in any subfolder:
     *     walkSync(".", {
     *       match: [globToRegExp(join("a", "**", "*.json"),{
     *         flags: "g",
     *         extended: true,
     *         globstar: true
     *       })]
     *     })
     *
     * @param glob - Glob pattern to be used
     * @param options - Specific options for the glob pattern
     * @returns A RegExp for the glob pattern
     */
    function globToRegExp(glob, { extended = false, globstar = true } = {}) {
        const result = globrex_ts_3.globrex(glob, {
            extended,
            globstar,
            strict: false,
            filepath: true,
        });
        asserts_ts_8.assert(result.path != null);
        return result.path.regex;
    }
    exports_52("globToRegExp", globToRegExp);
    /** Test whether the given string is a glob */
    function isGlob(str) {
        const chars = { "{": "}", "(": ")", "[": "]" };
        /* eslint-disable-next-line max-len */
        const regex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
        if (str === "") {
            return false;
        }
        let match;
        while ((match = regex.exec(str))) {
            if (match[2])
                return true;
            let idx = match.index + match[0].length;
            // if an open bracket/brace/paren is escaped,
            // set the index to the next closing character
            const open = match[1];
            const close = open ? chars[open] : null;
            if (open && close) {
                const n = str.indexOf(close, idx);
                if (n !== -1) {
                    idx = n + 1;
                }
            }
            str = str.slice(idx);
        }
        return false;
    }
    exports_52("isGlob", isGlob);
    /** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */
    function normalizeGlob(glob, { globstar = false } = {}) {
        if (!!glob.match(/\0/g)) {
            throw new Error(`Glob contains invalid characters: "${glob}"`);
        }
        if (!globstar) {
            return mod_ts_7.normalize(glob);
        }
        const s = constants_ts_11.SEP_PATTERN.source;
        const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
        return mod_ts_7.normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
    }
    exports_52("normalizeGlob", normalizeGlob);
    /** Like join(), but doesn't collapse "**\/.." when `globstar` is true. */
    function joinGlobs(globs, { extended = false, globstar = false } = {}) {
        if (!globstar || globs.length == 0) {
            return mod_ts_7.join(...globs);
        }
        if (globs.length === 0)
            return ".";
        let joined;
        for (const glob of globs) {
            const path = glob;
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `${constants_ts_11.SEP}${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalizeGlob(joined, { extended, globstar });
    }
    exports_52("joinGlobs", joinGlobs);
    return {
        setters: [
            function (constants_ts_11_1) {
                constants_ts_11 = constants_ts_11_1;
            },
            function (globrex_ts_3_1) {
                globrex_ts_3 = globrex_ts_3_1;
            },
            function (mod_ts_7_1) {
                mod_ts_7 = mod_ts_7_1;
            },
            function (asserts_ts_8_1) {
                asserts_ts_8 = asserts_ts_8_1;
            }
        ],
        execute: function () {
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/
System.register("https://deno.land/std@v0.42.0/path/mod", ["https://deno.land/std@v0.42.0/path/win32", "https://deno.land/std@v0.42.0/path/posix", "https://deno.land/std@v0.42.0/path/constants", "https://deno.land/std@v0.42.0/path/common", "https://deno.land/std@v0.42.0/path/glob", "https://deno.land/std@v0.42.0/path/globrex"], function (exports_53, context_53) {
    "use strict";
    var _win32, _posix, constants_ts_12, path, win32, posix, basename, delimiter, dirname, extname, format, fromFileUrl, isAbsolute, join, normalize, parse, relative, resolve, sep, toNamespacedPath;
    var __moduleName = context_53 && context_53.id;
    var exportedNames_2 = {
        "win32": true,
        "posix": true,
        "basename": true,
        "delimiter": true,
        "dirname": true,
        "extname": true,
        "format": true,
        "fromFileUrl": true,
        "isAbsolute": true,
        "join": true,
        "normalize": true,
        "parse": true,
        "relative": true,
        "resolve": true,
        "sep": true,
        "toNamespacedPath": true,
        "common": true,
        "EOL": true,
        "SEP": true,
        "SEP_PATTERN": true,
        "isWindows": true
    };
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_2.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_53(exports);
    }
    return {
        setters: [
            function (_win32_2) {
                _win32 = _win32_2;
            },
            function (_posix_2) {
                _posix = _posix_2;
            },
            function (constants_ts_12_1) {
                constants_ts_12 = constants_ts_12_1;
                exports_53({
                    "EOL": constants_ts_12_1["EOL"],
                    "SEP": constants_ts_12_1["SEP"],
                    "SEP_PATTERN": constants_ts_12_1["SEP_PATTERN"],
                    "isWindows": constants_ts_12_1["isWindows"]
                });
            },
            function (common_ts_2_1) {
                exports_53({
                    "common": common_ts_2_1["common"]
                });
            },
            function (glob_ts_2_1) {
                exportStar_3(glob_ts_2_1);
            },
            function (globrex_ts_4_1) {
                exportStar_3(globrex_ts_4_1);
            }
        ],
        execute: function () {
            path = constants_ts_12.isWindows ? _win32 : _posix;
            exports_53("win32", win32 = _win32);
            exports_53("posix", posix = _posix);
            exports_53("basename", basename = path.basename), exports_53("delimiter", delimiter = path.delimiter), exports_53("dirname", dirname = path.dirname), exports_53("extname", extname = path.extname), exports_53("format", format = path.format), exports_53("fromFileUrl", fromFileUrl = path.fromFileUrl), exports_53("isAbsolute", isAbsolute = path.isAbsolute), exports_53("join", join = path.join), exports_53("normalize", normalize = path.normalize), exports_53("parse", parse = path.parse), exports_53("relative", relative = path.relative), exports_53("resolve", resolve = path.resolve), exports_53("sep", sep = path.sep), exports_53("toNamespacedPath", toNamespacedPath = path.toNamespacedPath);
        }
    };
});
System.register("https://deno.land/std@v0.42.0/encoding/utf8", [], function (exports_54, context_54) {
    "use strict";
    var encoder, decoder;
    var __moduleName = context_54 && context_54.id;
    /** Shorthand for new TextEncoder().encode() */
    function encode(input) {
        return encoder.encode(input);
    }
    exports_54("encode", encode);
    /** Shorthand for new TextDecoder().decode() */
    function decode(input) {
        return decoder.decode(input);
    }
    exports_54("decode", decode);
    return {
        setters: [],
        execute: function () {
            /** A default TextEncoder instance */
            exports_54("encoder", encoder = new TextEncoder());
            /** A default TextDecoder instance */
            exports_54("decoder", decoder = new TextDecoder());
        }
    };
});
System.register("https://deno.land/std@v0.42.0/io/util", ["https://deno.land/std@v0.42.0/path/mod", "https://deno.land/std@v0.42.0/encoding/utf8"], function (exports_55, context_55) {
    "use strict";
    var Buffer, mkdir, open, path, utf8_ts_1;
    var __moduleName = context_55 && context_55.id;
    /**
     * Copy bytes from one Uint8Array to another.  Bytes from `src` which don't fit
     * into `dst` will not be copied.
     *
     * @param dst Destination byte array
     * @param src Source byte array
     * @param off Offset into `dst` at which to begin writing values from `src`.
     * @return number of bytes copied
     */
    function copyBytes(dst, src, off = 0) {
        off = Math.max(0, Math.min(off, dst.byteLength));
        const dstBytesAvailable = dst.byteLength - off;
        if (src.byteLength > dstBytesAvailable) {
            src = src.subarray(0, dstBytesAvailable);
        }
        dst.set(src, off);
        return src.byteLength;
    }
    exports_55("copyBytes", copyBytes);
    function charCode(s) {
        return s.charCodeAt(0);
    }
    exports_55("charCode", charCode);
    function stringsReader(s) {
        return new Buffer(utf8_ts_1.encode(s).buffer);
    }
    exports_55("stringsReader", stringsReader);
    /** Create or open a temporal file at specified directory with prefix and
     *  postfix
     * */
    async function tempFile(dir, opts = { prefix: "", postfix: "" }) {
        const r = Math.floor(Math.random() * 1000000);
        const filepath = path.resolve(`${dir}/${opts.prefix || ""}${r}${opts.postfix || ""}`);
        await mkdir(path.dirname(filepath), { recursive: true });
        const file = await open(filepath, {
            create: true,
            read: true,
            write: true,
            append: true,
        });
        return { file, filepath };
    }
    exports_55("tempFile", tempFile);
    return {
        setters: [
            function (path_6) {
                path = path_6;
            },
            function (utf8_ts_1_1) {
                utf8_ts_1 = utf8_ts_1_1;
            }
        ],
        execute: function () {
            // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
            Buffer = Deno.Buffer, mkdir = Deno.mkdir, open = Deno.open;
        }
    };
});
System.register("https://deno.land/x/dejs@0.4.0/vendor/https/deno.land/std/io/util", ["https://deno.land/std@v0.42.0/io/util"], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_56(exports);
    }
    return {
        setters: [
            function (util_ts_2_1) {
                exportStar_4(util_ts_2_1);
            }
        ],
        execute: function () {
        }
    };
});
// Based on https://github.com/golang/go/blob/891682/src/bufio/bufio.go
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
System.register("https://deno.land/std@v0.42.0/io/bufio", ["https://deno.land/std@v0.42.0/io/util", "https://deno.land/std@v0.42.0/testing/asserts"], function (exports_57, context_57) {
    "use strict";
    var util_ts_3, asserts_ts_9, DEFAULT_BUF_SIZE, MIN_BUF_SIZE, MAX_CONSECUTIVE_EMPTY_READS, CR, LF, BufferFullError, PartialReadError, BufReader, AbstractBufBase, BufWriter, BufWriterSync;
    var __moduleName = context_57 && context_57.id;
    /** Generate longest proper prefix which is also suffix array. */
    function createLPS(pat) {
        const lps = new Uint8Array(pat.length);
        lps[0] = 0;
        let prefixEnd = 0;
        let i = 1;
        while (i < lps.length) {
            if (pat[i] == pat[prefixEnd]) {
                prefixEnd++;
                lps[i] = prefixEnd;
                i++;
            }
            else if (prefixEnd === 0) {
                lps[i] = 0;
                i++;
            }
            else {
                prefixEnd = pat[prefixEnd - 1];
            }
        }
        return lps;
    }
    /** Read delimited bytes from a Reader. */
    async function* readDelim(reader, delim) {
        // Avoid unicode problems
        const delimLen = delim.length;
        const delimLPS = createLPS(delim);
        let inputBuffer = new Deno.Buffer();
        const inspectArr = new Uint8Array(Math.max(1024, delimLen + 1));
        // Modified KMP
        let inspectIndex = 0;
        let matchIndex = 0;
        while (true) {
            const result = await reader.read(inspectArr);
            if (result === null) {
                // Yield last chunk.
                yield inputBuffer.bytes();
                return;
            }
            if (result < 0) {
                // Discard all remaining and silently fail.
                return;
            }
            const sliceRead = inspectArr.subarray(0, result);
            await Deno.writeAll(inputBuffer, sliceRead);
            let sliceToProcess = inputBuffer.bytes();
            while (inspectIndex < sliceToProcess.length) {
                if (sliceToProcess[inspectIndex] === delim[matchIndex]) {
                    inspectIndex++;
                    matchIndex++;
                    if (matchIndex === delimLen) {
                        // Full match
                        const matchEnd = inspectIndex - delimLen;
                        const readyBytes = sliceToProcess.subarray(0, matchEnd);
                        // Copy
                        const pendingBytes = sliceToProcess.slice(inspectIndex);
                        yield readyBytes;
                        // Reset match, different from KMP.
                        sliceToProcess = pendingBytes;
                        inspectIndex = 0;
                        matchIndex = 0;
                    }
                }
                else {
                    if (matchIndex === 0) {
                        inspectIndex++;
                    }
                    else {
                        matchIndex = delimLPS[matchIndex - 1];
                    }
                }
            }
            // Keep inspectIndex and matchIndex.
            inputBuffer = new Deno.Buffer(sliceToProcess);
        }
    }
    exports_57("readDelim", readDelim);
    /** Read delimited strings from a Reader. */
    async function* readStringDelim(reader, delim) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        for await (const chunk of readDelim(reader, encoder.encode(delim))) {
            yield decoder.decode(chunk);
        }
    }
    exports_57("readStringDelim", readStringDelim);
    /** Read strings line-by-line from a Reader. */
    // eslint-disable-next-line require-await
    async function* readLines(reader) {
        yield* readStringDelim(reader, "\n");
    }
    exports_57("readLines", readLines);
    return {
        setters: [
            function (util_ts_3_1) {
                util_ts_3 = util_ts_3_1;
            },
            function (asserts_ts_9_1) {
                asserts_ts_9 = asserts_ts_9_1;
            }
        ],
        execute: function () {
            DEFAULT_BUF_SIZE = 4096;
            MIN_BUF_SIZE = 16;
            MAX_CONSECUTIVE_EMPTY_READS = 100;
            CR = util_ts_3.charCode("\r");
            LF = util_ts_3.charCode("\n");
            BufferFullError = class BufferFullError extends Error {
                constructor(partial) {
                    super("Buffer full");
                    this.partial = partial;
                    this.name = "BufferFullError";
                }
            };
            exports_57("BufferFullError", BufferFullError);
            PartialReadError = class PartialReadError extends Deno.errors.UnexpectedEof {
                constructor() {
                    super("Encountered UnexpectedEof, data only partially read");
                    this.name = "PartialReadError";
                }
            };
            exports_57("PartialReadError", PartialReadError);
            /** BufReader implements buffering for a Reader object. */
            BufReader = class BufReader {
                constructor(rd, size = DEFAULT_BUF_SIZE) {
                    this.r = 0; // buf read position.
                    this.w = 0; // buf write position.
                    this.eof = false;
                    if (size < MIN_BUF_SIZE) {
                        size = MIN_BUF_SIZE;
                    }
                    this._reset(new Uint8Array(size), rd);
                }
                // private lastByte: number;
                // private lastCharSize: number;
                /** return new BufReader unless r is BufReader */
                static create(r, size = DEFAULT_BUF_SIZE) {
                    return r instanceof BufReader ? r : new BufReader(r, size);
                }
                /** Returns the size of the underlying buffer in bytes. */
                size() {
                    return this.buf.byteLength;
                }
                buffered() {
                    return this.w - this.r;
                }
                // Reads a new chunk into the buffer.
                async _fill() {
                    // Slide existing data to beginning.
                    if (this.r > 0) {
                        this.buf.copyWithin(0, this.r, this.w);
                        this.w -= this.r;
                        this.r = 0;
                    }
                    if (this.w >= this.buf.byteLength) {
                        throw Error("bufio: tried to fill full buffer");
                    }
                    // Read new data: try a limited number of times.
                    for (let i = MAX_CONSECUTIVE_EMPTY_READS; i > 0; i--) {
                        const rr = await this.rd.read(this.buf.subarray(this.w));
                        if (rr === null) {
                            this.eof = true;
                            return;
                        }
                        asserts_ts_9.assert(rr >= 0, "negative read");
                        this.w += rr;
                        if (rr > 0) {
                            return;
                        }
                    }
                    throw new Error(`No progress after ${MAX_CONSECUTIVE_EMPTY_READS} read() calls`);
                }
                /** Discards any buffered data, resets all state, and switches
                 * the buffered reader to read from r.
                 */
                reset(r) {
                    this._reset(this.buf, r);
                }
                _reset(buf, rd) {
                    this.buf = buf;
                    this.rd = rd;
                    this.eof = false;
                    // this.lastByte = -1;
                    // this.lastCharSize = -1;
                }
                /** reads data into p.
                 * It returns the number of bytes read into p.
                 * The bytes are taken from at most one Read on the underlying Reader,
                 * hence n may be less than len(p).
                 * To read exactly len(p) bytes, use io.ReadFull(b, p).
                 */
                async read(p) {
                    let rr = p.byteLength;
                    if (p.byteLength === 0)
                        return rr;
                    if (this.r === this.w) {
                        if (p.byteLength >= this.buf.byteLength) {
                            // Large read, empty buffer.
                            // Read directly into p to avoid copy.
                            const rr = await this.rd.read(p);
                            const nread = rr ?? 0;
                            asserts_ts_9.assert(nread >= 0, "negative read");
                            // if (rr.nread > 0) {
                            //   this.lastByte = p[rr.nread - 1];
                            //   this.lastCharSize = -1;
                            // }
                            return rr;
                        }
                        // One read.
                        // Do not use this.fill, which will loop.
                        this.r = 0;
                        this.w = 0;
                        rr = await this.rd.read(this.buf);
                        if (rr === 0 || rr === null)
                            return rr;
                        asserts_ts_9.assert(rr >= 0, "negative read");
                        this.w += rr;
                    }
                    // copy as much as we can
                    const copied = util_ts_3.copyBytes(p, this.buf.subarray(this.r, this.w), 0);
                    this.r += copied;
                    // this.lastByte = this.buf[this.r - 1];
                    // this.lastCharSize = -1;
                    return copied;
                }
                /** reads exactly `p.length` bytes into `p`.
                 *
                 * If successful, `p` is returned.
                 *
                 * If the end of the underlying stream has been reached, and there are no more
                 * bytes available in the buffer, `readFull()` returns `null` instead.
                 *
                 * An error is thrown if some bytes could be read, but not enough to fill `p`
                 * entirely before the underlying stream reported an error or EOF. Any error
                 * thrown will have a `partial` property that indicates the slice of the
                 * buffer that has been successfully filled with data.
                 *
                 * Ported from https://golang.org/pkg/io/#ReadFull
                 */
                async readFull(p) {
                    let bytesRead = 0;
                    while (bytesRead < p.length) {
                        try {
                            const rr = await this.read(p.subarray(bytesRead));
                            if (rr === null) {
                                if (bytesRead === 0) {
                                    return null;
                                }
                                else {
                                    throw new PartialReadError();
                                }
                            }
                            bytesRead += rr;
                        }
                        catch (err) {
                            err.partial = p.subarray(0, bytesRead);
                            throw err;
                        }
                    }
                    return p;
                }
                /** Returns the next byte [0, 255] or `null`. */
                async readByte() {
                    while (this.r === this.w) {
                        if (this.eof)
                            return null;
                        await this._fill(); // buffer is empty.
                    }
                    const c = this.buf[this.r];
                    this.r++;
                    // this.lastByte = c;
                    return c;
                }
                /** readString() reads until the first occurrence of delim in the input,
                 * returning a string containing the data up to and including the delimiter.
                 * If ReadString encounters an error before finding a delimiter,
                 * it returns the data read before the error and the error itself
                 * (often `null`).
                 * ReadString returns err != nil if and only if the returned data does not end
                 * in delim.
                 * For simple uses, a Scanner may be more convenient.
                 */
                async readString(delim) {
                    if (delim.length !== 1) {
                        throw new Error("Delimiter should be a single character");
                    }
                    const buffer = await this.readSlice(delim.charCodeAt(0));
                    if (buffer === null)
                        return null;
                    return new TextDecoder().decode(buffer);
                }
                /** `readLine()` is a low-level line-reading primitive. Most callers should
                 * use `readString('\n')` instead or use a Scanner.
                 *
                 * `readLine()` tries to return a single line, not including the end-of-line
                 * bytes. If the line was too long for the buffer then `more` is set and the
                 * beginning of the line is returned. The rest of the line will be returned
                 * from future calls. `more` will be false when returning the last fragment
                 * of the line. The returned buffer is only valid until the next call to
                 * `readLine()`.
                 *
                 * The text returned from ReadLine does not include the line end ("\r\n" or
                 * "\n").
                 *
                 * When the end of the underlying stream is reached, the final bytes in the
                 * stream are returned. No indication or error is given if the input ends
                 * without a final line end. When there are no more trailing bytes to read,
                 * `readLine()` returns `null`.
                 *
                 * Calling `unreadByte()` after `readLine()` will always unread the last byte
                 * read (possibly a character belonging to the line end) even if that byte is
                 * not part of the line returned by `readLine()`.
                 */
                async readLine() {
                    let line;
                    try {
                        line = await this.readSlice(LF);
                    }
                    catch (err) {
                        let { partial } = err;
                        asserts_ts_9.assert(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
                        // Don't throw if `readSlice()` failed with `BufferFullError`, instead we
                        // just return whatever is available and set the `more` flag.
                        if (!(err instanceof BufferFullError)) {
                            throw err;
                        }
                        // Handle the case where "\r\n" straddles the buffer.
                        if (!this.eof &&
                            partial.byteLength > 0 &&
                            partial[partial.byteLength - 1] === CR) {
                            // Put the '\r' back on buf and drop it from line.
                            // Let the next call to ReadLine check for "\r\n".
                            asserts_ts_9.assert(this.r > 0, "bufio: tried to rewind past start of buffer");
                            this.r--;
                            partial = partial.subarray(0, partial.byteLength - 1);
                        }
                        return { line: partial, more: !this.eof };
                    }
                    if (line === null) {
                        return null;
                    }
                    if (line.byteLength === 0) {
                        return { line, more: false };
                    }
                    if (line[line.byteLength - 1] == LF) {
                        let drop = 1;
                        if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                            drop = 2;
                        }
                        line = line.subarray(0, line.byteLength - drop);
                    }
                    return { line, more: false };
                }
                /** `readSlice()` reads until the first occurrence of `delim` in the input,
                 * returning a slice pointing at the bytes in the buffer. The bytes stop
                 * being valid at the next read.
                 *
                 * If `readSlice()` encounters an error before finding a delimiter, or the
                 * buffer fills without finding a delimiter, it throws an error with a
                 * `partial` property that contains the entire buffer.
                 *
                 * If `readSlice()` encounters the end of the underlying stream and there are
                 * any bytes left in the buffer, the rest of the buffer is returned. In other
                 * words, EOF is always treated as a delimiter. Once the buffer is empty,
                 * it returns `null`.
                 *
                 * Because the data returned from `readSlice()` will be overwritten by the
                 * next I/O operation, most clients should use `readString()` instead.
                 */
                async readSlice(delim) {
                    let s = 0; // search start index
                    let slice;
                    while (true) {
                        // Search buffer.
                        let i = this.buf.subarray(this.r + s, this.w).indexOf(delim);
                        if (i >= 0) {
                            i += s;
                            slice = this.buf.subarray(this.r, this.r + i + 1);
                            this.r += i + 1;
                            break;
                        }
                        // EOF?
                        if (this.eof) {
                            if (this.r === this.w) {
                                return null;
                            }
                            slice = this.buf.subarray(this.r, this.w);
                            this.r = this.w;
                            break;
                        }
                        // Buffer full?
                        if (this.buffered() >= this.buf.byteLength) {
                            this.r = this.w;
                            throw new BufferFullError(this.buf);
                        }
                        s = this.w - this.r; // do not rescan area we scanned before
                        // Buffer is not full.
                        try {
                            await this._fill();
                        }
                        catch (err) {
                            err.partial = slice;
                            throw err;
                        }
                    }
                    // Handle last byte, if any.
                    // const i = slice.byteLength - 1;
                    // if (i >= 0) {
                    //   this.lastByte = slice[i];
                    //   this.lastCharSize = -1
                    // }
                    return slice;
                }
                /** `peek()` returns the next `n` bytes without advancing the reader. The
                 * bytes stop being valid at the next read call.
                 *
                 * When the end of the underlying stream is reached, but there are unread
                 * bytes left in the buffer, those bytes are returned. If there are no bytes
                 * left in the buffer, it returns `null`.
                 *
                 * If an error is encountered before `n` bytes are available, `peek()` throws
                 * an error with the `partial` property set to a slice of the buffer that
                 * contains the bytes that were available before the error occurred.
                 */
                async peek(n) {
                    if (n < 0) {
                        throw Error("negative count");
                    }
                    let avail = this.w - this.r;
                    while (avail < n && avail < this.buf.byteLength && !this.eof) {
                        try {
                            await this._fill();
                        }
                        catch (err) {
                            err.partial = this.buf.subarray(this.r, this.w);
                            throw err;
                        }
                        avail = this.w - this.r;
                    }
                    if (avail === 0 && this.eof) {
                        return null;
                    }
                    else if (avail < n && this.eof) {
                        return this.buf.subarray(this.r, this.r + avail);
                    }
                    else if (avail < n) {
                        throw new BufferFullError(this.buf.subarray(this.r, this.w));
                    }
                    return this.buf.subarray(this.r, this.r + n);
                }
            };
            exports_57("BufReader", BufReader);
            AbstractBufBase = class AbstractBufBase {
                constructor() {
                    this.usedBufferBytes = 0;
                    this.err = null;
                }
                /** Size returns the size of the underlying buffer in bytes. */
                size() {
                    return this.buf.byteLength;
                }
                /** Returns how many bytes are unused in the buffer. */
                available() {
                    return this.buf.byteLength - this.usedBufferBytes;
                }
                /** buffered returns the number of bytes that have been written into the
                 * current buffer.
                 */
                buffered() {
                    return this.usedBufferBytes;
                }
                checkBytesWritten(numBytesWritten) {
                    if (numBytesWritten < this.usedBufferBytes) {
                        if (numBytesWritten > 0) {
                            this.buf.copyWithin(0, numBytesWritten, this.usedBufferBytes);
                            this.usedBufferBytes -= numBytesWritten;
                        }
                        this.err = new Error("Short write");
                        throw this.err;
                    }
                }
            };
            /** BufWriter implements buffering for an deno.Writer object.
             * If an error occurs writing to a Writer, no more data will be
             * accepted and all subsequent writes, and flush(), will return the error.
             * After all data has been written, the client should call the
             * flush() method to guarantee all data has been forwarded to
             * the underlying deno.Writer.
             */
            BufWriter = class BufWriter extends AbstractBufBase {
                constructor(writer, size = DEFAULT_BUF_SIZE) {
                    super();
                    this.writer = writer;
                    if (size <= 0) {
                        size = DEFAULT_BUF_SIZE;
                    }
                    this.buf = new Uint8Array(size);
                }
                /** return new BufWriter unless writer is BufWriter */
                static create(writer, size = DEFAULT_BUF_SIZE) {
                    return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
                }
                /** Discards any unflushed buffered data, clears any error, and
                 * resets buffer to write its output to w.
                 */
                reset(w) {
                    this.err = null;
                    this.usedBufferBytes = 0;
                    this.writer = w;
                }
                /** Flush writes any buffered data to the underlying io.Writer. */
                async flush() {
                    if (this.err !== null)
                        throw this.err;
                    if (this.usedBufferBytes === 0)
                        return;
                    let numBytesWritten = 0;
                    try {
                        numBytesWritten = await this.writer.write(this.buf.subarray(0, this.usedBufferBytes));
                    }
                    catch (e) {
                        this.err = e;
                        throw e;
                    }
                    this.checkBytesWritten(numBytesWritten);
                    this.usedBufferBytes = 0;
                }
                /** Writes the contents of `data` into the buffer.  If the contents won't fully
                 * fit into the buffer, those bytes that can are copied into the buffer, the
                 * buffer is the flushed to the writer and the remaining bytes are copied into
                 * the now empty buffer.
                 *
                 * @return the number of bytes written to the buffer.
                 */
                async write(data) {
                    if (this.err !== null)
                        throw this.err;
                    if (data.length === 0)
                        return 0;
                    let totalBytesWritten = 0;
                    let numBytesWritten = 0;
                    while (data.byteLength > this.available()) {
                        if (this.buffered() === 0) {
                            // Large write, empty buffer.
                            // Write directly from data to avoid copy.
                            try {
                                numBytesWritten = await this.writer.write(data);
                            }
                            catch (e) {
                                this.err = e;
                                throw e;
                            }
                        }
                        else {
                            numBytesWritten = util_ts_3.copyBytes(this.buf, data, this.usedBufferBytes);
                            this.usedBufferBytes += numBytesWritten;
                            await this.flush();
                        }
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                    }
                    numBytesWritten = util_ts_3.copyBytes(this.buf, data, this.usedBufferBytes);
                    this.usedBufferBytes += numBytesWritten;
                    totalBytesWritten += numBytesWritten;
                    return totalBytesWritten;
                }
            };
            exports_57("BufWriter", BufWriter);
            /** BufWriterSync implements buffering for a deno.WriterSync object.
             * If an error occurs writing to a WriterSync, no more data will be
             * accepted and all subsequent writes, and flush(), will return the error.
             * After all data has been written, the client should call the
             * flush() method to guarantee all data has been forwarded to
             * the underlying deno.WriterSync.
             */
            BufWriterSync = class BufWriterSync extends AbstractBufBase {
                constructor(writer, size = DEFAULT_BUF_SIZE) {
                    super();
                    this.writer = writer;
                    if (size <= 0) {
                        size = DEFAULT_BUF_SIZE;
                    }
                    this.buf = new Uint8Array(size);
                }
                /** return new BufWriterSync unless writer is BufWriterSync */
                static create(writer, size = DEFAULT_BUF_SIZE) {
                    return writer instanceof BufWriterSync
                        ? writer
                        : new BufWriterSync(writer, size);
                }
                /** Discards any unflushed buffered data, clears any error, and
                 * resets buffer to write its output to w.
                 */
                reset(w) {
                    this.err = null;
                    this.usedBufferBytes = 0;
                    this.writer = w;
                }
                /** Flush writes any buffered data to the underlying io.WriterSync. */
                flush() {
                    if (this.err !== null)
                        throw this.err;
                    if (this.usedBufferBytes === 0)
                        return;
                    let numBytesWritten = 0;
                    try {
                        numBytesWritten = this.writer.writeSync(this.buf.subarray(0, this.usedBufferBytes));
                    }
                    catch (e) {
                        this.err = e;
                        throw e;
                    }
                    this.checkBytesWritten(numBytesWritten);
                    this.usedBufferBytes = 0;
                }
                /** Writes the contents of `data` into the buffer.  If the contents won't fully
                 * fit into the buffer, those bytes that can are copied into the buffer, the
                 * buffer is the flushed to the writer and the remaining bytes are copied into
                 * the now empty buffer.
                 *
                 * @return the number of bytes written to the buffer.
                 */
                writeSync(data) {
                    if (this.err !== null)
                        throw this.err;
                    if (data.length === 0)
                        return 0;
                    let totalBytesWritten = 0;
                    let numBytesWritten = 0;
                    while (data.byteLength > this.available()) {
                        if (this.buffered() === 0) {
                            // Large write, empty buffer.
                            // Write directly from data to avoid copy.
                            try {
                                numBytesWritten = this.writer.writeSync(data);
                            }
                            catch (e) {
                                this.err = e;
                                throw e;
                            }
                        }
                        else {
                            numBytesWritten = util_ts_3.copyBytes(this.buf, data, this.usedBufferBytes);
                            this.usedBufferBytes += numBytesWritten;
                            this.flush();
                        }
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                    }
                    numBytesWritten = util_ts_3.copyBytes(this.buf, data, this.usedBufferBytes);
                    this.usedBufferBytes += numBytesWritten;
                    totalBytesWritten += numBytesWritten;
                    return totalBytesWritten;
                }
            };
            exports_57("BufWriterSync", BufWriterSync);
        }
    };
});
System.register("https://deno.land/x/dejs@0.4.0/vendor/https/deno.land/std/io/bufio", ["https://deno.land/std@v0.42.0/io/bufio"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    function exportStar_5(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_58(exports);
    }
    return {
        setters: [
            function (bufio_ts_1_1) {
                exportStar_5(bufio_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_basePropertyOf", [], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyOf(object) {
        return function (key) {
            return object == null ? undefined : object[key];
        };
    }
    return {
        setters: [],
        execute: function () {
            exports_59("default", basePropertyOf);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_escapeHtmlChar", ["https://deno.land/x/lodash@4.17.15-es/_basePropertyOf"], function (exports_60, context_60) {
    "use strict";
    var _basePropertyOf_js_1, htmlEscapes, escapeHtmlChar;
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [
            function (_basePropertyOf_js_1_1) {
                _basePropertyOf_js_1 = _basePropertyOf_js_1_1;
            }
        ],
        execute: function () {
            /** Used to map characters to HTML entities. */
            htmlEscapes = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            /**
             * Used by `_.escape` to convert characters to HTML entities.
             *
             * @private
             * @param {string} chr The matched character to escape.
             * @returns {string} Returns the escaped character.
             */
            escapeHtmlChar = _basePropertyOf_js_1.default(htmlEscapes);
            exports_60("default", escapeHtmlChar);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_freeGlobal", [], function (exports_61, context_61) {
    "use strict";
    var freeGlobal;
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [],
        execute: function () {
            /** Detect free variable `global` from Node.js. */
            freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
            exports_61("default", freeGlobal);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_root", ["https://deno.land/x/lodash@4.17.15-es/_freeGlobal"], function (exports_62, context_62) {
    "use strict";
    var _freeGlobal_js_1, freeSelf, root;
    var __moduleName = context_62 && context_62.id;
    return {
        setters: [
            function (_freeGlobal_js_1_1) {
                _freeGlobal_js_1 = _freeGlobal_js_1_1;
            }
        ],
        execute: function () {
            /** Detect free variable `self`. */
            freeSelf = typeof self == 'object' && self && self.Object === Object && self;
            /** Used as a reference to the global object. */
            root = _freeGlobal_js_1.default || freeSelf || Function('return this')();
            exports_62("default", root);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_Symbol", ["https://deno.land/x/lodash@4.17.15-es/_root"], function (exports_63, context_63) {
    "use strict";
    var _root_js_1, Symbol;
    var __moduleName = context_63 && context_63.id;
    return {
        setters: [
            function (_root_js_1_1) {
                _root_js_1 = _root_js_1_1;
            }
        ],
        execute: function () {
            /** Built-in value references. */
            Symbol = _root_js_1.default.Symbol;
            exports_63("default", Symbol);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_arrayMap", [], function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
            result[index] = iteratee(array[index], index, array);
        }
        return result;
    }
    return {
        setters: [],
        execute: function () {
            exports_64("default", arrayMap);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/isArray", [], function (exports_65, context_65) {
    "use strict";
    var isArray;
    var __moduleName = context_65 && context_65.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Checks if `value` is classified as an `Array` object.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an array, else `false`.
             * @example
             *
             * _.isArray([1, 2, 3]);
             * // => true
             *
             * _.isArray(document.body.children);
             * // => false
             *
             * _.isArray('abc');
             * // => false
             *
             * _.isArray(_.noop);
             * // => false
             */
            isArray = Array.isArray;
            exports_65("default", isArray);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_getRawTag", ["https://deno.land/x/lodash@4.17.15-es/_Symbol"], function (exports_66, context_66) {
    "use strict";
    var _Symbol_js_1, objectProto, hasOwnProperty, nativeObjectToString, symToStringTag;
    var __moduleName = context_66 && context_66.id;
    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
            value[symToStringTag] = undefined;
            var unmasked = true;
        }
        catch (e) { }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag;
            }
            else {
                delete value[symToStringTag];
            }
        }
        return result;
    }
    return {
        setters: [
            function (_Symbol_js_1_1) {
                _Symbol_js_1 = _Symbol_js_1_1;
            }
        ],
        execute: function () {
            /** Used for built-in method references. */
            objectProto = Object.prototype;
            /** Used to check objects for own properties. */
            hasOwnProperty = objectProto.hasOwnProperty;
            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            nativeObjectToString = objectProto.toString;
            /** Built-in value references. */
            symToStringTag = _Symbol_js_1.default ? _Symbol_js_1.default.toStringTag : undefined;
            exports_66("default", getRawTag);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_objectToString", [], function (exports_67, context_67) {
    "use strict";
    var objectProto, nativeObjectToString;
    var __moduleName = context_67 && context_67.id;
    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
        return nativeObjectToString.call(value);
    }
    return {
        setters: [],
        execute: function () {
            /** Used for built-in method references. */
            objectProto = Object.prototype;
            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            nativeObjectToString = objectProto.toString;
            exports_67("default", objectToString);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_baseGetTag", ["https://deno.land/x/lodash@4.17.15-es/_Symbol", "https://deno.land/x/lodash@4.17.15-es/_getRawTag", "https://deno.land/x/lodash@4.17.15-es/_objectToString"], function (exports_68, context_68) {
    "use strict";
    var _Symbol_js_2, _getRawTag_js_1, _objectToString_js_1, nullTag, undefinedTag, symToStringTag;
    var __moduleName = context_68 && context_68.id;
    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
        if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
        }
        return (symToStringTag && symToStringTag in Object(value))
            ? _getRawTag_js_1.default(value)
            : _objectToString_js_1.default(value);
    }
    return {
        setters: [
            function (_Symbol_js_2_1) {
                _Symbol_js_2 = _Symbol_js_2_1;
            },
            function (_getRawTag_js_1_1) {
                _getRawTag_js_1 = _getRawTag_js_1_1;
            },
            function (_objectToString_js_1_1) {
                _objectToString_js_1 = _objectToString_js_1_1;
            }
        ],
        execute: function () {
            /** `Object#toString` result references. */
            nullTag = '[object Null]', undefinedTag = '[object Undefined]';
            /** Built-in value references. */
            symToStringTag = _Symbol_js_2.default ? _Symbol_js_2.default.toStringTag : undefined;
            exports_68("default", baseGetTag);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/isObjectLike", [], function (exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
        return value != null && typeof value == 'object';
    }
    return {
        setters: [],
        execute: function () {
            exports_69("default", isObjectLike);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/isSymbol", ["https://deno.land/x/lodash@4.17.15-es/_baseGetTag", "https://deno.land/x/lodash@4.17.15-es/isObjectLike"], function (exports_70, context_70) {
    "use strict";
    var _baseGetTag_js_1, isObjectLike_js_1, symbolTag;
    var __moduleName = context_70 && context_70.id;
    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
        return typeof value == 'symbol' ||
            (isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == symbolTag);
    }
    return {
        setters: [
            function (_baseGetTag_js_1_1) {
                _baseGetTag_js_1 = _baseGetTag_js_1_1;
            },
            function (isObjectLike_js_1_1) {
                isObjectLike_js_1 = isObjectLike_js_1_1;
            }
        ],
        execute: function () {
            /** `Object#toString` result references. */
            symbolTag = '[object Symbol]';
            exports_70("default", isSymbol);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/_baseToString", ["https://deno.land/x/lodash@4.17.15-es/_Symbol", "https://deno.land/x/lodash@4.17.15-es/_arrayMap", "https://deno.land/x/lodash@4.17.15-es/isArray", "https://deno.land/x/lodash@4.17.15-es/isSymbol"], function (exports_71, context_71) {
    "use strict";
    var _Symbol_js_3, _arrayMap_js_1, isArray_js_1, isSymbol_js_1, INFINITY, symbolProto, symbolToString;
    var __moduleName = context_71 && context_71.id;
    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
        // Exit early for strings to avoid a performance hit in some environments.
        if (typeof value == 'string') {
            return value;
        }
        if (isArray_js_1.default(value)) {
            // Recursively convert values (susceptible to call stack limits).
            return _arrayMap_js_1.default(value, baseToString) + '';
        }
        if (isSymbol_js_1.default(value)) {
            return symbolToString ? symbolToString.call(value) : '';
        }
        var result = (value + '');
        return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }
    return {
        setters: [
            function (_Symbol_js_3_1) {
                _Symbol_js_3 = _Symbol_js_3_1;
            },
            function (_arrayMap_js_1_1) {
                _arrayMap_js_1 = _arrayMap_js_1_1;
            },
            function (isArray_js_1_1) {
                isArray_js_1 = isArray_js_1_1;
            },
            function (isSymbol_js_1_1) {
                isSymbol_js_1 = isSymbol_js_1_1;
            }
        ],
        execute: function () {
            /** Used as references for various `Number` constants. */
            INFINITY = 1 / 0;
            /** Used to convert symbols to primitives and strings. */
            symbolProto = _Symbol_js_3.default ? _Symbol_js_3.default.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
            exports_71("default", baseToString);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/toString", ["https://deno.land/x/lodash@4.17.15-es/_baseToString"], function (exports_72, context_72) {
    "use strict";
    var _baseToString_js_1;
    var __moduleName = context_72 && context_72.id;
    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
        return value == null ? '' : _baseToString_js_1.default(value);
    }
    return {
        setters: [
            function (_baseToString_js_1_1) {
                _baseToString_js_1 = _baseToString_js_1_1;
            }
        ],
        execute: function () {
            exports_72("default", toString);
        }
    };
});
System.register("https://deno.land/x/lodash@4.17.15-es/escape", ["https://deno.land/x/lodash@4.17.15-es/_escapeHtmlChar", "https://deno.land/x/lodash@4.17.15-es/toString"], function (exports_73, context_73) {
    "use strict";
    var _escapeHtmlChar_js_1, toString_js_1, reUnescapedHtml, reHasUnescapedHtml;
    var __moduleName = context_73 && context_73.id;
    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
        string = toString_js_1.default(string);
        return (string && reHasUnescapedHtml.test(string))
            ? string.replace(reUnescapedHtml, _escapeHtmlChar_js_1.default)
            : string;
    }
    return {
        setters: [
            function (_escapeHtmlChar_js_1_1) {
                _escapeHtmlChar_js_1 = _escapeHtmlChar_js_1_1;
            },
            function (toString_js_1_1) {
                toString_js_1 = toString_js_1_1;
            }
        ],
        execute: function () {
            /** Used to match HTML entities and HTML characters. */
            reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
            exports_73("default", escape);
        }
    };
});
System.register("https://deno.land/x/dejs@0.4.0/vendor/https/deno.land/x/lodash/escape", ["https://deno.land/x/lodash@4.17.15-es/escape"], function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    return {
        setters: [
            function (escape_js_1_1) {
                exports_74({
                    "default": escape_js_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/dejs@0.4.0/mod", ["https://deno.land/x/dejs@0.4.0/vendor/https/deno.land/std/io/util", "https://deno.land/x/dejs@0.4.0/vendor/https/deno.land/std/io/bufio", "https://deno.land/x/dejs@0.4.0/vendor/https/deno.land/x/lodash/escape"], function (exports_75, context_75) {
    "use strict";
    var open, util_ts_4, bufio_ts_2, escape_js_2, ReadMode, Codes, decoder;
    var __moduleName = context_75 && context_75.id;
    async function include(path, params) {
        const result = await renderFile(path, params);
        const buf = new Deno.Buffer();
        await buf.readFrom(result);
        return await bufToStr(buf);
    }
    async function bufToStr(buf) {
        return decoder.decode(await Deno.readAll(buf));
    }
    function NewTemplate(script) {
        return async (params) => {
            const output = [];
            await new Promise((resolve) => {
                const $$CONSTANTS = {
                    ...params,
                    include,
                    $$OUTPUT: output,
                    $$FINISHED: resolve,
                    $$ESCAPE: escape_js_2.default,
                };
                const header = Object.keys($$CONSTANTS)
                    .map((k) => `const ${k} = $$CONSTANTS.${k};`)
                    .join("\n");
                const src = `(async() => {
        ${header}
        ${script}
        $$FINISHED();
      })();`;
                eval(src);
            });
            return util_ts_4.stringsReader(output.join(""));
        };
    }
    async function compile(reader) {
        const src = new bufio_ts_2.BufReader(reader);
        const buf = [];
        const statements = [];
        const statementBuf = new Deno.Buffer();
        let readMode = ReadMode.Normal;
        const statementBufWrite = async (byte) => await statementBuf.write(new Uint8Array([byte]));
        while (true) {
            const byte = await src.readByte();
            if (byte === null) {
                break;
            }
            buf.push(byte);
            if (buf.length < 3) {
                continue;
            }
            if (readMode === ReadMode.Normal) {
                // Detect ReadMode
                if (buf[0] === Codes.Begin && buf[1] === Codes.Percent) {
                    switch (buf[2]) {
                        case Codes.Escaped:
                            readMode = ReadMode.Escaped;
                            break;
                        case Codes.Raw:
                            readMode = ReadMode.Raw;
                            break;
                        case Codes.Comment:
                            readMode = ReadMode.Comment;
                            break;
                        default:
                            readMode = ReadMode.Evaluate;
                            break;
                    }
                    statements.push(`$$OUTPUT.push(\`${await bufToStr(statementBuf)}\`);`);
                    statementBuf.reset();
                    buf.splice(0);
                    continue;
                }
                if (buf.length > 2) {
                    await statementBufWrite(buf.shift());
                }
                continue;
            }
            // Finish current ReadMode
            if (buf[1] === Codes.Percent && buf[2] === Codes.End) {
                statementBufWrite(buf.shift());
                buf.splice(0);
                // Don't execute if ReadMode is Comment.
                if (readMode !== ReadMode.Comment) {
                    switch (readMode) {
                        case ReadMode.Raw:
                            statements.push(`$$OUTPUT.push(${await bufToStr(statementBuf)});`);
                            break;
                        case ReadMode.Escaped:
                            statements.push(`$$OUTPUT.push($$ESCAPE(${await bufToStr(statementBuf)}));`);
                            break;
                        case ReadMode.Evaluate:
                            statements.push(await bufToStr(statementBuf));
                            break;
                    }
                }
                statementBuf.reset();
                readMode = ReadMode.Normal;
                continue;
            }
            await statementBufWrite(buf.shift());
        }
        // Flush buffer
        while (buf.length > 0) {
            await statementBufWrite(buf.shift());
        }
        statements.push(`$$OUTPUT.push(\`${await bufToStr(statementBuf)}\`);`);
        statementBuf.reset();
        return await NewTemplate(statements.join(""));
    }
    exports_75("compile", compile);
    async function render(body, params) {
        const reader = util_ts_4.stringsReader(body);
        const template = await compile(reader);
        return template(params);
    }
    exports_75("render", render);
    async function renderFile(path, params) {
        const file = await open(path);
        const template = await compile(file);
        file.close();
        return template(params);
    }
    exports_75("renderFile", renderFile);
    return {
        setters: [
            function (util_ts_4_1) {
                util_ts_4 = util_ts_4_1;
            },
            function (bufio_ts_2_1) {
                bufio_ts_2 = bufio_ts_2_1;
            },
            function (escape_js_2_1) {
                escape_js_2 = escape_js_2_1;
            }
        ],
        execute: function () {
            open = Deno.open;
            (function (ReadMode) {
                ReadMode[ReadMode["Normal"] = 0] = "Normal";
                ReadMode[ReadMode["Escaped"] = 1] = "Escaped";
                ReadMode[ReadMode["Raw"] = 2] = "Raw";
                ReadMode[ReadMode["Comment"] = 3] = "Comment";
                ReadMode[ReadMode["Evaluate"] = 4] = "Evaluate";
            })(ReadMode || (ReadMode = {}));
            (function (Codes) {
                Codes[Codes["Begin"] = 60] = "Begin";
                Codes[Codes["End"] = 62] = "End";
                Codes[Codes["Percent"] = 37] = "Percent";
                Codes[Codes["Escaped"] = 61] = "Escaped";
                Codes[Codes["Raw"] = 45] = "Raw";
                Codes[Codes["Comment"] = 35] = "Comment";
            })(Codes || (Codes = {}));
            decoder = new TextDecoder("utf-8");
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Templates/Parser", ["https://deno.land/std/path/mod", "https://deno.land/std/fs/mod", "https://deno.land/std/uuid/mod", "https://deno.land/x/dejs@0.4.0/mod"], function (exports_76, context_76) {
    "use strict";
    var Buffer, copy, readAll, mod_ts_8, mod_ts_9, mod_ts_10, mod_ts_11, mod_ts_12, Parser;
    var __moduleName = context_76 && context_76.id;
    return {
        setters: [
            function (mod_ts_8_1) {
                mod_ts_8 = mod_ts_8_1;
                mod_ts_10 = mod_ts_8_1;
            },
            function (mod_ts_9_1) {
                mod_ts_9 = mod_ts_9_1;
            },
            function (mod_ts_11_1) {
                mod_ts_11 = mod_ts_11_1;
            },
            function (mod_ts_12_1) {
                mod_ts_12 = mod_ts_12_1;
            }
        ],
        execute: function () {
            Buffer = Deno.Buffer, copy = Deno.copy, readAll = Deno.readAll;
            Parser = class Parser {
                constructor(paths, root) {
                    this.paths = [];
                    this.paths = paths;
                    this.root = root;
                    this.decoder = new TextDecoder("utf-8");
                }
                async parse(params = {}) {
                    let newPaths = [];
                    for (let i = 0; i < this.paths.length; i++) {
                        if (await mod_ts_9.exists(this.paths[i])) {
                            const content = await this.renderFile(this.paths[i], params);
                            const getNewPath = await this.getNewPath(this.paths[i]);
                            await this.writeFile(getNewPath, content);
                            newPaths.push(getNewPath);
                        }
                    }
                    return new Promise((resolve) => resolve(newPaths));
                }
                async renderFile(path, params) {
                    let buf = new Buffer();
                    let output = await mod_ts_12.renderFile(path, params);
                    await copy(output, buf);
                    let bytes = await readAll(buf);
                    return this.decoder.decode(bytes);
                }
                async getNewPath(path) {
                    const id = mod_ts_11.v4.generate();
                    const ext = mod_ts_10.posix.extname(path);
                    const name = mod_ts_8.basename(path);
                    return `${this.root}/${name}.${id}${ext}`;
                }
                async writeFile(path, content) {
                    await mod_ts_9.writeFileStr(path, content);
                }
            };
            exports_76("default", Parser);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Repository", [], function (exports_77, context_77) {
    "use strict";
    var Repository;
    var __moduleName = context_77 && context_77.id;
    return {
        setters: [],
        execute: function () {
            Repository = class Repository {
                constructor(config, cmd) {
                    this.config = config;
                    this.cmd = cmd;
                }
                async clone(path) {
                    const { branch = "master", remote } = this.config;
                    return await this.gitClone(remote, branch, path);
                }
                async gitClone(remote, branch, path) {
                    return this.cmd.run([
                        "git",
                        "clone",
                        "--single-branch",
                        `--branch=${branch}`,
                        "--depth=1",
                        remote,
                        path,
                    ]);
                }
            };
            exports_77("default", Repository);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Templates/Templates", ["file:///Users/andrewmclagan/development/drone-gke/src/Templates/Resolver", "file:///Users/andrewmclagan/development/drone-gke/src/Templates/Parser", "file:///Users/andrewmclagan/development/drone-gke/src/Repository"], function (exports_78, context_78) {
    "use strict";
    var makeTempDir, Resolver_ts_1, Parser_ts_1, Repository_ts_1, Templates;
    var __moduleName = context_78 && context_78.id;
    return {
        setters: [
            function (Resolver_ts_1_1) {
                Resolver_ts_1 = Resolver_ts_1_1;
            },
            function (Parser_ts_1_1) {
                Parser_ts_1 = Parser_ts_1_1;
            },
            function (Repository_ts_1_1) {
                Repository_ts_1 = Repository_ts_1_1;
            }
        ],
        execute: function () {
            makeTempDir = Deno.makeTempDir;
            Templates = class Templates {
                constructor(glob = "**/*.{yml,yaml}", cmd, config) {
                    this.glob = glob;
                    this.cmd = cmd;
                    if (config) {
                        this.repository = new Repository_ts_1.default(config, cmd);
                    }
                }
                async parse(params) {
                    const tempDir = await makeTempDir({ prefix: "drone-gke-templates" });
                    let templateRoot = ".";
                    if (this.repository) {
                        await this.repository.clone(tempDir);
                        templateRoot = tempDir;
                    }
                    const resolver = new Resolver_ts_1.default(this.glob, templateRoot);
                    const paths = await resolver.resolve();
                    const parser = new Parser_ts_1.default(paths, tempDir);
                    const parsedPaths = await parser.parse(params);
                    return parsedPaths;
                }
            };
            exports_78("default", Templates);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Cluster", ["https://deno.land/std/fs/mod", "file:///Users/andrewmclagan/development/drone-gke/src/utils"], function (exports_79, context_79) {
    "use strict";
    var makeTempDir, mod_ts_13, utils_ts_12, Cluster;
    var __moduleName = context_79 && context_79.id;
    return {
        setters: [
            function (mod_ts_13_1) {
                mod_ts_13 = mod_ts_13_1;
            },
            function (utils_ts_12_1) {
                utils_ts_12 = utils_ts_12_1;
            }
        ],
        execute: function () {
            makeTempDir = Deno.makeTempDir;
            Cluster = class Cluster {
                constructor(config, cmd) {
                    this.config = config;
                    this.cmd = cmd;
                }
                async authorize() {
                    await this.setAuthentication(this.config.serviceKey);
                    await this.setCluster();
                    if (this.config.namespace) {
                        await this.setNamespace(this.config.namespace);
                    }
                }
                async apply(templates) {
                    for (let i = 0; i < templates.length; i++) {
                        await this.cmd.run(["kubectl", "apply", `-f ${templates[i]}`, "--record"]);
                    }
                }
                async setAuthentication(key) {
                    const keyPath = await this.writeServiceKey(key);
                    return await this.cmd.run([
                        "gcloud",
                        "auth",
                        "activate-service-account",
                        key.client_email,
                        `--key-file=${keyPath}`,
                        `--project=${key.project_id}`,
                    ]);
                }
                async setCluster() {
                    return await this.cmd.run([
                        "gcloud",
                        "container",
                        "clusters",
                        "get-credentials",
                        this.config.name,
                        `--zone=${this.config.zone}`,
                    ]);
                }
                async setNamespace(namespace) {
                    return await this.cmd.run([
                        "kubectl",
                        "config",
                        "set-context",
                        "--current",
                        `--namespace ${namespace}`,
                    ]);
                }
                async writeServiceKey(key) {
                    const tempDir = await makeTempDir({ prefix: "drone-gke-key" });
                    const path = `${tempDir}/service-key.json`;
                    const keyString = utils_ts_12.jsonStringify(key);
                    await mod_ts_13.writeFileStr(path, keyString);
                    return path;
                }
            };
            exports_79("default", Cluster);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/Plugin", ["file:///Users/andrewmclagan/development/drone-gke/src/Templates/Templates", "file:///Users/andrewmclagan/development/drone-gke/src/Cluster"], function (exports_80, context_80) {
    "use strict";
    var env, Templates_ts_1, Cluster_ts_1, Plugin;
    var __moduleName = context_80 && context_80.id;
    return {
        setters: [
            function (Templates_ts_1_1) {
                Templates_ts_1 = Templates_ts_1_1;
            },
            function (Cluster_ts_1_1) {
                Cluster_ts_1 = Cluster_ts_1_1;
            }
        ],
        execute: function () {
            env = Deno.env;
            Plugin = class Plugin {
                constructor(config, cmd) {
                    this.config = config;
                    this.cmd = cmd;
                }
                async run() {
                    const { templates: glob, repository: repoConfig, cluster: clusterConfig } = this.config;
                    const templates = new Templates_ts_1.default(glob, this.cmd, repoConfig);
                    const cluster = new Cluster_ts_1.default(clusterConfig, this.cmd);
                    const params = env.toObject();
                    const templatePaths = await templates.parse(params);
                    await cluster.authorize();
                    await cluster.apply(templatePaths);
                }
            };
            exports_80("default", Plugin);
        }
    };
});
System.register("file:///Users/andrewmclagan/development/drone-gke/src/index", ["file:///Users/andrewmclagan/development/drone-gke/src/utils", "file:///Users/andrewmclagan/development/drone-gke/src/Env", "file:///Users/andrewmclagan/development/drone-gke/src/Cmd", "file:///Users/andrewmclagan/development/drone-gke/src/Plugin"], function (exports_81, context_81) {
    "use strict";
    var utils_ts_13, Env_ts_1, Cmd_ts_1, Plugin_ts_1, templates, repository, cluster, config;
    var __moduleName = context_81 && context_81.id;
    return {
        setters: [
            function (utils_ts_13_1) {
                utils_ts_13 = utils_ts_13_1;
            },
            function (Env_ts_1_1) {
                Env_ts_1 = Env_ts_1_1;
            },
            function (Cmd_ts_1_1) {
                Cmd_ts_1 = Cmd_ts_1_1;
            },
            function (Plugin_ts_1_1) {
                Plugin_ts_1 = Plugin_ts_1_1;
            }
        ],
        execute: function () {
            templates = Env_ts_1.default.get(["GKE_TEMPLATES", "PLUGIN_TEMPLATES"]);
            repository = Env_ts_1.default.getJson(["GKE_REPOSITORY", "PLUGIN_REPOSITORY"]);
            cluster = Env_ts_1.default.getJson(["GKE_CLUSTER", "PLUGIN_CLUSTER"]);
            config = {
                templates,
                repository,
                cluster: {
                    ...cluster,
                    serviceKey: utils_ts_13.jsonParse(utils_ts_13.base64Decode(cluster.service_key)),
                },
            };
            new Plugin_ts_1.default(config, new Cmd_ts_1.default).run();
        }
    };
});

__instantiate("file:///Users/andrewmclagan/development/drone-gke/src/index");
