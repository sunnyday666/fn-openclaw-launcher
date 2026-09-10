// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// ../../node_modules/.pnpm/spark-md5@3.0.2/node_modules/spark-md5/spark-md5.js
var require_spark_md5 = __commonJS((exports, module) => {
  (function(factory) {
    if (typeof exports === "object") {
      module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
      define(factory);
    } else {
      var glob;
      try {
        glob = window;
      } catch (e) {
        glob = self;
      }
      glob.SparkMD5 = factory();
    }
  })(function(undefined2) {
    var add32 = function(a, b) {
      return a + b & 4294967295;
    }, hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function cmn(q, a, b, x2, s, t) {
      a = add32(add32(a, q), add32(x2, t));
      return add32(a << s | a >>> 32 - s, b);
    }
    function md5cycle(x2, k) {
      var a = x2[0], b = x2[1], c3 = x2[2], d = x2[3];
      a += (b & c3 | ~b & d) + k[0] - 680876936 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c3) + k[1] - 389564586 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c3 += (d & a | ~d & b) + k[2] + 606105819 | 0;
      c3 = (c3 << 17 | c3 >>> 15) + d | 0;
      b += (c3 & d | ~c3 & a) + k[3] - 1044525330 | 0;
      b = (b << 22 | b >>> 10) + c3 | 0;
      a += (b & c3 | ~b & d) + k[4] - 176418897 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c3) + k[5] + 1200080426 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c3 += (d & a | ~d & b) + k[6] - 1473231341 | 0;
      c3 = (c3 << 17 | c3 >>> 15) + d | 0;
      b += (c3 & d | ~c3 & a) + k[7] - 45705983 | 0;
      b = (b << 22 | b >>> 10) + c3 | 0;
      a += (b & c3 | ~b & d) + k[8] + 1770035416 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c3) + k[9] - 1958414417 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c3 += (d & a | ~d & b) + k[10] - 42063 | 0;
      c3 = (c3 << 17 | c3 >>> 15) + d | 0;
      b += (c3 & d | ~c3 & a) + k[11] - 1990404162 | 0;
      b = (b << 22 | b >>> 10) + c3 | 0;
      a += (b & c3 | ~b & d) + k[12] + 1804603682 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c3) + k[13] - 40341101 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c3 += (d & a | ~d & b) + k[14] - 1502002290 | 0;
      c3 = (c3 << 17 | c3 >>> 15) + d | 0;
      b += (c3 & d | ~c3 & a) + k[15] + 1236535329 | 0;
      b = (b << 22 | b >>> 10) + c3 | 0;
      a += (b & d | c3 & ~d) + k[1] - 165796510 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c3 | b & ~c3) + k[6] - 1069501632 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c3 += (d & b | a & ~b) + k[11] + 643717713 | 0;
      c3 = (c3 << 14 | c3 >>> 18) + d | 0;
      b += (c3 & a | d & ~a) + k[0] - 373897302 | 0;
      b = (b << 20 | b >>> 12) + c3 | 0;
      a += (b & d | c3 & ~d) + k[5] - 701558691 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c3 | b & ~c3) + k[10] + 38016083 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c3 += (d & b | a & ~b) + k[15] - 660478335 | 0;
      c3 = (c3 << 14 | c3 >>> 18) + d | 0;
      b += (c3 & a | d & ~a) + k[4] - 405537848 | 0;
      b = (b << 20 | b >>> 12) + c3 | 0;
      a += (b & d | c3 & ~d) + k[9] + 568446438 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c3 | b & ~c3) + k[14] - 1019803690 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c3 += (d & b | a & ~b) + k[3] - 187363961 | 0;
      c3 = (c3 << 14 | c3 >>> 18) + d | 0;
      b += (c3 & a | d & ~a) + k[8] + 1163531501 | 0;
      b = (b << 20 | b >>> 12) + c3 | 0;
      a += (b & d | c3 & ~d) + k[13] - 1444681467 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c3 | b & ~c3) + k[2] - 51403784 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c3 += (d & b | a & ~b) + k[7] + 1735328473 | 0;
      c3 = (c3 << 14 | c3 >>> 18) + d | 0;
      b += (c3 & a | d & ~a) + k[12] - 1926607734 | 0;
      b = (b << 20 | b >>> 12) + c3 | 0;
      a += (b ^ c3 ^ d) + k[5] - 378558 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c3) + k[8] - 2022574463 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c3 += (d ^ a ^ b) + k[11] + 1839030562 | 0;
      c3 = (c3 << 16 | c3 >>> 16) + d | 0;
      b += (c3 ^ d ^ a) + k[14] - 35309556 | 0;
      b = (b << 23 | b >>> 9) + c3 | 0;
      a += (b ^ c3 ^ d) + k[1] - 1530992060 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c3) + k[4] + 1272893353 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c3 += (d ^ a ^ b) + k[7] - 155497632 | 0;
      c3 = (c3 << 16 | c3 >>> 16) + d | 0;
      b += (c3 ^ d ^ a) + k[10] - 1094730640 | 0;
      b = (b << 23 | b >>> 9) + c3 | 0;
      a += (b ^ c3 ^ d) + k[13] + 681279174 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c3) + k[0] - 358537222 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c3 += (d ^ a ^ b) + k[3] - 722521979 | 0;
      c3 = (c3 << 16 | c3 >>> 16) + d | 0;
      b += (c3 ^ d ^ a) + k[6] + 76029189 | 0;
      b = (b << 23 | b >>> 9) + c3 | 0;
      a += (b ^ c3 ^ d) + k[9] - 640364487 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c3) + k[12] - 421815835 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c3 += (d ^ a ^ b) + k[15] + 530742520 | 0;
      c3 = (c3 << 16 | c3 >>> 16) + d | 0;
      b += (c3 ^ d ^ a) + k[2] - 995338651 | 0;
      b = (b << 23 | b >>> 9) + c3 | 0;
      a += (c3 ^ (b | ~d)) + k[0] - 198630844 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c3)) + k[7] + 1126891415 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c3 += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
      c3 = (c3 << 15 | c3 >>> 17) + d | 0;
      b += (d ^ (c3 | ~a)) + k[5] - 57434055 | 0;
      b = (b << 21 | b >>> 11) + c3 | 0;
      a += (c3 ^ (b | ~d)) + k[12] + 1700485571 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c3)) + k[3] - 1894986606 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c3 += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
      c3 = (c3 << 15 | c3 >>> 17) + d | 0;
      b += (d ^ (c3 | ~a)) + k[1] - 2054922799 | 0;
      b = (b << 21 | b >>> 11) + c3 | 0;
      a += (c3 ^ (b | ~d)) + k[8] + 1873313359 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c3)) + k[15] - 30611744 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c3 += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
      c3 = (c3 << 15 | c3 >>> 17) + d | 0;
      b += (d ^ (c3 | ~a)) + k[13] + 1309151649 | 0;
      b = (b << 21 | b >>> 11) + c3 | 0;
      a += (c3 ^ (b | ~d)) + k[4] - 145523070 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c3)) + k[11] - 1120210379 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c3 += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
      c3 = (c3 << 15 | c3 >>> 17) + d | 0;
      b += (d ^ (c3 | ~a)) + k[9] - 343485551 | 0;
      b = (b << 21 | b >>> 11) + c3 | 0;
      x2[0] = a + x2[0] | 0;
      x2[1] = b + x2[1] | 0;
      x2[2] = c3 + x2[2] | 0;
      x2[3] = d + x2[3] | 0;
    }
    function md5blk(s) {
      var md5blks = [], i;
      for (i = 0;i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }
    function md5blk_array(a) {
      var md5blks = [], i;
      for (i = 0;i < 64; i += 4) {
        md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
      }
      return md5blks;
    }
    function md51(s) {
      var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
      for (i = 64;i <= n; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      length = s.length;
      tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0;i < length; i += 1) {
        tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
      }
      tail[i >> 2] |= 128 << (i % 4 << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0;i < 16; i += 1) {
          tail[i] = 0;
        }
      }
      tmp = n * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(state, tail);
      return state;
    }
    function md51_array(a) {
      var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
      for (i = 64;i <= n; i += 64) {
        md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
      }
      a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
      length = a.length;
      tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0;i < length; i += 1) {
        tail[i >> 2] |= a[i] << (i % 4 << 3);
      }
      tail[i >> 2] |= 128 << (i % 4 << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0;i < 16; i += 1) {
          tail[i] = 0;
        }
      }
      tmp = n * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(state, tail);
      return state;
    }
    function rhex(n) {
      var s = "", j;
      for (j = 0;j < 4; j += 1) {
        s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
      }
      return s;
    }
    function hex(x2) {
      var i;
      for (i = 0;i < x2.length; i += 1) {
        x2[i] = rhex(x2[i]);
      }
      return x2.join("");
    }
    if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592") {
      add32 = function(x2, y2) {
        var lsw = (x2 & 65535) + (y2 & 65535), msw = (x2 >> 16) + (y2 >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 65535;
      };
    }
    if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
      (function() {
        function clamp(val, length) {
          val = val | 0 || 0;
          if (val < 0) {
            return Math.max(val + length, 0);
          }
          return Math.min(val, length);
        }
        ArrayBuffer.prototype.slice = function(from, to) {
          var length = this.byteLength, begin = clamp(from, length), end = length, num, target, targetArray, sourceArray;
          if (to !== undefined2) {
            end = clamp(to, length);
          }
          if (begin > end) {
            return new ArrayBuffer(0);
          }
          num = end - begin;
          target = new ArrayBuffer(num);
          targetArray = new Uint8Array(target);
          sourceArray = new Uint8Array(this, begin, num);
          targetArray.set(sourceArray);
          return target;
        };
      })();
    }
    function toUtf8(str) {
      if (/[\u0080-\uFFFF]/.test(str)) {
        str = unescape(encodeURIComponent(str));
      }
      return str;
    }
    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
      var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i;
      for (i = 0;i < length; i += 1) {
        arr[i] = str.charCodeAt(i);
      }
      return returnUInt8Array ? arr : buff;
    }
    function arrayBuffer2Utf8Str(buff) {
      return String.fromCharCode.apply(null, new Uint8Array(buff));
    }
    function concatenateArrayBuffers(first, second, returnUInt8Array) {
      var result = new Uint8Array(first.byteLength + second.byteLength);
      result.set(new Uint8Array(first));
      result.set(new Uint8Array(second), first.byteLength);
      return returnUInt8Array ? result : result.buffer;
    }
    function hexToBinaryString(hex2) {
      var bytes = [], length = hex2.length, x2;
      for (x2 = 0;x2 < length - 1; x2 += 2) {
        bytes.push(parseInt(hex2.substr(x2, 2), 16));
      }
      return String.fromCharCode.apply(String, bytes);
    }
    function SparkMD5() {
      this.reset();
    }
    SparkMD5.prototype.append = function(str) {
      this.appendBinary(toUtf8(str));
      return this;
    };
    SparkMD5.prototype.appendBinary = function(contents) {
      this._buff += contents;
      this._length += contents.length;
      var length = this._buff.length, i;
      for (i = 64;i <= length; i += 64) {
        md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
      }
      this._buff = this._buff.substring(i - 64);
      return this;
    };
    SparkMD5.prototype.end = function(raw2) {
      var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
      for (i = 0;i < length; i += 1) {
        tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
      }
      this._finish(tail, length);
      ret = hex(this._hash);
      if (raw2) {
        ret = hexToBinaryString(ret);
      }
      this.reset();
      return ret;
    };
    SparkMD5.prototype.reset = function() {
      this._buff = "";
      this._length = 0;
      this._hash = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD5.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    };
    SparkMD5.prototype.setState = function(state) {
      this._buff = state.buff;
      this._length = state.length;
      this._hash = state.hash;
      return this;
    };
    SparkMD5.prototype.destroy = function() {
      delete this._hash;
      delete this._buff;
      delete this._length;
    };
    SparkMD5.prototype._finish = function(tail, length) {
      var i = length, tmp, lo, hi;
      tail[i >> 2] |= 128 << (i % 4 << 3);
      if (i > 55) {
        md5cycle(this._hash, tail);
        for (i = 0;i < 16; i += 1) {
          tail[i] = 0;
        }
      }
      tmp = this._length * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(this._hash, tail);
    };
    SparkMD5.hash = function(str, raw2) {
      return SparkMD5.hashBinary(toUtf8(str), raw2);
    };
    SparkMD5.hashBinary = function(content, raw2) {
      var hash = md51(content), ret = hex(hash);
      return raw2 ? hexToBinaryString(ret) : ret;
    };
    SparkMD5.ArrayBuffer = function() {
      this.reset();
    };
    SparkMD5.ArrayBuffer.prototype.append = function(arr) {
      var buff = concatenateArrayBuffers(this._buff.buffer, arr, true), length = buff.length, i;
      this._length += arr.byteLength;
      for (i = 64;i <= length; i += 64) {
        md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
      }
      this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.end = function(raw2) {
      var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
      for (i = 0;i < length; i += 1) {
        tail[i >> 2] |= buff[i] << (i % 4 << 3);
      }
      this._finish(tail, length);
      ret = hex(this._hash);
      if (raw2) {
        ret = hexToBinaryString(ret);
      }
      this.reset();
      return ret;
    };
    SparkMD5.ArrayBuffer.prototype.reset = function() {
      this._buff = new Uint8Array(0);
      this._length = 0;
      this._hash = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.getState = function() {
      var state = SparkMD5.prototype.getState.call(this);
      state.buff = arrayBuffer2Utf8Str(state.buff);
      return state;
    };
    SparkMD5.ArrayBuffer.prototype.setState = function(state) {
      state.buff = utf8Str2ArrayBuffer(state.buff, true);
      return SparkMD5.prototype.setState.call(this, state);
    };
    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
    SparkMD5.ArrayBuffer.hash = function(arr, raw2) {
      var hash = md51_array(new Uint8Array(arr)), ret = hex(hash);
      return raw2 ? hexToBinaryString(ret) : ret;
    };
    return SparkMD5;
  });
});

// ../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS((exports, module) => {
  (function(t, e) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs = e();
  })(exports, function() {
    var t = 1000, e = 60000, n = 3600000, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c3 = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t(e2, n2) {
      if (e2.date() < n2.date())
        return -t(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c3), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c3);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c3, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return t2 === undefined;
    } }, g = "en", D2 = {};
    D2[g] = M2;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if (typeof e2 == "string") {
        var s2 = e2.toLowerCase();
        D2[s2] && (i2 = s2), n2 && (D2[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t(u2[0]);
      } else {
        var a2 = e2.name;
        D2[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t2, e2) {
      if (S(t2))
        return t2.clone();
      var n2 = typeof e2 == "object" ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M3(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M3.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var { date: e2, utc: n2 } = t3;
          if (e2 === null)
            return new Date(NaN);
          if (b.u(e2))
            return new Date;
          if (e2 instanceof Date)
            return new Date(e2);
          if (typeof e2 == "string" && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = O(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n2) {
        return b.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1000);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y3 = this.$W, M4 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c3:
            return r2 ? l2(1, M4) : l2(0, M4 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D3 = (y3 < g2 ? y3 + 7 : y3) - g2;
            return l2(r2 ? m3 - D3 : m3 + (6 - D3), M4);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c3] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c3 || o2 === h) {
          var y3 = this.clone().set(d, 1);
          y3.$d[l2]($2), y3.init(), this.$d = y3.set(d, Math.min(this.$D, y3.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y3 = function(t2) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === c3)
          return this.set(c3, this.$M + r2);
        if ($2 === h)
          return this.set(h, this.$y + r2);
        if ($2 === a)
          return y3(1);
        if ($2 === o)
          return y3(7);
        var M4 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M4;
        return b.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c4 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return b.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y2, function(t3, r3) {
          return r3 || function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h2(n2.monthsShort, a2, c4, 3);
              case "MMMM":
                return h2(c4, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h2(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h2(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y3 = this, M4 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D3 = function() {
          return b.m(y3, m3);
        };
        switch (M4) {
          case h:
            $2 = D3() / 12;
            break;
          case c3:
            $2 = D3();
            break;
          case f:
            $2 = D3() / 3;
            break;
          case o:
            $2 = (g2 - v2) / 604800000;
            break;
          case a:
            $2 = (g2 - v2) / 86400000;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c3).$D;
      }, m2.$locale = function() {
        return D2[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = w(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M3;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c3], ["$y", h], ["$D", d]].forEach(function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1000 * t2);
    }, O.en = D2[g], O.Ls = D2, O.p = {}, O;
  });
});

// ../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/plugin/calendar.js
var require_calendar = __commonJS((exports, module) => {
  (function(e, t) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = typeof globalThis != "undefined" ? globalThis : e || self).dayjs_plugin_calendar = t();
  })(exports, function() {
    return function(e, t, a) {
      var n = "h:mm A", d = { lastDay: "[Yesterday at] " + n, sameDay: "[Today at] " + n, nextDay: "[Tomorrow at] " + n, nextWeek: "dddd [at] " + n, lastWeek: "[Last] dddd [at] " + n, sameElse: "MM/DD/YYYY" };
      t.prototype.calendar = function(e2, t2) {
        var n2 = t2 || this.$locale().calendar || d, o = a(e2 || undefined).startOf("d"), s = this.diff(o, "d", true), i = "sameElse", f = s < -6 ? i : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : i, l = n2[f] || d[f];
        return typeof l == "function" ? l.call(this, a()) : this.format(l);
      };
    };
  });
});

// ../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/plugin/relativeTime.js
var require_relativeTime = __commonJS((exports, module) => {
  (function(r, e) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = typeof globalThis != "undefined" ? globalThis : r || self).dayjs_plugin_relativeTime = e();
  })(exports, function() {
    return function(r, e, t) {
      r = r || {};
      var n = e.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i(r2, e2, t2, o2) {
        return n.fromToBase(r2, e2, t2, o2);
      }
      t.en.relativeTime = o, n.fromToBase = function(e2, n2, i2, d2, u) {
        for (var f, a, s, l = i2.$locale().relativeTime || o, h = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c3 = 0;c3 < m; c3 += 1) {
          var y2 = h[c3];
          y2.d && (f = d2 ? t(e2).diff(i2, y2.d, true) : i2.diff(e2, y2.d, true));
          var p = (r.rounding || Math.round)(Math.abs(f));
          if (s = f > 0, p <= y2.r || !y2.r) {
            p <= 1 && c3 > 0 && (y2 = h[c3 - 1]);
            var v = l[y2.l];
            u && (p = u("" + p)), a = typeof v == "string" ? v.replace("%d", p) : v(p, n2, y2.l, s);
            break;
          }
        }
        if (n2)
          return a;
        var M2 = s ? l.future : l.past;
        return typeof M2 == "function" ? M2(a) : M2.replace("%s", a);
      }, n.to = function(r2, e2) {
        return i(r2, e2, this, true);
      }, n.from = function(r2, e2) {
        return i(r2, e2, this);
      };
      var d = function(r2) {
        return r2.$u ? t.utc() : t();
      };
      n.toNow = function(r2) {
        return this.to(d(this), r2);
      }, n.fromNow = function(r2) {
        return this.from(d(this), r2);
      };
    };
  });
});

// ../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/plugin/updateLocale.js
var require_updateLocale = __commonJS((exports, module) => {
  (function(e, t) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = typeof globalThis != "undefined" ? globalThis : e || self).dayjs_plugin_updateLocale = t();
  })(exports, function() {
    function e() {
      return e = Object.assign || function(e2) {
        for (var t = 1;t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (e2[o] = n[o]);
        }
        return e2;
      }, e.apply(this, arguments);
    }
    return function(t, n, o) {
      o.updateLocale = function(t2, n2) {
        var r = o.Ls[t2];
        if (r)
          return (n2 ? Object.keys(n2) : []).forEach(function(t3) {
            r[t3] && n2[t3] && typeof r[t3] == "object" && typeof n2[t3] == "object" && !Array.isArray(r[t3]) ? r[t3] = e({}, r[t3], n2[t3]) : r[t3] = n2[t3];
          }), r;
      };
    };
  });
});

// ../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/locale/zh-cn.js
var require_zh_cn = __commonJS((exports, module) => {
  (function(e, _) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = _(require_dayjs_min()) : typeof define == "function" && define.amd ? define(["dayjs"], _) : (e = typeof globalThis != "undefined" ? globalThis : e || self).dayjs_locale_zh_cn = _(e.dayjs);
  })(exports, function(e) {
    function _(e2) {
      return e2 && typeof e2 == "object" && "default" in e2 ? e2 : { default: e2 };
    }
    var t = _(e), d = { name: "zh-cn", weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), ordinal: function(e2, _2) {
      return _2 === "W" ? e2 + "\u5468" : e2 + "\u65E5";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206", LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, relativeTime: { future: "%s\u5185", past: "%s\u524D", s: "\u51E0\u79D2", m: "1 \u5206\u949F", mm: "%d \u5206\u949F", h: "1 \u5C0F\u65F6", hh: "%d \u5C0F\u65F6", d: "1 \u5929", dd: "%d \u5929", M: "1 \u4E2A\u6708", MM: "%d \u4E2A\u6708", y: "1 \u5E74", yy: "%d \u5E74" }, meridiem: function(e2, _2) {
      var t2 = 100 * e2 + _2;
      return t2 < 600 ? "\u51CC\u6668" : t2 < 900 ? "\u65E9\u4E0A" : t2 < 1100 ? "\u4E0A\u5348" : t2 < 1300 ? "\u4E2D\u5348" : t2 < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";
    } };
    return t.default.locale(d, null, true), d;
  });
});

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || undefined;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== undefined) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (;i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? undefined : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== undefined) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? undefined;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers;
    if (value === undefined) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map;
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : undefined;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers;
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(text, arg, setDefaultContentType(TEXT_PLAIN, headers));
  };
  json = (object, arg, headers) => {
    return this.#newResponse(JSON.stringify(object), arg, setDefaultContentType("application/json", headers));
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header("Location", !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app) {
    const subApp = this.basePath(path);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = undefined;
      try {
        executionContext = c.executionCtx;
      } catch {}
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, undefined, event.request.method));
    });
  };
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path);
}

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== undefined) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node;
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node;
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node;
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0;; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== undefined) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== undefined) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(path === "*" ? "" : `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)")}$`);
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie;
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length);
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length;i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (;paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length;i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length;j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length;k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push([handler, paramCount]));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length;i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = undefined;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]]));
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/reg-exp-router/prepared-router.js
var PreparedRegExpRouter = class {
  name = "PreparedRegExpRouter";
  #matchers;
  #relocateMap;
  constructor(matchers, relocateMap) {
    this.#matchers = matchers;
    this.#relocateMap = relocateMap;
  }
  #addWildcard(method, handlerData) {
    const matcher = this.#matchers[method];
    matcher[1].forEach((list) => list && list.push(handlerData));
    Object.values(matcher[2]).forEach((list) => list[0].push(handlerData));
  }
  #addPath(method, path, handler, indexes, map) {
    const matcher = this.#matchers[method];
    if (!map) {
      matcher[2][path][0].push([handler, {}]);
    } else {
      indexes.forEach((index) => {
        if (typeof index === "number") {
          matcher[1][index].push([handler, map]);
        } else {
          matcher[2][index || path][0].push([handler, map]);
        }
      });
    }
  }
  add(method, path, handler) {
    if (!this.#matchers[method]) {
      const all = this.#matchers[METHOD_NAME_ALL];
      const staticMap = {};
      for (const key in all[2]) {
        staticMap[key] = [all[2][key][0].slice(), emptyParam];
      }
      this.#matchers[method] = [
        all[0],
        all[1].map((list) => Array.isArray(list) ? list.slice() : 0),
        staticMap
      ];
    }
    if (path === "/*" || path === "*") {
      const handlerData = [handler, {}];
      if (method === METHOD_NAME_ALL) {
        for (const m in this.#matchers) {
          this.#addWildcard(m, handlerData);
        }
      } else {
        this.#addWildcard(method, handlerData);
      }
      return;
    }
    const data = this.#relocateMap[path];
    if (!data) {
      throw new Error(`Path ${path} is not registered`);
    }
    for (const [indexes, map] of data) {
      if (method === METHOD_NAME_ALL) {
        for (const m in this.#matchers) {
          this.#addPath(m, path, handler, indexes, map);
        }
      } else {
        this.#addPath(method, path, handler, indexes, map);
      }
    }
  }
  buildAllMatchers() {
    return this.#matchers;
  }
  match = match;
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length;i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = undefined;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2;
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length;i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== undefined) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length;i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0;i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length;j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length;k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0;p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(handlerSets, child.#children["*"], method, params, node.#params);
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2;
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length;i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter, new TrieRouter]
    });
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        if (opts.credentials) {
          return (origin) => origin || null;
        }
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*" || opts.credentials) {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*" || opts.credentials) {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// src/index.ts
import { join as join9, resolve as resolve2 } from "path";
import { chmodSync as chmodSync3 } from "fs";

// src/lib/config.ts
import { existsSync, readdirSync, readFileSync } from "fs";
import { homedir, tmpdir } from "os";
import { basename, join, resolve } from "path";
var configuredBasePath = process.env.BASE_PATH || "/app/openclaw-launcher";
var fnnasDataRoot = process.env.TRIM_PKGHOME ? `${process.env.TRIM_PKGHOME}/data` : null;
var configuredSocketPath = process.env.MONITOR_SOCKET_PATH?.trim();
var configuredPatchesDir = process.env.OPENCLAW_PATCHES_DIR?.trim();
function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}
function findFirstExistingDirectory(paths) {
  for (const candidate of paths) {
    if (candidate && existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}
function parsePatchManifest(patchesDir) {
  if (!patchesDir) {
    return null;
  }
  const manifestPath = join(patchesDir, "manifest.json");
  if (!existsSync(manifestPath)) {
    return null;
  }
  try {
    return readJson(manifestPath);
  } catch {
    return null;
  }
}
function patchManifestAppliesToVersion(manifest, openclawVersion) {
  if (!manifest) {
    return false;
  }
  if (manifest.status === "not-required") {
    return false;
  }
  return manifest.openclawVersion === openclawVersion;
}
function resolveManifestTarball(patchesDir, manifest, artifactKey) {
  const manifestTarballPath = manifest?.artifacts?.[artifactKey]?.tarballPath;
  if (!manifestTarballPath) {
    return null;
  }
  const candidates = [
    manifestTarballPath,
    join(patchesDir, basename(manifestTarballPath))
  ];
  return candidates.find((candidate) => existsSync(candidate)) || null;
}
function resolvePatchedTarball(patchesDir, manifest, artifactKey, filePrefix) {
  if (!patchesDir) {
    return null;
  }
  const manifestTarballPath = resolveManifestTarball(patchesDir, manifest, artifactKey);
  if (manifestTarballPath) {
    return manifestTarballPath;
  }
  const tarballName = readdirSync(patchesDir).filter((entry) => entry.startsWith(filePrefix) && entry.endsWith(".tgz")).sort().at(-1);
  return tarballName ? join(patchesDir, tarballName) : null;
}
var DATA_ROOT = process.env.OPENCLAW_DATA_DIR || fnnasDataRoot || "/tmp/openclaw-data";
var DEFAULT_INSTANCE_ID = process.env.OPENCLAW_DEFAULT_INSTANCE_ID || "default";
var MONITOR_BASE_PATH = configuredBasePath === "/" ? "" : `/${configuredBasePath}`.replace(/\/+/g, "/").replace(/\/$/, "");
var MONITOR_DB_DIR = `${DATA_ROOT}/monitor`;
var MONITOR_DB_PATH = `${MONITOR_DB_DIR}/monitor.sqlite`;
var SYSTEM_OPENCLAW_CONFIG_PATH = `${homedir()}/.openclaw/openclaw.json`;
var SYSTEM_OPENCLAW_LOG_PATH = `${homedir()}/.openclaw/logs/gateway.log`;
var SYSTEM_OPENCLAW_RUNTIME_LOG_DIR = `${tmpdir()}/openclaw`;
var MONITOR_ACCESS_MODE = process.env.MONITOR_ACCESS_MODE === "public" ? "public" : "lan";
var OPENCLAW_NPM_REGISTRY = process.env.OPENCLAW_NPM_REGISTRY || "https://registry.npmmirror.com/";
var OPENCLAW_VERSION = process.env.OPENCLAW_VERSION || "latest";
var OPENCLAW_PACKAGE_SPEC = `openclaw@${OPENCLAW_VERSION}`;
var OPENCLAW_UPDATE_PACKAGE_SPEC = process.env.OPENCLAW_UPDATE_PACKAGE_SPEC || "openclaw@latest";
var OPENCLAW_FEISHU_PLUGIN_VERSION = process.env.OPENCLAW_FEISHU_PLUGIN_VERSION || "latest";
var OPENCLAW_WECOM_PLUGIN_VERSION = process.env.OPENCLAW_WECOM_PLUGIN_VERSION || "latest";
var OPENCLAW_DINGTALK_PLUGIN_VERSION = process.env.OPENCLAW_DINGTALK_PLUGIN_VERSION || "latest";
var OPENCLAW_WEIXIN_PLUGIN_VERSION = process.env.OPENCLAW_WEIXIN_PLUGIN_VERSION || "latest";
var OPENCLAW_QQBOT_PLUGIN_VERSION = process.env.OPENCLAW_QQBOT_PLUGIN_VERSION || "latest";
var OPENCLAW_CHANNEL_PLUGIN_SPECS = {
  feishu: `@openclaw/feishu@${OPENCLAW_FEISHU_PLUGIN_VERSION}`,
  wecom: `@wecom/wecom-openclaw-plugin@${OPENCLAW_WECOM_PLUGIN_VERSION}`,
  dingtalk: `@dingtalk-real-ai/dingtalk-connector@${OPENCLAW_DINGTALK_PLUGIN_VERSION}`,
  weixin: `@tencent-weixin/openclaw-weixin@${OPENCLAW_WEIXIN_PLUGIN_VERSION}`,
  qqbot: `@openclaw/qqbot@${OPENCLAW_QQBOT_PLUGIN_VERSION}`
};
var OPENCLAW_PATCHES_DIR = findFirstExistingDirectory([
  configuredPatchesDir,
  resolve(import.meta.dir, "../../../../openclaw.launcher/app/vendor/openclaw-patches/dist"),
  resolve(import.meta.dir, "../../../app/vendor/openclaw-patches/dist"),
  resolve(import.meta.dir, "../../app/vendor/openclaw-patches/dist"),
  resolve(import.meta.dir, "../../../../vendor/openclaw-patches/dist"),
  resolve(import.meta.dir, "../../../vendor/openclaw-patches/dist"),
  resolve(import.meta.dir, "../../vendor/openclaw-patches/dist")
]);
var OPENCLAW_PATCHES_MANIFEST = parsePatchManifest(OPENCLAW_PATCHES_DIR);
var OPENCLAW_PATCHES_APPLY_TO_VERSION = patchManifestAppliesToVersion(OPENCLAW_PATCHES_MANIFEST, OPENCLAW_VERSION);
var OPENCLAW_PATCHED_BAILEYS_TARBALL = resolvePatchedTarball(OPENCLAW_PATCHES_APPLY_TO_VERSION ? OPENCLAW_PATCHES_DIR : null, OPENCLAW_PATCHES_MANIFEST, "baileys", "whiskeysockets-baileys-");
var OPENCLAW_PATCHED_LIBSIGNAL_TARBALL = resolvePatchedTarball(OPENCLAW_PATCHES_APPLY_TO_VERSION ? OPENCLAW_PATCHES_DIR : null, OPENCLAW_PATCHES_MANIFEST, "libsignal", "libsignal-");
var OPENCLAW_HAS_PATCHED_DEPS = Boolean(OPENCLAW_PATCHED_BAILEYS_TARBALL && OPENCLAW_PATCHED_LIBSIGNAL_TARBALL);
var SOUL_MD_SRC = process.env.SOUL_MD_SRC || null;
var MONITOR_SOCKET_PATH = configuredSocketPath ? configuredSocketPath : null;
function normalizePublicBasePath(value) {
  if (!value || value === "/") {
    return "/";
  }
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}
function buildInstanceProxyBasePath(instanceId) {
  const suffix = `/${instanceId}`;
  return MONITOR_BASE_PATH === "" ? suffix : `${MONITOR_BASE_PATH}${suffix}`;
}
function isLikelyDevEnvironment() {
  if (process.env.OPENCLAW_USE_SYSTEM_CONFIG === "1") {
    return true;
  }
  if (process.env.OPENCLAW_USE_SYSTEM_CONFIG === "0") {
    return false;
  }
  if (false) {}
  if (process.env.BUN_WATCH === "1") {
    return true;
  }
  const normalizedArgs = process.argv.map((arg) => arg.replace(/\\/g, "/"));
  return normalizedArgs.some((arg) => arg === "--watch" || arg === "-w" || arg === "src/index.ts" || arg.endsWith("/src/index.ts"));
}

// src/lib/access-control.ts
function normalizeIp(value) {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith("::ffff:")) {
    return trimmed.slice(7);
  }
  return trimmed;
}
function isLoopback(ip) {
  return ip === "127.0.0.1" || ip === "::1";
}
function isPrivateIpv4(ip) {
  const parts = ip.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }
  const [first, second] = parts;
  if (first === 10) {
    return true;
  }
  if (first === 172 && second >= 16 && second <= 31) {
    return true;
  }
  if (first === 192 && second === 168) {
    return true;
  }
  if (first === 169 && second === 254) {
    return true;
  }
  return false;
}
function isPrivateIpv6(ip) {
  const lower = ip.toLowerCase();
  return lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb");
}
function isLanClientIp(ip) {
  const normalized = normalizeIp(ip);
  if (!normalized) {
    return false;
  }
  if (isLoopback(normalized)) {
    return true;
  }
  if (normalized.includes(".")) {
    return isPrivateIpv4(normalized);
  }
  if (normalized.includes(":")) {
    return isPrivateIpv6(normalized);
  }
  return false;
}
function shouldAllowClientIp(ip) {
  if (MONITOR_ACCESS_MODE === "public") {
    return true;
  }
  return isLanClientIp(ip);
}
function accessDeniedResponse(ip) {
  const message = {
    message: "Access denied: monitor is restricted to LAN and localhost clients.",
    clientIp: normalizeIp(ip),
    accessMode: MONITOR_ACCESS_MODE
  };
  return Response.json(message, { status: 403 });
}

// src/lib/auth/config.ts
function envFlag(name) {
  const value = process.env[name];
  if (value === "1" || value?.toLowerCase() === "true") {
    return true;
  }
  if (value === "0" || value?.toLowerCase() === "false") {
    return false;
  }
  return null;
}
function envNumber(name, fallback, min, max) {
  const raw2 = process.env[name];
  if (raw2 === undefined || raw2 === "") {
    return fallback;
  }
  const value = Number(raw2);
  if (!Number.isFinite(value) || value < min || value > max) {
    console.warn(`[auth:config] invalid ${name}="${raw2}", using default ${fallback} (range ${min}-${max})`);
    return fallback;
  }
  return value;
}
function envString(name) {
  const value = process.env[name];
  if (typeof value !== "string") {
    return;
  }
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}
function normalizeBypassPath(path) {
  if (!path) {
    return "/";
  }
  return path.startsWith("/") ? path : `/${path}`;
}
var defaultHealthPath = `${MONITOR_BASE_PATH || ""}/api/health` || "/api/health";
var configuredBypassPaths = process.env.FN_AUTH_BYPASS_PATHS ? process.env.FN_AUTH_BYPASS_PATHS.split(",").map((part) => normalizeBypassPath(part.trim())).filter(Boolean) : [defaultHealthPath];
var FN_AUTH_ENABLED = envFlag("FN_AUTH_ENABLED") ?? !isLikelyDevEnvironment();
var FN_AUTH_FNOS_COOKIE_NAME = envString("FN_AUTH_FNOS_COOKIE_NAME") ?? envString("FN_AUTH_COOKIE_NAME") ?? "fnos-token";
var FN_AUTH_COOKIE_NAME = FN_AUTH_FNOS_COOKIE_NAME;
var FN_AUTH_TIMEOUT_MS = envNumber("FN_AUTH_TIMEOUT_MS", 2000, 100, 30000);
var FN_AUTH_CACHE_TTL_MS = envNumber("FN_AUTH_CACHE_TTL_MS", 120000, 0, 600000);
var FN_AUTH_MACHINE_ID = envString("FN_AUTH_MACHINE_ID");
var FN_AUTH_MODE = envString("FN_AUTH_MODE") ?? "sac";
var FN_AUTH_SAC_ENDPOINT = envString("FN_AUTH_SAC_ENDPOINT");
var FN_AUTH_DEVICE_ID_PATH = envString("FN_AUTH_DEVICE_ID_PATH");
var FN_AUTH_REQUIRE_SAME_ORIGIN = envFlag("FN_AUTH_REQUIRE_SAME_ORIGIN") ?? (FN_AUTH_ENABLED && !isLikelyDevEnvironment());
var FN_AUTH_BYPASS_PATHS = configuredBypassPaths;
function isAuthBypassedPath(pathname, method) {
  if (method !== "GET" && method !== "HEAD") {
    return false;
  }
  return FN_AUTH_BYPASS_PATHS.includes(pathname);
}

// src/lib/auth/responses.ts
function wantsJson(request) {
  const accept = request.headers.get("accept") || "";
  const upgrade = request.headers.get("upgrade")?.toLowerCase();
  const pathname = new URL(request.url).pathname;
  return upgrade === "websocket" || pathname.includes("/api/") || accept.includes("application/json");
}
function jsonResponse(status, payload) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
function htmlResponse(status, title, message) {
  const body = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body><h1>${title}</h1><p>${message}</p></body></html>`;
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
function forbiddenResponse(request, reason) {
  if (wantsJson(request)) {
    return jsonResponse(403, { message: "Forbidden", reason });
  }
  return htmlResponse(403, "Forbidden", "\u5F53\u524D\u8BF7\u6C42\u6765\u6E90\u65E0\u6743\u8BBF\u95EE OpenClaw monitor\u3002");
}

// src/lib/request-origin.ts
function firstHeaderValue(value) {
  if (!value) {
    return null;
  }
  const first = value.split(",").map((item) => item.trim()).find(Boolean);
  return first || null;
}
function unquote(value) {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\(.)/g, "$1");
  }
  return value;
}
function parseForwardedHeader(value) {
  const first = firstHeaderValue(value);
  if (!first) {
    return null;
  }
  const result = {};
  for (const segment of first.split(";")) {
    const separatorIndex = segment.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }
    const key = segment.slice(0, separatorIndex).trim().toLowerCase();
    const rawValue = segment.slice(separatorIndex + 1).trim();
    if (!rawValue) {
      continue;
    }
    const normalizedValue = unquote(rawValue);
    if (key === "host") {
      result.host = normalizedValue;
    } else if (key === "proto") {
      result.proto = normalizedValue;
    }
  }
  return result.host || result.proto ? result : null;
}
function normalizeProto(value) {
  if (!value) {
    return null;
  }
  const normalized = value.trim().toLowerCase().replace(/:$/, "");
  if (!normalized) {
    return null;
  }
  if (normalized === "ws") {
    return "http";
  }
  if (normalized === "wss") {
    return "https";
  }
  return normalized;
}
function hasExplicitPort(host) {
  try {
    return new URL(`http://${host}`).port.length > 0;
  } catch {
    return false;
  }
}
function defaultPortForProto(proto) {
  return proto === "https" ? "443" : "80";
}
function buildPublicUrl(proto, host, port) {
  const normalizedHost = host.trim();
  if (!normalizedHost) {
    return null;
  }
  const normalizedPort = port?.trim() || null;
  const authority = normalizedPort && !hasExplicitPort(normalizedHost) ? `${normalizedHost}:${normalizedPort}` : normalizedHost;
  try {
    return new URL(`${proto}://${authority}`);
  } catch {
    return null;
  }
}
function hostnameFromHostLike(host) {
  const normalizedHost = host?.trim();
  if (!normalizedHost) {
    return null;
  }
  try {
    return new URL(`http://${normalizedHost}`).hostname;
  } catch {
    return null;
  }
}
function explicitPortFromHostLike(host) {
  const normalizedHost = host?.trim();
  if (!normalizedHost) {
    return "";
  }
  try {
    return new URL(`http://${normalizedHost}`).port;
  } catch {
    return "";
  }
}
function resolveRequestOrigin(request) {
  const url = new URL(request.url);
  const forwarded = parseForwardedHeader(request.headers.get("forwarded"));
  const requestHost = request.headers.get("host")?.trim() || url.host;
  const forwardedHost = forwarded?.host || firstHeaderValue(request.headers.get("x-forwarded-host")) || null;
  const proto = normalizeProto(forwarded?.proto) || normalizeProto(firstHeaderValue(request.headers.get("x-forwarded-proto"))) || normalizeProto(url.protocol) || "http";
  const host = forwardedHost || requestHost;
  let port = firstHeaderValue(request.headers.get("x-forwarded-port"));
  if (!port && forwardedHost && !hasExplicitPort(forwardedHost)) {
    const forwardedHostname = hostnameFromHostLike(forwardedHost);
    const requestHostname = hostnameFromHostLike(requestHost);
    if (forwardedHostname && requestHostname && forwardedHostname === requestHostname) {
      const requestUrlPort = url.port || (hasExplicitPort(requestHost) ? explicitPortFromHostLike(requestHost) : "");
      if (requestUrlPort) {
        port = requestUrlPort;
      }
    }
  }
  const publicUrl = buildPublicUrl(proto, host, port) || url;
  const normalizedProto = publicUrl.protocol.replace(/:$/, "");
  return {
    origin: publicUrl.origin,
    proto: normalizedProto,
    host: publicUrl.host,
    hostname: publicUrl.hostname,
    port: publicUrl.port || defaultPortForProto(normalizedProto)
  };
}

// src/lib/auth/origin-guard.ts
function normalizeOrigin(value) {
  if (!value) {
    return null;
  }
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}
function requestTargetOrigin(request) {
  return resolveRequestOrigin(request).origin;
}
function requiresSameOrigin(request) {
  const method = request.method.toUpperCase();
  const upgrade = request.headers.get("upgrade")?.toLowerCase();
  if (upgrade === "websocket") {
    return true;
  }
  return !["GET", "HEAD", "OPTIONS"].includes(method);
}
function isSameOriginRequest(request) {
  const origin = normalizeOrigin(request.headers.get("origin"));
  const target = requestTargetOrigin(request);
  if (origin) {
    return origin === target;
  }
  const refererOrigin = normalizeOrigin(request.headers.get("referer"));
  if (refererOrigin) {
    return refererOrigin === target;
  }
  return false;
}

// src/lib/auth/request-auth.ts
function requestLabel(request) {
  const url = new URL(request.url);
  return `${request.method.toUpperCase()} ${url.pathname}`;
}
function originFailure(request) {
  console.warn(`[auth] origin mismatch for ${requestLabel(request)}`);
  return {
    ok: false,
    reason: "origin_mismatch",
    response: forbiddenResponse(request, "origin_mismatch")
  };
}
function splitPath2(pathname) {
  return pathname.split("/").filter(Boolean);
}
function hasMonitorBasePrefix(pathname) {
  const basePath = MONITOR_BASE_PATH;
  const baseSegments = splitPath2(basePath === "/" ? "" : basePath);
  const segments = splitPath2(pathname);
  if (segments.length < baseSegments.length) {
    return false;
  }
  for (let index = 0;index < baseSegments.length; index += 1) {
    if (segments[index] !== baseSegments[index]) {
      return false;
    }
  }
  return true;
}
function isMonitorApiPath(pathname) {
  if (!hasMonitorBasePrefix(pathname)) {
    return false;
  }
  const baseSegments = splitPath2(MONITOR_BASE_PATH === "/" ? "" : MONITOR_BASE_PATH);
  const segments = splitPath2(pathname);
  return segments[baseSegments.length] === "api";
}
function isOpenClawProxyPath(pathname) {
  if (!hasMonitorBasePrefix(pathname)) {
    return false;
  }
  const baseSegments = splitPath2(MONITOR_BASE_PATH === "/" ? "" : MONITOR_BASE_PATH);
  const segments = splitPath2(pathname);
  if (segments.length <= baseSegments.length) {
    return false;
  }
  const instanceId = segments[baseSegments.length];
  return Boolean(instanceId) && instanceId !== "api" && instanceId !== "assets";
}
function passesOriginGuard(request) {
  const pathname = new URL(request.url).pathname;
  if (isMonitorApiPath(pathname) || isOpenClawProxyPath(pathname)) {
    return true;
  }
  if (!FN_AUTH_REQUIRE_SAME_ORIGIN || !requiresSameOrigin(request)) {
    return true;
  }
  return isSameOriginRequest(request);
}
async function authenticateRequest(request) {
  const url = new URL(request.url);
  if (!FN_AUTH_ENABLED) {
    return {
      ok: true,
      identity: null,
      bypassed: true
    };
  }
  if (isAuthBypassedPath(url.pathname, request.method.toUpperCase())) {
    return {
      ok: true,
      identity: null,
      bypassed: true
    };
  }
  if (!passesOriginGuard(request)) {
    return originFailure(request);
  }
  return {
    ok: true,
    identity: null,
    bypassed: false
  };
}

// src/lib/runtime-state.ts
import { rmSync } from "fs";

// src/lib/instances.ts
import { Database } from "bun:sqlite";
import { mkdirSync } from "fs";
var db = null;
function tableHasColumn(database, tableName, columnName) {
  const rows = database.query(`PRAGMA table_info(${tableName})`).all();
  return rows.some((row) => row.name === columnName);
}
function getDb() {
  if (db) {
    return db;
  }
  mkdirSync(MONITOR_DB_DIR, { recursive: true });
  db = new Database(MONITOR_DB_PATH, { create: true });
  db.exec(`
    CREATE TABLE IF NOT EXISTS instances (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      display_name TEXT NOT NULL,
      status TEXT NOT NULL,
      gateway_port INTEGER,
      openclaw_version TEXT,
      proxy_base_path TEXT NOT NULL,
      data_root TEXT NOT NULL,
      install_dir TEXT NOT NULL,
      home_dir TEXT NOT NULL,
      state_dir TEXT NOT NULL,
      workspace_dir TEXT NOT NULL,
      runtime_dir TEXT NOT NULL,
      config_path TEXT NOT NULL,
      env_path TEXT NOT NULL,
      log_path TEXT NOT NULL,
      pid_path TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_instances_owner_id ON instances(owner_id);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_instances_proxy_base_path ON instances(proxy_base_path);
  `);
  if (!tableHasColumn(db, "instances", "openclaw_version")) {
    db.exec(`ALTER TABLE instances ADD COLUMN openclaw_version TEXT`);
  }
  return db;
}
function nowIso() {
  return new Date().toISOString();
}
function toRecord(row) {
  return {
    id: row.id,
    ownerId: row.owner_id,
    displayName: row.display_name,
    status: row.status,
    gatewayPort: row.gateway_port,
    openclawVersion: row.openclaw_version,
    proxyBasePath: row.proxy_base_path,
    dataRoot: row.data_root,
    installDir: row.install_dir,
    homeDir: row.home_dir,
    stateDir: row.state_dir,
    workspaceDir: row.workspace_dir,
    runtimeDir: row.runtime_dir,
    configPath: row.config_path,
    envPath: row.env_path,
    logPath: row.log_path,
    pidPath: row.pid_path,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
function buildDefaultInstance() {
  const createdAt = nowIso();
  const installDir = `${DATA_ROOT}/openclaw`;
  const homeDir = `${DATA_ROOT}/home`;
  const runtimeDir = `${DATA_ROOT}/runtime`;
  return {
    id: DEFAULT_INSTANCE_ID,
    ownerId: "system",
    displayName: "Default Gateway",
    status: "managed",
    gatewayPort: null,
    openclawVersion: null,
    proxyBasePath: buildInstanceProxyBasePath(DEFAULT_INSTANCE_ID),
    dataRoot: DATA_ROOT,
    installDir,
    homeDir,
    stateDir: `${DATA_ROOT}/state`,
    workspaceDir: `${DATA_ROOT}/workspace`,
    runtimeDir,
    configPath: `${homeDir}/.openclaw/openclaw.json`,
    envPath: `${installDir}/.env`,
    logPath: `${installDir}/gateway.log`,
    pidPath: `${runtimeDir}/gateway.pid`,
    createdAt,
    updatedAt: createdAt
  };
}
function buildDedicatedInstance(id, ownerId, displayName) {
  const createdAt = nowIso();
  const dataRoot = `${DATA_ROOT}/instances/${id}`;
  const installDir = `${dataRoot}/openclaw`;
  const homeDir = `${dataRoot}/home`;
  const runtimeDir = `${dataRoot}/runtime`;
  return {
    id,
    ownerId,
    displayName,
    status: "created",
    gatewayPort: null,
    openclawVersion: null,
    proxyBasePath: buildInstanceProxyBasePath(id),
    dataRoot,
    installDir,
    homeDir,
    stateDir: `${dataRoot}/state`,
    workspaceDir: `${dataRoot}/workspace`,
    runtimeDir,
    configPath: `${homeDir}/.openclaw/openclaw.json`,
    envPath: `${runtimeDir}/gateway.env`,
    logPath: `${runtimeDir}/gateway.log`,
    pidPath: `${runtimeDir}/gateway.pid`,
    createdAt,
    updatedAt: createdAt
  };
}
function persistInstance(record) {
  const database = getDb();
  database.query(`
      INSERT INTO instances (
        id, owner_id, display_name, status, gateway_port, openclaw_version, proxy_base_path,
        data_root, install_dir, home_dir, state_dir, workspace_dir, runtime_dir,
        config_path, env_path, log_path, pid_path, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        owner_id = excluded.owner_id,
        display_name = excluded.display_name,
        status = excluded.status,
        gateway_port = excluded.gateway_port,
        openclaw_version = excluded.openclaw_version,
        proxy_base_path = excluded.proxy_base_path,
        data_root = excluded.data_root,
        install_dir = excluded.install_dir,
        home_dir = excluded.home_dir,
        state_dir = excluded.state_dir,
        workspace_dir = excluded.workspace_dir,
        runtime_dir = excluded.runtime_dir,
        config_path = excluded.config_path,
        env_path = excluded.env_path,
        log_path = excluded.log_path,
        pid_path = excluded.pid_path,
        updated_at = excluded.updated_at
    `).run(record.id, record.ownerId, record.displayName, record.status, record.gatewayPort, record.openclawVersion, record.proxyBasePath, record.dataRoot, record.installDir, record.homeDir, record.stateDir, record.workspaceDir, record.runtimeDir, record.configPath, record.envPath, record.logPath, record.pidPath, record.createdAt, record.updatedAt);
}
function generateInstanceId(ownerId) {
  const normalizedOwner = ownerId.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  const suffix = crypto.randomUUID().slice(0, 8);
  return `gw_${normalizedOwner || "user"}_${suffix}`;
}
function ensureDefaultInstance() {
  const existing = getInstance(DEFAULT_INSTANCE_ID);
  if (existing) {
    const expectedProxyBasePath = buildInstanceProxyBasePath(DEFAULT_INSTANCE_ID);
    if (existing.proxyBasePath !== expectedProxyBasePath) {
      const updated = {
        ...existing,
        proxyBasePath: expectedProxyBasePath,
        updatedAt: nowIso()
      };
      persistInstance(updated);
      return updated;
    }
    return existing;
  }
  const record = buildDefaultInstance();
  persistInstance(record);
  return record;
}
function listInstances() {
  ensureDefaultInstance();
  const database = getDb();
  const rows = database.query(`SELECT * FROM instances ORDER BY created_at ASC`).all();
  return rows.map(toRecord);
}
function getInstance(id) {
  const database = getDb();
  const row = database.query(`SELECT * FROM instances WHERE id = ? LIMIT 1`).get(id);
  return row ? toRecord(row) : null;
}
function createInstance(input) {
  ensureDefaultInstance();
  const id = generateInstanceId(input.ownerId);
  const record = buildDedicatedInstance(id, input.ownerId.trim(), input.displayName?.trim() || `${input.ownerId.trim()} Gateway`);
  persistInstance(record);
  return record;
}
function updateInstance(instanceId, patch) {
  const current = getInstance(instanceId);
  if (!current) {
    return null;
  }
  const next = {
    ...current,
    ...patch,
    updatedAt: nowIso()
  };
  persistInstance(next);
  return next;
}

// src/lib/openclaw-instance.ts
import { mkdirSync as mkdirSync2 } from "fs";
import { homedir as homedir2 } from "os";
import { dirname } from "path";

// src/lib/config-file.ts
function stripJsonComments(text) {
  let result = "";
  let index = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  while (index < text.length) {
    const char = text[index];
    const next = text[index + 1];
    const previous = text[index - 1];
    if (!inDoubleQuote && char === "'" && previous !== "\\") {
      inSingleQuote = !inSingleQuote;
      result += char;
      index += 1;
      continue;
    }
    if (!inSingleQuote && char === '"' && previous !== "\\") {
      inDoubleQuote = !inDoubleQuote;
      result += char;
      index += 1;
      continue;
    }
    if (!inSingleQuote && !inDoubleQuote && char === "/" && next === "/") {
      index += 2;
      while (index < text.length && text[index] !== `
`) {
        index += 1;
      }
      continue;
    }
    if (!inSingleQuote && !inDoubleQuote && char === "/" && next === "*") {
      index += 2;
      while (index < text.length && !(text[index] === "*" && text[index + 1] === "/")) {
        index += 1;
      }
      index += 2;
      continue;
    }
    result += char;
    index += 1;
  }
  return result;
}
function normalizeConfigTextToJson(text) {
  return stripJsonComments(text).replace(/^\uFEFF/, "").replace(/([{,]\s*)([A-Za-z_$][\w$-]*)(\s*:)/g, '$1"$2"$3').replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, value) => {
    const normalized = value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    return `"${normalized}"`;
  }).replace(/,\s*([}\]])/g, "$1");
}
function parseLooseConfig(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return {};
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return JSON.parse(normalizeConfigTextToJson(trimmed));
  }
}
async function readLooseConfigFile(path) {
  try {
    const file = Bun.file(path);
    if (!await file.exists()) {
      return {};
    }
    return parseLooseConfig(await file.text());
  } catch {
    return {};
  }
}

// src/lib/openclaw-platform.ts
import { delimiter } from "path";
var IS_WINDOWS = process.platform === "win32";
function managedOpenclawBinPath(installDir) {
  const binName = IS_WINDOWS ? "openclaw.cmd" : "openclaw";
  return `${installDir}/node_modules/.bin/${binName}`;
}
function prependToPath(pathValue, entry) {
  return pathValue ? `${entry}${delimiter}${pathValue}` : entry;
}
function resolveSystemOpenclawBinary() {
  try {
    return Bun.which("openclaw") || (IS_WINDOWS ? Bun.which("openclaw.cmd") : null);
  } catch {
    return null;
  }
}
function shouldUseSystemOpenclaw(instanceId) {
  if (instanceId !== DEFAULT_INSTANCE_ID) {
    return false;
  }
  if (process.env.OPENCLAW_USE_SYSTEM_CONFIG === "1") {
    return true;
  }
  if (process.env.OPENCLAW_USE_SYSTEM_CONFIG === "0") {
    return false;
  }
  const systemBinary = resolveSystemOpenclawBinary();
  if (!systemBinary) {
    return false;
  }
  if (process.platform === "darwin") {
    return true;
  }
  if (process.platform === "win32") {
    return isLikelyDevEnvironment();
  }
  return false;
}

// src/lib/openclaw-instance.ts
var OPENCLAW_STATUS_VERSION_ENV_KEY = "OPENCLAW_STATUS_VERSION";
var OPENCLAW_STATUS_VERSION_UPDATED_AT_ENV_KEY = "OPENCLAW_STATUS_VERSION_UPDATED_AT";
function usesSystemOpenclaw(instance) {
  return shouldUseSystemOpenclaw(instance.id);
}
function activeConfigPath(instance) {
  return usesSystemOpenclaw(instance) ? SYSTEM_OPENCLAW_CONFIG_PATH : instance.configPath;
}
function openclawEnv(instance) {
  const configPath = activeConfigPath(instance);
  const sharedEnv = {
    ...process.env,
    OPENCLAW_HIDE_BANNER: "1",
    OLLAMA_API_KEY: process.env.OLLAMA_API_KEY || "ollama-local"
  };
  if (usesSystemOpenclaw(instance)) {
    return {
      ...sharedEnv,
      HOME: process.env.HOME || homedir2(),
      OPENCLAW_CONFIG_PATH: configPath
    };
  }
  return {
    ...sharedEnv,
    HOME: instance.homeDir,
    OPENCLAW_CONFIG_PATH: configPath,
    PATH: prependToPath(process.env.PATH, `${instance.installDir}/node_modules/.bin`)
  };
}
// 读取本机真实 Node 版本。注意: 本服务运行在 Bun 下, process.versions.node 只是 Bun 的
// Node 兼容版本号(例如 24.3.0), 不能用来判断引擎要求, 因此这里直接询问 PATH 里的 node。
async function resolveSystemNodeVersion() {
  try {
    const proc = Bun.spawn(["node", "--version"], { stdout: "pipe", stderr: "pipe" });
    const out = (await new Response(proc.stdout).text()).trim();
    await proc.exited;
    const m = out.match(/^v?(\d+\.\d+\.\d+)/u);
    if (m) return m[1];
  } catch {}
  return (process.versions && process.versions.node) || "";
}
function openclawBinPath(instance) {
  if (usesSystemOpenclaw(instance)) {
    return "openclaw";
  }
  return managedOpenclawBinPath(instance.installDir);
}
async function resolveOpenclawBinary(instance) {
  if (usesSystemOpenclaw(instance)) {
    return resolveSystemOpenclawBinary();
  }
  const managedBin = openclawBinPath(instance);
  return await Bun.file(managedBin).exists() ? managedBin : null;
}
async function requireOpenclawBinary(instance) {
  const resolved = await resolveOpenclawBinary(instance);
  if (!resolved) {
    throw new Error("openclaw binary not found");
  }
  return resolved;
}
function openclawSpawnCwd(instance) {
  return usesSystemOpenclaw(instance) ? undefined : instance.installDir;
}
async function ensureInstanceDirectories(instance) {
  mkdirSync2(instance.installDir, { recursive: true });
  mkdirSync2(instance.homeDir, { recursive: true });
  mkdirSync2(instance.runtimeDir, { recursive: true });
  mkdirSync2(instance.stateDir, { recursive: true });
  mkdirSync2(instance.workspaceDir, { recursive: true });
  mkdirSync2(`${instance.homeDir}/.openclaw`, { recursive: true });
}
async function readJsonFile(path) {
  try {
    const config = await readLooseConfigFile(path);
    if (Object.keys(config).length > 0) {
      return config;
    }
  } catch {
    return null;
  }
  return null;
}
async function readSystemOpenclawConfig() {
  return readJsonFile(SYSTEM_OPENCLAW_CONFIG_PATH);
}
function readGatewayPortFromConfig(config) {
  const gateway = config?.gateway || {};
  const port = gateway.port;
  return typeof port === "number" && Number.isFinite(port) ? port : null;
}
function parseInstanceEnv(content) {
  const env = {};
  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const match2 = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/u);
    if (!match2) {
      continue;
    }
    env[match2[1]] = parseInstanceEnvValue(match2[2]);
  }
  return env;
}
function parseInstanceEnvValue(rawValue) {
  const value = rawValue.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}
function formatInstanceEnvValue(value) {
  return /^[A-Za-z0-9_./:@-]*$/u.test(value) ? value : JSON.stringify(value);
}
function formatInstanceEnv(env) {
  const preferredKeys = ["PORT", OPENCLAW_STATUS_VERSION_ENV_KEY, OPENCLAW_STATUS_VERSION_UPDATED_AT_ENV_KEY];
  const emitted = new Set;
  const lines = [];
  for (const key of preferredKeys) {
    if (env[key] !== undefined) {
      lines.push(`${key}=${formatInstanceEnvValue(env[key])}`);
      emitted.add(key);
    }
  }
  for (const key of Object.keys(env).sort()) {
    if (!emitted.has(key)) {
      lines.push(`${key}=${formatInstanceEnvValue(env[key])}`);
    }
  }
  return `${lines.join(`
`)}${lines.length > 0 ? `
` : ""}`;
}
async function readInstanceEnv(instance) {
  if (usesSystemOpenclaw(instance)) {
    return {};
  }
  try {
    const file = Bun.file(instance.envPath);
    if (await file.exists()) {
      return parseInstanceEnv(await file.text());
    }
  } catch {
    return {};
  }
  return {};
}
async function writeInstanceEnv(instance, env) {
  if (usesSystemOpenclaw(instance)) {
    return;
  }
  await ensureInstanceDirectories(instance);
  mkdirSync2(dirname(instance.envPath), { recursive: true });
  await Bun.write(instance.envPath, formatInstanceEnv(env));
}
async function readInstanceRuntimeVersion(instance) {
  const env = await readInstanceEnv(instance);
  const value = env[OPENCLAW_STATUS_VERSION_ENV_KEY]?.trim();
  return value ? value : null;
}
async function writeInstanceRuntimeVersion(instance, version) {
  if (usesSystemOpenclaw(instance)) {
    return;
  }
  const env = await readInstanceEnv(instance);
  if (version?.trim()) {
    env[OPENCLAW_STATUS_VERSION_ENV_KEY] = version.trim();
    env[OPENCLAW_STATUS_VERSION_UPDATED_AT_ENV_KEY] = new Date().toISOString();
  } else {
    delete env[OPENCLAW_STATUS_VERSION_ENV_KEY];
    delete env[OPENCLAW_STATUS_VERSION_UPDATED_AT_ENV_KEY];
  }
  await writeInstanceEnv(instance, env);
}
async function readInstancePort(instance) {
  if (usesSystemOpenclaw(instance)) {
    const systemPort = readGatewayPortFromConfig(await readSystemOpenclawConfig());
    if (systemPort) {
      return systemPort;
    }
    return null;
  }
  const env = await readInstanceEnv(instance);
  const port = env.PORT;
  if (port && /^\d+$/u.test(port)) {
    return parseInt(port, 10);
  }
  return null;
}
async function writeInstancePort(instance, port) {
  if (usesSystemOpenclaw(instance)) {
    const config = await readSystemOpenclawConfig() || {};
    const gateway = config.gateway || {};
    gateway.port = port;
    config.gateway = gateway;
    await Bun.write(activeConfigPath(instance), JSON.stringify(config, null, 2));
    return;
  }
  const env = await readInstanceEnv(instance);
  env.PORT = String(port);
  await writeInstanceEnv(instance, env);
}
async function readInstanceConfig(instance) {
  const config = await readJsonFile(activeConfigPath(instance));
  if (config) {
    return config;
  }
  return {};
}
async function writeInstanceConfig(instance, config) {
  if (!usesSystemOpenclaw(instance)) {
    await ensureInstanceDirectories(instance);
  }
  await Bun.write(activeConfigPath(instance), JSON.stringify(config, null, 2));
}

// src/lib/process-control.ts
import { spawnSync } from "child_process";
import { createWriteStream, readFileSync as readFileSync2, readlinkSync } from "fs";

// src/lib/background-task.ts
var trackedBackgroundTasks = new WeakMap;
var processHandlersRegistered = false;
function formatBackgroundFields(fields) {
  return Object.entries(fields).filter(([, value]) => value !== undefined).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(" ");
}
function logBackgroundEvent(event, fields) {
  const line = formatBackgroundFields(fields);
  if (event === "failure" || event === "unhandled_rejection" || event === "uncaught_exception") {
    console.error(`[background:${event}] ${line}`);
    return;
  }
  console.info(`[background:${event}] ${line}`);
}
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
function errorStack(error) {
  if (!(error instanceof Error)) {
    return null;
  }
  return error.stack || error.message || null;
}
function registerBackgroundTaskSafetyHandlers() {
  if (processHandlersRegistered) {
    return;
  }
  processHandlersRegistered = true;
  process.on("unhandledRejection", (reason, promise) => {
    const tracked = promise && typeof promise === "object" ? trackedBackgroundTasks.get(promise) : undefined;
    logBackgroundEvent("unhandled_rejection", {
      label: tracked?.label,
      instanceId: tracked?.instanceId,
      taskKey: tracked?.taskKey,
      route: tracked?.route,
      reason: tracked?.reason,
      durationMs: tracked ? Date.now() - tracked.startedAt : undefined,
      error: errorMessage(reason),
      ...tracked?.metadata || {}
    });
    const stack = errorStack(reason);
    if (stack) {
      console.error(stack);
    }
  });
  process.on("uncaughtException", (error) => {
    logBackgroundEvent("uncaught_exception", {
      error: errorMessage(error)
    });
    const stack = errorStack(error);
    if (stack) {
      console.error(stack);
    }
  });
}
function observeBackgroundTask(context, promise, options) {
  if (!promise) {
    return;
  }
  if (trackedBackgroundTasks.has(promise)) {
    return;
  }
  const startedAt = Date.now();
  const tracked = {
    ...context,
    startedAt
  };
  trackedBackgroundTasks.set(promise, tracked);
  if (options?.logStart ?? true) {
    logBackgroundEvent("start", {
      label: context.label,
      instanceId: context.instanceId,
      taskKey: context.taskKey,
      route: context.route,
      reason: context.reason,
      ...context.metadata || {}
    });
  }
  promise.then(() => {
    if (!(options?.logSuccess ?? true)) {
      return;
    }
    logBackgroundEvent("success", {
      label: context.label,
      instanceId: context.instanceId,
      taskKey: context.taskKey,
      route: context.route,
      reason: context.reason,
      durationMs: Date.now() - startedAt,
      ...context.metadata || {}
    });
  }).catch((error) => {
    logBackgroundEvent("failure", {
      label: context.label,
      instanceId: context.instanceId,
      taskKey: context.taskKey,
      route: context.route,
      reason: context.reason,
      durationMs: Date.now() - startedAt,
      error: errorMessage(error),
      ...context.metadata || {}
    });
    const stack = errorStack(error);
    if (stack) {
      console.error(stack);
    }
  });
}

// src/lib/process-control.ts
async function runTextCommand(cmd, options) {
  const timeoutMs = options?.timeoutMs ?? 5000;
  const proc = Bun.spawn(cmd, {
    stdout: "pipe",
    stderr: "pipe",
    env: options?.env,
    cwd: options?.cwd
  });
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      proc.kill();
      reject(new Error(`Command timeout after ${timeoutMs}ms: ${cmd.join(" ")}`));
    }, timeoutMs);
  });
  try {
    const [stdout, stderr, exitCode] = await Promise.race([
      Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited
      ]),
      timeoutPromise
    ]);
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      exitCode
    };
  } catch (error) {
    return {
      stdout: "",
      stderr: error instanceof Error ? error.message : String(error),
      exitCode: -1
    };
  }
}
function isPidAlive(pid) {
  if (!pid) {
    return false;
  }
  const pidNumber = Number(pid);
  if (!Number.isInteger(pidNumber) || pidNumber <= 0) {
    return false;
  }
  try {
    process.kill(pidNumber, 0);
    if (!IS_WINDOWS) {
      const processState = readUnixProcessState(pid);
      if (processState === "Z" || processState === "X") {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}
function readUnixProcessState(pid) {
  const procfsState = readProcfsProcessState(pid);
  if (procfsState) {
    return procfsState;
  }
  return readPsProcessState(pid);
}
function readProcfsProcessState(pid) {
  try {
    const content = readFileSync2(`/proc/${pid}/status`, "utf8");
    const match2 = content.match(/^State:\s+([A-Za-z])/m);
    return match2 ? match2[1].toUpperCase() : null;
  } catch {
    return null;
  }
}
function readPsProcessState(pid) {
  try {
    const result = spawnSync("ps", ["-o", "stat=", "-p", pid], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    if (result.status !== 0 || typeof result.stdout !== "string") {
      return null;
    }
    const state = result.stdout.trim();
    return state ? state[0].toUpperCase() : null;
  } catch {
    return null;
  }
}
async function findListeningPids(port) {
  try {
    if (IS_WINDOWS) {
      const result2 = await runTextCommand([
        "powershell.exe",
        "-NoProfile",
        "-Command",
        `$ids=@(Get-NetTCPConnection -State Listen -LocalPort ${port} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique); $ids | ForEach-Object { $_ }`
      ]);
      if (result2.exitCode !== 0 || !result2.stdout) {
        return [];
      }
      return result2.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    }
    const result = await runTextCommand(["lsof", "-ti", `TCP:${port}`, "-sTCP:LISTEN"]);
    if (result.exitCode !== 0 || !result.stdout) {
      return [];
    }
    return result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch {
    return [];
  }
}
async function getProcessStartTime(pid) {
  if (!pid) {
    return null;
  }
  try {
    if (IS_WINDOWS) {
      const result2 = await runTextCommand([
        "powershell.exe",
        "-NoProfile",
        "-Command",
        `$p=Get-Process -Id ${pid} -ErrorAction SilentlyContinue; if ($p) { $p.StartTime.ToUniversalTime().ToString('o') }`
      ]);
      if (result2.exitCode !== 0 || !result2.stdout) {
        return null;
      }
      const ts2 = Date.parse(result2.stdout);
      return Number.isNaN(ts2) ? null : ts2;
    }
    const result = await runTextCommand(["ps", "-o", "lstart=", "-p", pid]);
    if (result.exitCode !== 0 || !result.stdout) {
      return null;
    }
    const ts = Date.parse(result.stdout);
    return Number.isNaN(ts) ? null : ts;
  } catch {
    return null;
  }
}
async function listChildPids(pid) {
  if (!pid) {
    return [];
  }
  try {
    if (IS_WINDOWS) {
      const result2 = await runTextCommand([
        "powershell.exe",
        "-NoProfile",
        "-Command",
        `Get-CimInstance Win32_Process -Filter "ParentProcessId = ${pid}" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty ProcessId`
      ]);
      if (result2.exitCode !== 0 || !result2.stdout) {
        return [];
      }
      return result2.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    }
    const result = await runTextCommand(["ps", "-o", "pid=", "--ppid", pid]);
    if (result.exitCode !== 0 || !result.stdout) {
      return [];
    }
    return result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch {
    return [];
  }
}
async function listProcessTreePids(rootPid) {
  if (!rootPid) {
    return [];
  }
  const discovered = new Set;
  const queue = [rootPid];
  while (queue.length > 0) {
    const current = queue.shift() || null;
    if (!current || discovered.has(current)) {
      continue;
    }
    discovered.add(current);
    const children = await listChildPids(current);
    for (const childPid of children) {
      if (!discovered.has(childPid)) {
        queue.push(childPid);
      }
    }
  }
  return Array.from(discovered);
}
async function describeProcess(pid) {
  if (!pid) {
    return null;
  }
  try {
    if (IS_WINDOWS) {
      const result2 = await runTextCommand([
        "powershell.exe",
        "-NoProfile",
        "-Command",
        `$p=Get-CimInstance Win32_Process -Filter "ProcessId = ${pid}" -ErrorAction SilentlyContinue; if ($p) { [pscustomobject]@{ ProcessId=$p.ProcessId; CommandLine=$p.CommandLine; ExecutablePath=$p.ExecutablePath } | ConvertTo-Json -Compress }`
      ]);
      if (result2.exitCode !== 0 || !result2.stdout) {
        return null;
      }
      const parsed = JSON.parse(result2.stdout);
      return {
        pid: String(parsed.ProcessId ?? pid),
        commandLine: typeof parsed.CommandLine === "string" ? parsed.CommandLine : null,
        executablePath: typeof parsed.ExecutablePath === "string" ? parsed.ExecutablePath : null
      };
    }
    let executablePath = null;
    try {
      executablePath = readlinkSync(`/proc/${pid}/exe`);
    } catch {
      executablePath = null;
    }
    const procfsPath = `/proc/${pid}/cmdline`;
    const procfsFile = Bun.file(procfsPath);
    if (await procfsFile.exists()) {
      const raw2 = await procfsFile.text();
      const commandLine = raw2.replace(/\0+/g, " ").trim();
      if (commandLine) {
        return {
          pid,
          commandLine,
          executablePath
        };
      }
    }
    const result = await runTextCommand(["ps", "-o", "args=", "-p", pid]);
    if (result.exitCode !== 0 || !result.stdout) {
      return executablePath ? {
        pid,
        commandLine: null,
        executablePath
      } : null;
    }
    return {
      pid,
      commandLine: result.stdout,
      executablePath
    };
  } catch {
    return null;
  }
}
function isLikelyOpenclawProcess(snapshot) {
  if (!snapshot) {
    return false;
  }
  const joined = [snapshot.executablePath, snapshot.commandLine].filter((value) => typeof value === "string" && value.length > 0).join(" ").replace(/\\/g, "/");
  if (!joined) {
    return false;
  }
  const patterns = [
    /(?:^|[\s"'=\/])openclaw(?:\.cmd|\.ps1)?(?:$|[\s"'])/i,
    /(?:^|[\s"'=\/])openclaw-gateway(?:$|[\s"'])/i,
    /\/node_modules\/\.bin\/openclaw(?:\.cmd|\.ps1)?(?:$|[\s"'])/i,
    /\/node_modules\/openclaw\//i
  ];
  return patterns.some((pattern) => pattern.test(joined));
}
async function pipeStreamToLog(stream, logStream) {
  if (!stream) {
    return;
  }
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value && value.length > 0) {
        logStream.write(Buffer.from(value));
      }
    }
  } finally {
    reader.releaseLock();
  }
}
function spawnDetachedToLog(cmd, options) {
  const proc = Bun.spawn(cmd, {
    stdout: "pipe",
    stderr: "pipe",
    env: options.env,
    cwd: options.cwd
  });
  const logStream = createWriteStream(options.logPath, { flags: "a" });
  observeBackgroundTask({
    label: "process.spawnDetachedToLog",
    metadata: {
      command: cmd.join(" "),
      logPath: options.logPath
    }
  }, Promise.all([
    pipeStreamToLog(proc.stdout, logStream),
    pipeStreamToLog(proc.stderr, logStream),
    proc.exited
  ]).finally(() => {
    logStream.end();
  }), {
    logStart: false,
    logSuccess: false
  });
  proc.unref();
  return proc;
}

// src/lib/runtime-state.ts
async function resolveBinaryPath(instance) {
  return resolveOpenclawBinary(instance);
}
async function hasListeningPidForPort(port, lookup = findListeningPids) {
  try {
    const pids = await lookup(port);
    return pids.length > 0;
  } catch {
    return false;
  }
}
async function isPortListening(port) {
  return hasListeningPidForPort(port);
}
async function readPidFile(instance) {
  try {
    const file = Bun.file(instance.pidPath);
    if (!await file.exists()) {
      return null;
    }
    const value = (await file.text()).trim();
    return value || null;
  } catch {
    return null;
  }
}
function desiredStatus(installed, running, bootstrapping) {
  if (!installed) {
    return "not_installed";
  }
  if (bootstrapping) {
    return "starting";
  }
  return running ? "running" : "stopped";
}
async function probeInstanceRuntime(instance) {
  const binaryPath = await resolveBinaryPath(instance);
  const installed = Boolean(binaryPath);
  const port = installed ? await readInstancePort(instance) ?? instance.gatewayPort : null;
  const running = port ? await isPortListening(port) : false;
  let pid = await readPidFile(instance);
  let pidAlive = isPidAlive(pid);
  if (running && !pidAlive && port) {
    const portPid = (await findListeningPids(port))[0] || null;
    if (portPid && isPidAlive(portPid)) {
      pid = portPid;
      pidAlive = true;
      try {
        await Bun.write(instance.pidPath, `${portPid}
`);
      } catch {}
    }
  }
  const startedAt = running && pidAlive ? await getProcessStartTime(pid) : null;
  const bootstrapping = installed && !running && pidAlive;
  return {
    installed,
    binaryPath,
    port,
    running,
    bootstrapping,
    pid,
    pidAlive,
    startedAt
  };
}
async function reconcileInstanceRuntime(instance, existingRuntime) {
  const runtime = existingRuntime ?? await probeInstanceRuntime(instance);
  const nextStatus = desiredStatus(runtime.installed, runtime.running, runtime.bootstrapping);
  const nextPort = runtime.port;
  if (!runtime.running && !runtime.pidAlive) {
    try {
      rmSync(instance.pidPath, { force: true });
    } catch {}
  }
  if (instance.status !== nextStatus || instance.gatewayPort !== nextPort) {
    updateInstance(instance.id, {
      status: nextStatus,
      gatewayPort: nextPort
    });
  }
}
var reconcileTimer = null;
var reconcileInFlight = false;
async function reconcileAllInstances() {
  if (reconcileInFlight) {
    return;
  }
  reconcileInFlight = true;
  try {
    const instances = listInstances();
    await Promise.all(instances.map((instance) => reconcileInstanceRuntime(instance)));
  } finally {
    reconcileInFlight = false;
  }
}
function startRuntimeReconciler() {
  if (reconcileTimer) {
    return;
  }
  reconcileAllInstances().catch((error) => {
    console.error("[monitor] initial runtime reconciliation failed", error);
  });
  const intervalMs = Number(process.env.MONITOR_RECONCILE_INTERVAL_MS || 30000);
  reconcileTimer = setInterval(() => {
    reconcileAllInstances().catch((error) => {
      console.error("[monitor] runtime reconciliation failed", error);
    });
  }, Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : 30000);
}

// src/lib/dev-config.ts
import { mkdirSync as mkdirSync3 } from "fs";
import { dirname as dirname2 } from "path";
async function ensureDevModeConfig() {
  if (!shouldUseSystemOpenclaw(DEFAULT_INSTANCE_ID)) {
    return;
  }
  const configPath = SYSTEM_OPENCLAW_CONFIG_PATH;
  const configFile = Bun.file(configPath);
  if (!await configFile.exists()) {
    console.log(`[dev-config] System OpenClaw config not found at ${configPath}`);
    return;
  }
  const config = await readLooseConfigFile(configPath);
  const gateway = config.gateway || {};
  const controlUi = gateway.controlUi || {};
  let needsUpdate = false;
  if (!controlUi.enabled) {
    console.log("[dev-config] Adding controlUi.enabled=true");
    controlUi.enabled = true;
    needsUpdate = true;
  }
  if (!controlUi.dangerouslyDisableDeviceAuth) {
    console.log("[dev-config] Adding controlUi.dangerouslyDisableDeviceAuth=true");
    controlUi.dangerouslyDisableDeviceAuth = true;
    needsUpdate = true;
  }
  if (!controlUi.basePath) {
    console.log("[dev-config] Adding controlUi.basePath=/");
    controlUi.basePath = "/";
    needsUpdate = true;
  }
  const allowedOrigins = Array.isArray(controlUi.allowedOrigins) ? controlUi.allowedOrigins : [];
  const devOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://[::1]:3000"
  ];
  for (const origin of devOrigins) {
    if (!allowedOrigins.includes(origin)) {
      console.log(`[dev-config] Adding ${origin} to allowedOrigins`);
      allowedOrigins.push(origin);
      needsUpdate = true;
    }
  }
  if (needsUpdate) {
    controlUi.allowedOrigins = allowedOrigins;
    gateway.controlUi = controlUi;
    config.gateway = gateway;
    mkdirSync3(dirname2(configPath), { recursive: true });
    await Bun.write(configPath, JSON.stringify(config, null, 2));
    console.log(`[dev-config] Updated system OpenClaw config at ${configPath}`);
    console.log("[dev-config] Please restart OpenClaw Gateway for changes to take effect");
  } else {
    console.log("[dev-config] System OpenClaw config is already properly configured");
  }
}

// src/lib/proxy-gateway.ts
import { createHash } from "crypto";

// src/lib/control-ui.ts
import { dirname as dirname3 } from "path";
import { mkdirSync as mkdirSync4 } from "fs";
var configCache = new Map;
var CONFIG_CACHE_TTL_MS = 5000;
function normalizeOriginArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (typeof item !== "string") {
      return [];
    }
    return [item];
  });
}
function activeConfigPath2(instance) {
  return shouldUseSystemOpenclaw(instance.id) ? SYSTEM_OPENCLAW_CONFIG_PATH : instance.configPath;
}
async function readConfigFile(path) {
  const now = Date.now();
  const cached = configCache.get(path);
  if (cached && now - cached.fetchedAt < CONFIG_CACHE_TTL_MS) {
    return cached.config;
  }
  const config = await readLooseConfigFile(path);
  const result = Object.keys(config).length > 0 ? config : null;
  if (result) {
    configCache.set(path, { config: result, fetchedAt: now });
  }
  return result;
}
async function ensureControlUiAllowedOrigins(instance, source) {
  const configPath = activeConfigPath2(instance);
  const configFile = Bun.file(configPath);
  if (!await configFile.exists()) {
    return false;
  }
  const config = await readConfigFile(configPath) || {};
  const gateway = config.gateway || {};
  const controlUi = gateway.controlUi || {};
  const nextAllowedOrigins = ["*"];
  const currentAllowedOrigins = normalizeOriginArray(controlUi.allowedOrigins);
  const unchanged = currentAllowedOrigins.length === 1 && currentAllowedOrigins[0] === "*";
  if (unchanged) {
    return false;
  }
  controlUi.allowedOrigins = nextAllowedOrigins;
  if (!controlUi.dangerouslyDisableDeviceAuth) {
    console.log("[control-ui] Adding dangerouslyDisableDeviceAuth=true to config");
    controlUi.dangerouslyDisableDeviceAuth = true;
  }
  gateway.controlUi = controlUi;
  config.gateway = gateway;
  console.log(`[control-ui] Writing config with controlUi:`, {
    enabled: controlUi.enabled,
    basePath: controlUi.basePath,
    dangerouslyDisableDeviceAuth: controlUi.dangerouslyDisableDeviceAuth,
    allowedOrigins: nextAllowedOrigins
  });
  mkdirSync4(dirname3(configPath), { recursive: true });
  await Bun.write(configPath, JSON.stringify(config, null, 2));
  configCache.delete(configPath);
  return true;
}

// src/lib/proxy-gateway.ts
var RESERVED_SEGMENTS = new Set(["api", "assets"]);
var tokenCache = new Map;
var TOKEN_CACHE_TTL_MS = 30000;
var MAX_PENDING_MESSAGES = 500;
var PENDING_TIMEOUT_MS = 30000;
var HOP_BY_HOP_HEADERS = [
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-length"
];
var WEBSOCKET_INTERNAL_HEADERS = [
  "sec-websocket-extensions",
  "sec-websocket-key",
  "sec-websocket-protocol",
  "sec-websocket-version",
  "sec-websocket-accept"
];
var CONTROL_UI_SETTINGS_KEY = "openclaw.control.settings.v1";
var CONTROL_UI_TOKEN_KEY = "openclaw.control.token.v1";
var CONTROL_UI_TOKEN_PREFIX = "openclaw.control.token.v1:";
var HIDE_VITE_CLIENT_SELECTOR = 'script[src*="/@vite/client"]';
var IS_DEV_ENVIRONMENT = isLikelyDevEnvironment();
var CONTROL_UI_CSP_DEFAULT_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' ws: wss:"
];
function splitPath3(pathname) {
  return pathname.split("/").filter(Boolean);
}
function matchProxyInstanceId(pathname) {
  const baseSegments = splitPath3(MONITOR_BASE_PATH);
  const segments = splitPath3(pathname);
  if (segments.length <= baseSegments.length) {
    return null;
  }
  for (let index = 0;index < baseSegments.length; index += 1) {
    if (segments[index] !== baseSegments[index]) {
      return null;
    }
  }
  const instanceId = segments[baseSegments.length];
  if (!instanceId || RESERVED_SEGMENTS.has(instanceId)) {
    return null;
  }
  return instanceId;
}
function isWebSocketRequest(request) {
  return request.headers.get("upgrade")?.toLowerCase() === "websocket";
}
async function resolveInstance(instanceId) {
  if (instanceId === DEFAULT_INSTANCE_ID) {
    return ensureDefaultInstance();
  }
  return getInstance(instanceId);
}
async function resolveGatewayToken(instance) {
  if (typeof process.env.OPENCLAW_GATEWAY_TOKEN === "string" && process.env.OPENCLAW_GATEWAY_TOKEN.length > 0) {
    return process.env.OPENCLAW_GATEWAY_TOKEN;
  }
  const now = Date.now();
  const cached = tokenCache.get(instance.id);
  if (cached && now - cached.fetchedAt < TOKEN_CACHE_TTL_MS) {
    return cached.token;
  }
  try {
    const config = await readInstanceConfig(instance);
    const gateway = config.gateway || {};
    const auth = gateway.auth || {};
    const token = typeof auth.token === "string" && auth.token.length > 0 ? auth.token : undefined;
    tokenCache.set(instance.id, { token, fetchedAt: now });
    return token;
  } catch {
    return;
  }
}
async function resolveProxyTarget(request) {
  const requestUrl = new URL(request.url);
  const instanceId = matchProxyInstanceId(requestUrl.pathname);
  if (!instanceId) {
    return null;
  }
  const instance = await resolveInstance(instanceId);
  if (!instance) {
    return new Response(`OpenClaw instance not found: ${instanceId}`, { status: 404 });
  }
  await ensureControlUiAllowedOrigins(instance, {
    url: request.url,
    getHeader: (name) => request.headers.get(name)
  });
  const port = await readInstancePort(instance) ?? instance.gatewayPort;
  if (!port) {
    return new Response(`OpenClaw instance is not configured: ${instanceId}`, { status: 502 });
  }
  const authToken = await resolveGatewayToken(instance);
  const requestOrigin = resolveRequestOrigin(request);
  // 方案A: 网关直接 TLS(自签名), 上游代理连接需按 https/wss 并关闭证书校验。
  let secure = false;
  try { const cfg = await readInstanceConfig(instance); secure = !!(cfg?.gateway?.tls?.enabled); } catch {}
  const httpScheme = secure ? "https" : "http";
  const wsScheme = secure ? "wss" : "ws";
  return {
    instance,
    port,
    secure,
    upstreamHttpUrl: new URL(`${requestUrl.pathname}${requestUrl.search}`, `${httpScheme}://127.0.0.1:${port}`),
    upstreamWsUrl: `${wsScheme}://127.0.0.1:${port}${requestUrl.pathname}${requestUrl.search}`,
    requestUrl,
    requestOrigin,
    authToken
  };
}
function forwardedForValue(request, clientIp) {
  const existing = request.headers.get("x-forwarded-for")?.trim();
  if (existing && clientIp) {
    return `${existing}, ${clientIp}`;
  }
  return existing || clientIp || null;
}
function buildBaseProxyHeaders(request, target, clientIp) {
  const requestUrl = new URL(request.url);
  const headers = new Headers(request.headers);
  const forwardedFor = forwardedForValue(request, clientIp);
  headers.set("host", `127.0.0.1:${target.port}`);
  headers.set("x-forwarded-host", target.requestOrigin.host);
  headers.set("x-forwarded-proto", target.requestOrigin.proto);
  headers.set("x-forwarded-port", target.requestOrigin.port);
  headers.set("x-forwarded-prefix", target.instance.proxyBasePath);
  headers.set("x-forwarded-uri", `${requestUrl.pathname}${requestUrl.search}`);
  if (clientIp) {
    headers.set("x-real-ip", clientIp);
  } else {
    headers.delete("x-real-ip");
  }
  if (forwardedFor) {
    headers.set("x-forwarded-for", forwardedFor);
  }
  for (const headerName of HOP_BY_HOP_HEADERS) {
    headers.delete(headerName);
  }
  return headers;
}
function buildProxyRequest(request, target, clientIp) {
  const headers = buildBaseProxyHeaders(request, target, clientIp);
  const init = {
    method: request.method,
    headers,
    redirect: "manual",
    signal: request.signal
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
    init.duplex = "half";
  }
  return new Request(target.upstreamHttpUrl.toString(), init);
}
function rewriteLocationHeader(responseHeaders, upstreamOrigin, requestOrigin) {
  const location = responseHeaders.get("location");
  if (!location) {
    return;
  }
  try {
    const resolved = new URL(location, upstreamOrigin);
    if (resolved.origin !== upstreamOrigin) {
      return;
    }
    const rewritten = new URL(`${resolved.pathname}${resolved.search}${resolved.hash}`, `${requestOrigin}/`);
    responseHeaders.set("location", rewritten.toString());
  } catch {}
}
function controlUiBootstrapScript(proxyBasePath) {
  const serializedBasePath = JSON.stringify(proxyBasePath);
  const serializedSettingsKey = JSON.stringify(CONTROL_UI_SETTINGS_KEY);
  const serializedTokenKey = JSON.stringify(CONTROL_UI_TOKEN_KEY);
  const serializedTokenPrefix = JSON.stringify(CONTROL_UI_TOKEN_PREFIX);
  const serializedViteSelector = JSON.stringify(HIDE_VITE_CLIENT_SELECTOR);
  return [
    "<script>",
    `window.__OPENCLAW_CONTROL_UI_BASE_PATH__ = ${serializedBasePath};`,
    "(() => {",
    IS_DEV_ENVIRONMENT ? [
      "  try {",
      `    const viteSelector = ${serializedViteSelector};`,
      "    const originalQuerySelector = document.querySelector.bind(document);",
      "    document.querySelector = (selector) => {",
      "      if (selector === viteSelector) {",
      "        return null;",
      "      }",
      "      return originalQuerySelector(selector);",
      "    };",
      "  } catch {}"
    ].join("") : "",
    "  try {",
    `    const settingsKey = ${serializedSettingsKey};`,
    "    const raw = window.localStorage.getItem(settingsKey);",
    "    if (raw) {",
    "      try {",
    "        const parsed = JSON.parse(raw);",
    "        if (parsed && typeof parsed === 'object') {",
    "          delete parsed.gatewayUrl;",
    "          delete parsed.token;",
    "          window.localStorage.setItem(settingsKey, JSON.stringify(parsed));",
    "        } else {",
    "          window.localStorage.removeItem(settingsKey);",
    "        }",
    "      } catch {",
    "        window.localStorage.removeItem(settingsKey);",
    "      }",
    "    }",
    "  } catch {}",
    "  try {",
    "    const storage = window.sessionStorage;",
    `    storage.removeItem(${serializedTokenKey});`,
    "    for (let index = storage.length - 1; index >= 0; index -= 1) {",
    "      const key = storage.key(index);",
    `      if (key && key.indexOf(${serializedTokenPrefix}) === 0) {`,
    "        storage.removeItem(key);",
    "      }",
    "    }",
    "  } catch {}",
    "})();",
    "</script>"
  ].join("");
}
function injectControlUiBootstrap(html, proxyBasePath) {
  const script = controlUiBootstrapScript(proxyBasePath);
  if (html.includes('<script type="module"')) {
    return html.replace('<script type="module"', `${script}<script type="module"`);
  }
  if (html.includes("</head>")) {
    return html.replace("</head>", `${script}</head>`);
  }
  return `${script}${html}`;
}
function hasScriptSrcAttribute(openTag) {
  const attributeMatches = openTag.matchAll(/\s([^\s=/>]+)/g);
  for (const match2 of attributeMatches) {
    if (match2[1]?.trim().toLowerCase() === "src") {
      return true;
    }
  }
  return false;
}
function computeInlineScriptHashes(html) {
  const hashes = [];
  const inlineScriptPattern = /<script(?:\s[^>]*)?>([^]*?)<\/script>/gi;
  let match2;
  while ((match2 = inlineScriptPattern.exec(html)) !== null) {
    const openTag = match2[0].slice(0, match2[0].indexOf(">") + 1);
    if (hasScriptSrcAttribute(openTag)) {
      continue;
    }
    const content = match2[1];
    if (!content) {
      continue;
    }
    const hash = createHash("sha256").update(content, "utf8").digest("base64");
    hashes.push(`sha256-${hash}`);
  }
  return hashes;
}
function buildControlUiScriptSrcDirective(inlineScriptHashes) {
  if (inlineScriptHashes.length === 0) {
    return "script-src 'self'";
  }
  return `script-src 'self' ${inlineScriptHashes.map((hash) => `'${hash}'`).join(" ")}`;
}
function rebuildControlUiCspHeader(existingHeader, patchedHtml) {
  const inlineScriptHashes = computeInlineScriptHashes(patchedHtml);
  const scriptSrcDirective = buildControlUiScriptSrcDirective(inlineScriptHashes);
  if (!existingHeader) {
    return [CONTROL_UI_CSP_DEFAULT_DIRECTIVES[0], CONTROL_UI_CSP_DEFAULT_DIRECTIVES[1], CONTROL_UI_CSP_DEFAULT_DIRECTIVES[2], CONTROL_UI_CSP_DEFAULT_DIRECTIVES[3], scriptSrcDirective, ...CONTROL_UI_CSP_DEFAULT_DIRECTIVES.slice(4)].join("; ");
  }
  const directives = existingHeader.split(";").map((entry) => entry.trim()).filter(Boolean);
  const rebuilt = [];
  let replaced = false;
  for (const directive of directives) {
    const [name] = directive.split(/\s+/, 1);
    if (name?.toLowerCase() === "script-src") {
      rebuilt.push(scriptSrcDirective);
      replaced = true;
      continue;
    }
    rebuilt.push(directive);
  }
  if (!replaced) {
    rebuilt.push(scriptSrcDirective);
  }
  return rebuilt.join("; ");
}
function applyPatchedControlUiHeaders(responseHeaders, patchedHtml) {
  const updatedHeaders = new Headers(responseHeaders);
  updatedHeaders.delete("content-length");
  updatedHeaders.set("cache-control", "no-store");
  updatedHeaders.set("content-security-policy", rebuildControlUiCspHeader(updatedHeaders.get("content-security-policy"), patchedHtml));
  return updatedHeaders;
}
function sanitizeCloseReason(reason) {
  const trimmed = reason.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.length > 120 ? trimmed.slice(0, 120) : trimmed;
}
function shouldPatchConnectMessage(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  const record = payload;
  return record.type === "connect" || record.op === "connect" || record.method === "connect";
}
function injectAuthTokenIntoMessage(message, authToken) {
  if (!authToken || typeof message !== "string") {
    return message;
  }
  try {
    const payload = JSON.parse(message);
    if (!shouldPatchConnectMessage(payload)) {
      return message;
    }
    const params = payload.params && typeof payload.params === "object" && !Array.isArray(payload.params) ? payload.params : {};
    const auth = params.auth && typeof params.auth === "object" && !Array.isArray(params.auth) ? params.auth : {};
    if (typeof auth.token === "string" && auth.token.length > 0) {
      return message;
    }
    auth.token = authToken;
    params.auth = auth;
    payload.params = params;
    return JSON.stringify(payload);
  } catch {
    return message;
  }
}
function forwardMessageToUpstream(upstream, message, authToken) {
  upstream.send(injectAuthTokenIntoMessage(message, authToken));
}
async function relayUpstreamMessage(downstream, data) {
  if (typeof data === "string") {
    downstream.send(data);
    return;
  }
  if (data instanceof ArrayBuffer) {
    downstream.send(data);
    return;
  }
  if (ArrayBuffer.isView(data)) {
    downstream.send(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
    return;
  }
  if (data instanceof Blob) {
    downstream.send(await data.arrayBuffer());
    return;
  }
  downstream.send(String(data));
}
function buildWebSocketHeaders(request, target, clientIp) {
  const headers = buildBaseProxyHeaders(request, target, clientIp);
  headers.delete("host");
  for (const headerName of WEBSOCKET_INTERNAL_HEADERS) {
    headers.delete(headerName);
  }
  const serialized = {};
  for (const [key, value] of headers.entries()) {
    serialized[key] = value;
  }
  return serialized;
}
async function maybeProxyHttpRequest(request, clientIp) {
  const target = await resolveProxyTarget(request);
  if (!target) {
    return null;
  }
  if (target instanceof Response) {
    return target;
  }
  try {
    const upstreamResponse = await fetch(buildProxyRequest(request, target, clientIp), target.secure ? { tls: { rejectUnauthorized: false } } : undefined);
    const responseHeaders = new Headers(upstreamResponse.headers);
    rewriteLocationHeader(responseHeaders, target.upstreamHttpUrl.origin, target.requestOrigin.origin);
    const contentType = responseHeaders.get("content-type")?.toLowerCase() || "";
    if (contentType.includes("text/html")) {
      const html = await upstreamResponse.text();
      const patchedHtml = injectControlUiBootstrap(html, target.instance.proxyBasePath);
      const patchedHeaders = applyPatchedControlUiHeaders(responseHeaders, patchedHtml);
      return new Response(patchedHtml, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: patchedHeaders
      });
    }
    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(`OpenClaw upstream request failed: ${message}`, {
      status: 502
    });
  }
}
async function maybeUpgradeProxyWebSocket(request, server, clientIp) {
  if (!isWebSocketRequest(request)) {
    return null;
  }
  const target = await resolveProxyTarget(request);
  if (!target) {
    return null;
  }
  if (target instanceof Response) {
    return target;
  }
  const protocols = request.headers.get("sec-websocket-protocol")?.split(",").map((value) => value.trim()).filter(Boolean);
  const upgraded = server.upgrade(request, {
    data: {
      targetUrl: target.upstreamWsUrl,
      headers: buildWebSocketHeaders(request, target, clientIp),
      protocols: protocols && protocols.length > 0 ? protocols : undefined,
      secure: target.secure,
      authToken: target.authToken,
      pendingMessages: [],
      connectStartedAt: Date.now()
    }
  });
  if (!upgraded) {
    return new Response("OpenClaw WebSocket upgrade failed", { status: 400 });
  }
  return;
}
var proxyWebSocketHandlers = {
  open(downstream) {
    const upstream = new WebSocket(downstream.data.targetUrl, {
      headers: downstream.data.headers,
      protocols: downstream.data.protocols,
      ...(downstream.data.secure ? { tls: { rejectUnauthorized: false } } : {})
    });
    upstream.binaryType = "arraybuffer";
    downstream.data.upstream = upstream;
    upstream.addEventListener("open", () => {
      for (const message of downstream.data.pendingMessages || []) {
        forwardMessageToUpstream(upstream, message, downstream.data.authToken);
      }
      downstream.data.pendingMessages = [];
    });
    upstream.addEventListener("message", (event) => {
      observeBackgroundTask({
        label: "proxy.websocket.relay",
        metadata: {
          targetUrl: downstream.data.targetUrl.toString()
        }
      }, relayUpstreamMessage(downstream, event.data), {
        logStart: false,
        logSuccess: false
      });
    });
    upstream.addEventListener("close", (event) => {
      downstream.data.upstream = undefined;
      if (downstream.readyState === WebSocket.OPEN) {
        downstream.close(event.code || 1000, sanitizeCloseReason(event.reason));
      }
    });
    upstream.addEventListener("error", () => {
      if (downstream.readyState === WebSocket.OPEN) {
        downstream.close(1011, "OpenClaw upstream socket error");
      }
    });
  },
  message(downstream, message) {
    const upstream = downstream.data.upstream;
    if (!upstream) {
      return;
    }
    if (upstream.readyState === WebSocket.CONNECTING) {
      const now = Date.now();
      const connectStartedAt = downstream.data.connectStartedAt || now;
      if (now - connectStartedAt > PENDING_TIMEOUT_MS) {
        console.warn(`[proxy-gateway] Upstream connection timeout (${PENDING_TIMEOUT_MS}ms), closing`);
        downstream.close(1008, "Upstream connection timeout");
        return;
      }
      downstream.data.pendingMessages ||= [];
      if (downstream.data.pendingMessages.length >= MAX_PENDING_MESSAGES) {
        console.warn(`[proxy-gateway] Pending messages queue full (${MAX_PENDING_MESSAGES}), closing`);
        downstream.close(1008, "Pending messages queue overflow");
        return;
      }
      downstream.data.pendingMessages.push(message);
      return;
    }
    if (upstream.readyState !== WebSocket.OPEN) {
      return;
    }
    forwardMessageToUpstream(upstream, message, downstream.data.authToken);
  },
  close(downstream, code, reason) {
    const upstream = downstream.data.upstream;
    downstream.data.upstream = undefined;
    if (!upstream || upstream.readyState >= WebSocket.CLOSING) {
      return;
    }
    upstream.close(code || 1000, sanitizeCloseReason(reason));
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/utils/stream.js
var StreamingApi = class {
  writer;
  encoder;
  writable;
  abortSubscribers = [];
  responseReadable;
  aborted = false;
  closed = false;
  constructor(writable, _readable) {
    this.writable = writable;
    this.writer = writable.getWriter();
    this.encoder = new TextEncoder;
    const reader = _readable.getReader();
    this.abortSubscribers.push(async () => {
      await reader.cancel();
    });
    this.responseReadable = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        done ? controller.close() : controller.enqueue(value);
      },
      cancel: () => {
        this.abort();
      }
    });
  }
  async write(input) {
    try {
      if (typeof input === "string") {
        input = this.encoder.encode(input);
      }
      await this.writer.write(input);
    } catch {}
    return this;
  }
  async writeln(input) {
    await this.write(input + `
`);
    return this;
  }
  sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  async close() {
    try {
      await this.writer.close();
    } catch {}
    this.closed = true;
  }
  async pipe(body) {
    this.writer.releaseLock();
    await body.pipeTo(this.writable, { preventClose: true });
    this.writer = this.writable.getWriter();
  }
  onAbort(listener) {
    this.abortSubscribers.push(listener);
  }
  abort() {
    if (!this.aborted) {
      this.aborted = true;
      this.abortSubscribers.forEach((subscriber) => subscriber());
    }
  }
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/helper/streaming/utils.js
var isOldBunVersion = () => {
  const version = typeof Bun !== "undefined" ? Bun.version : undefined;
  if (version === undefined) {
    return false;
  }
  const result = version.startsWith("1.1") || version.startsWith("1.0") || version.startsWith("0.");
  isOldBunVersion = () => result;
  return result;
};

// ../../node_modules/.pnpm/hono@4.12.9/node_modules/hono/dist/helper/streaming/sse.js
var SSEStreamingApi = class extends StreamingApi {
  constructor(writable, readable) {
    super(writable, readable);
  }
  async writeSSE(message) {
    const data = await resolveCallback(message.data, HtmlEscapedCallbackPhase.Stringify, false, {});
    const dataLines = data.split(/\r\n|\r|\n/).map((line) => {
      return `data: ${line}`;
    }).join(`
`);
    for (const key of ["event", "id", "retry"]) {
      if (message[key] && /[\r\n]/.test(message[key])) {
        throw new Error(`${key} must not contain "\\r" or "\\n"`);
      }
    }
    const sseData = [
      message.event && `event: ${message.event}`,
      dataLines,
      message.id && `id: ${message.id}`,
      message.retry && `retry: ${message.retry}`
    ].filter(Boolean).join(`
`) + `

`;
    await this.write(sseData);
  }
};
var run = async (stream, cb, onError) => {
  try {
    await cb(stream);
  } catch (e) {
    if (e instanceof Error && onError) {
      await onError(e, stream);
      await stream.writeSSE({
        event: "error",
        data: e.message
      });
    } else {
      console.error(e);
    }
  } finally {
    stream.close();
  }
};
var contextStash = /* @__PURE__ */ new WeakMap;
var streamSSE = (c, cb, onError) => {
  const { readable, writable } = new TransformStream;
  const stream = new SSEStreamingApi(writable, readable);
  if (isOldBunVersion()) {
    c.req.raw.signal.addEventListener("abort", () => {
      if (!stream.closed) {
        stream.abort();
      }
    });
  }
  contextStash.set(stream.responseReadable, c);
  c.header("Transfer-Encoding", "chunked");
  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  run(stream, cb, onError);
  return c.newResponse(stream.responseReadable);
};

// src/routes/gateway.ts
import { readdirSync as readdirSync2, statSync } from "fs";
import { join as join2 } from "path";
var app = new Hono2;
var TAIL_READ_BYTES = 64 * 1024;
function findLatestSystemRuntimeLogPath() {
  try {
    const candidates = readdirSync2(SYSTEM_OPENCLAW_RUNTIME_LOG_DIR).filter((entry) => /^openclaw-\d{4}-\d{2}-\d{2}\.log$/.test(entry)).map((entry) => {
      const path = join2(SYSTEM_OPENCLAW_RUNTIME_LOG_DIR, entry);
      return {
        path,
        mtimeMs: statSync(path).mtimeMs
      };
    }).sort((a, b) => b.mtimeMs - a.mtimeMs);
    return candidates[0]?.path ?? null;
  } catch {
    return null;
  }
}
async function resolveGatewayLogPath() {
  const instance = ensureDefaultInstance();
  const managedPath = instance.logPath;
  const managedFile = Bun.file(managedPath);
  if (await managedFile.exists()) {
    return { path: managedPath, source: "managed", exists: true };
  }
  if (shouldUseSystemOpenclaw(instance.id)) {
    const sources = await Promise.all([
      (async () => {
        const file = Bun.file(SYSTEM_OPENCLAW_LOG_PATH);
        if (!await file.exists()) {
          return null;
        }
        return {
          path: SYSTEM_OPENCLAW_LOG_PATH,
          source: "system-wrapper",
          mtimeMs: statSync(SYSTEM_OPENCLAW_LOG_PATH).mtimeMs
        };
      })(),
      (async () => {
        const runtimePath = findLatestSystemRuntimeLogPath();
        if (!runtimePath) {
          return null;
        }
        const file = Bun.file(runtimePath);
        if (!await file.exists()) {
          return null;
        }
        return {
          path: runtimePath,
          source: "system-runtime",
          mtimeMs: statSync(runtimePath).mtimeMs
        };
      })()
    ]);
    const bestSource = sources.filter((candidate) => candidate !== null).sort((a, b) => b.mtimeMs - a.mtimeMs)[0];
    if (bestSource) {
      return { path: bestSource.path, source: bestSource.source, exists: true };
    }
  }
  return {
    path: managedPath,
    source: "managed",
    exists: false
  };
}
async function readTailLines(logPath, maxLines) {
  let fileSize;
  try {
    fileSize = statSync(logPath).size;
  } catch {
    return [];
  }
  if (fileSize === 0) {
    return [];
  }
  const readStart = Math.max(0, fileSize - TAIL_READ_BYTES);
  const chunk = await Bun.file(logPath).slice(readStart, fileSize).text();
  const lines = chunk.split(`
`).filter((line) => line.trim());
  if (readStart > 0 && lines.length > 0) {
    lines.shift();
  }
  return lines.slice(-maxLines);
}
app.get("/logs", async (c) => {
  const abortSignal = c.req.raw.signal;
  return streamSSE(c, async (stream2) => {
    const instance = ensureDefaultInstance();
    const { path: logPath, source, exists } = await resolveGatewayLogPath();
    if (exists) {
      const lines = await readTailLines(logPath, 100);
      for (const line of lines) {
        if (abortSignal.aborted)
          return;
        await stream2.writeSSE({ data: line, event: "log" });
      }
    } else {
      const systemManaged = shouldUseSystemOpenclaw(instance.id);
      const missingMessage = systemManaged ? `[monitor] No gateway log file found. Checked managed log ${instance.logPath}, system wrapper log ${SYSTEM_OPENCLAW_LOG_PATH}, and runtime logs under ${SYSTEM_OPENCLAW_RUNTIME_LOG_DIR}.` : `[monitor] No gateway log file at ${logPath} yet. Logs will appear after monitor starts the managed gateway and the file is created.`;
      await stream2.writeSSE({ data: missingMessage, event: "log" });
    }
    if (source === "system-wrapper") {
      await stream2.writeSSE({
        data: `[monitor] Streaming system gateway wrapper log from ${logPath}.`,
        event: "log"
      });
    } else if (source === "system-runtime") {
      await stream2.writeSSE({
        data: `[monitor] Streaming system OpenClaw runtime log from ${logPath}.`,
        event: "log"
      });
    }
    let position = exists ? statSync(logPath).size : 0;
    let buffer = "";
    const heartbeat = setInterval(async () => {
      try {
        if (abortSignal.aborted) {
          clearInterval(heartbeat);
          return;
        }
        await stream2.writeSSE({ data: "", event: "heartbeat" });
      } catch {
        clearInterval(heartbeat);
      }
    }, 5000);
    try {
      while (!abortSignal.aborted) {
        await new Promise((resolve2) => setTimeout(resolve2, 1000));
        if (abortSignal.aborted)
          break;
        let size = 0;
        try {
          size = statSync(logPath).size;
        } catch {
          continue;
        }
        if (size < position) {
          position = 0;
          buffer = "";
        }
        if (size === position) {
          continue;
        }
        const chunk = await Bun.file(logPath).slice(position, size).text();
        position = size;
        buffer += chunk;
        const lines = buffer.split(`
`);
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (abortSignal.aborted)
            break;
          if (line.trim()) {
            await stream2.writeSSE({ data: line, event: "log" });
          }
        }
      }
    } catch {} finally {
      clearInterval(heartbeat);
    }
  });
});
var gateway_default = app;

// src/routes/install.ts
import { mkdirSync as mkdirSync7, readFileSync as readFileSync8, rmSync as rmSync3 } from "fs";

// src/lib/channels.ts
import { existsSync as existsSync4, mkdirSync as mkdirSync5, readFileSync as readFileSync5 } from "fs";
import { rm } from "fs/promises";

// ../../node_modules/.pnpm/lru-cache@11.2.7/node_modules/lru-cache/dist/esm/index.min.js
var x = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date;
var I = new Set;
var R = typeof process == "object" && process ? process : {};
var U = (c, t, e, i) => {
  typeof R.emitWarning == "function" ? R.emitWarning(c, t, e, i) : console.error(`[${e}] ${t}: ${c}`);
};
var C = globalThis.AbortController;
var D = globalThis.AbortSignal;
if (typeof C > "u") {
  D = class {
    onabort;
    _onabort = [];
    reason;
    aborted = false;
    addEventListener(i, s) {
      this._onabort.push(s);
    }
  }, C = class {
    constructor() {
      t();
    }
    signal = new D;
    abort(i) {
      if (!this.signal.aborted) {
        this.signal.reason = i, this.signal.aborted = true;
        for (let s of this.signal._onabort)
          s(i);
        this.signal.onabort?.(i);
      }
    }
  };
  let c = R.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", t = () => {
    c && (c = false, U("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", t));
  };
}
var G = (c) => !I.has(c);
var H = Symbol("type");
var y = (c) => c && c === Math.floor(c) && c > 0 && isFinite(c);
var M = (c) => y(c) ? c <= Math.pow(2, 8) ? Uint8Array : c <= Math.pow(2, 16) ? Uint16Array : c <= Math.pow(2, 32) ? Uint32Array : c <= Number.MAX_SAFE_INTEGER ? z : null : null;
var z = class extends Array {
  constructor(t) {
    super(t), this.fill(0);
  }
};
var W = class c {
  heap;
  length;
  static #o = false;
  static create(t) {
    let e = M(t);
    if (!e)
      return [];
    c.#o = true;
    let i = new c(t, e);
    return c.#o = false, i;
  }
  constructor(t, e) {
    if (!c.#o)
      throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new e(t), this.length = 0;
  }
  push(t) {
    this.heap[this.length++] = t;
  }
  pop() {
    return this.heap[--this.length];
  }
};
var L = class c2 {
  #o;
  #c;
  #w;
  #C;
  #S;
  #L;
  #I;
  #m;
  get perf() {
    return this.#m;
  }
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  #n;
  #_;
  #s;
  #i;
  #t;
  #a;
  #u;
  #l;
  #h;
  #b;
  #r;
  #y;
  #A;
  #d;
  #g;
  #T;
  #v;
  #f;
  #U;
  static unsafeExposeInternals(t) {
    return { starts: t.#A, ttls: t.#d, autopurgeTimers: t.#g, sizes: t.#y, keyMap: t.#s, keyList: t.#i, valList: t.#t, next: t.#a, prev: t.#u, get head() {
      return t.#l;
    }, get tail() {
      return t.#h;
    }, free: t.#b, isBackgroundFetch: (e) => t.#e(e), backgroundFetch: (e, i, s, n) => t.#G(e, i, s, n), moveToTail: (e) => t.#D(e), indexes: (e) => t.#F(e), rindexes: (e) => t.#O(e), isStale: (e) => t.#p(e) };
  }
  get max() {
    return this.#o;
  }
  get maxSize() {
    return this.#c;
  }
  get calculatedSize() {
    return this.#_;
  }
  get size() {
    return this.#n;
  }
  get fetchMethod() {
    return this.#L;
  }
  get memoMethod() {
    return this.#I;
  }
  get dispose() {
    return this.#w;
  }
  get onInsert() {
    return this.#C;
  }
  get disposeAfter() {
    return this.#S;
  }
  constructor(t) {
    let { max: e = 0, ttl: i, ttlResolution: s = 1, ttlAutopurge: n, updateAgeOnGet: o, updateAgeOnHas: h, allowStale: r, dispose: a, onInsert: w, disposeAfter: f, noDisposeOnSet: d, noUpdateTTL: g, maxSize: A = 0, maxEntrySize: p = 0, sizeCalculation: _, fetchMethod: l, memoMethod: S, noDeleteOnFetchRejection: b, noDeleteOnStaleGet: m, allowStaleOnFetchRejection: u, allowStaleOnFetchAbort: T, ignoreFetchAbort: F, perf: v } = t;
    if (v !== undefined && typeof v?.now != "function")
      throw new TypeError("perf option must have a now() method if specified");
    if (this.#m = v ?? x, e !== 0 && !y(e))
      throw new TypeError("max option must be a nonnegative integer");
    let O = e ? M(e) : Array;
    if (!O)
      throw new Error("invalid max value: " + e);
    if (this.#o = e, this.#c = A, this.maxEntrySize = p || this.#c, this.sizeCalculation = _, this.sizeCalculation) {
      if (!this.#c && !this.maxEntrySize)
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function")
        throw new TypeError("sizeCalculation set to non-function");
    }
    if (S !== undefined && typeof S != "function")
      throw new TypeError("memoMethod must be a function if defined");
    if (this.#I = S, l !== undefined && typeof l != "function")
      throw new TypeError("fetchMethod must be a function if specified");
    if (this.#L = l, this.#v = !!l, this.#s = new Map, this.#i = new Array(e).fill(undefined), this.#t = new Array(e).fill(undefined), this.#a = new O(e), this.#u = new O(e), this.#l = 0, this.#h = 0, this.#b = W.create(e), this.#n = 0, this.#_ = 0, typeof a == "function" && (this.#w = a), typeof w == "function" && (this.#C = w), typeof f == "function" ? (this.#S = f, this.#r = []) : (this.#S = undefined, this.#r = undefined), this.#T = !!this.#w, this.#U = !!this.#C, this.#f = !!this.#S, this.noDisposeOnSet = !!d, this.noUpdateTTL = !!g, this.noDeleteOnFetchRejection = !!b, this.allowStaleOnFetchRejection = !!u, this.allowStaleOnFetchAbort = !!T, this.ignoreFetchAbort = !!F, this.maxEntrySize !== 0) {
      if (this.#c !== 0 && !y(this.#c))
        throw new TypeError("maxSize must be a positive integer if specified");
      if (!y(this.maxEntrySize))
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      this.#B();
    }
    if (this.allowStale = !!r, this.noDeleteOnStaleGet = !!m, this.updateAgeOnGet = !!o, this.updateAgeOnHas = !!h, this.ttlResolution = y(s) || s === 0 ? s : 1, this.ttlAutopurge = !!n, this.ttl = i || 0, this.ttl) {
      if (!y(this.ttl))
        throw new TypeError("ttl must be a positive integer if specified");
      this.#j();
    }
    if (this.#o === 0 && this.ttl === 0 && this.#c === 0)
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.#o && !this.#c) {
      let E = "LRU_CACHE_UNBOUNDED";
      G(E) && (I.add(E), U("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", E, c2));
    }
  }
  getRemainingTTL(t) {
    return this.#s.has(t) ? 1 / 0 : 0;
  }
  #j() {
    let t = new z(this.#o), e = new z(this.#o);
    this.#d = t, this.#A = e;
    let i = this.ttlAutopurge ? new Array(this.#o) : undefined;
    this.#g = i, this.#N = (h, r, a = this.#m.now()) => {
      e[h] = r !== 0 ? a : 0, t[h] = r, s(h, r);
    }, this.#R = (h) => {
      e[h] = t[h] !== 0 ? this.#m.now() : 0, s(h, t[h]);
    };
    let s = this.ttlAutopurge ? (h, r) => {
      if (i?.[h] && (clearTimeout(i[h]), i[h] = undefined), r && r !== 0 && i) {
        let a = setTimeout(() => {
          this.#p(h) && this.#E(this.#i[h], "expire");
        }, r + 1);
        a.unref && a.unref(), i[h] = a;
      }
    } : () => {};
    this.#z = (h, r) => {
      if (t[r]) {
        let a = t[r], w = e[r];
        if (!a || !w)
          return;
        h.ttl = a, h.start = w, h.now = n || o();
        let f = h.now - w;
        h.remainingTTL = a - f;
      }
    };
    let n = 0, o = () => {
      let h = this.#m.now();
      if (this.ttlResolution > 0) {
        n = h;
        let r = setTimeout(() => n = 0, this.ttlResolution);
        r.unref && r.unref();
      }
      return h;
    };
    this.getRemainingTTL = (h) => {
      let r = this.#s.get(h);
      if (r === undefined)
        return 0;
      let a = t[r], w = e[r];
      if (!a || !w)
        return 1 / 0;
      let f = (n || o()) - w;
      return a - f;
    }, this.#p = (h) => {
      let r = e[h], a = t[h];
      return !!a && !!r && (n || o()) - r > a;
    };
  }
  #R = () => {};
  #z = () => {};
  #N = () => {};
  #p = () => false;
  #B() {
    let t = new z(this.#o);
    this.#_ = 0, this.#y = t, this.#W = (e) => {
      this.#_ -= t[e], t[e] = 0;
    }, this.#P = (e, i, s, n) => {
      if (this.#e(i))
        return 0;
      if (!y(s))
        if (n) {
          if (typeof n != "function")
            throw new TypeError("sizeCalculation must be a function");
          if (s = n(i, e), !y(s))
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        } else
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      return s;
    }, this.#M = (e, i, s) => {
      if (t[e] = i, this.#c) {
        let n = this.#c - t[e];
        for (;this.#_ > n; )
          this.#x(true);
      }
      this.#_ += t[e], s && (s.entrySize = i, s.totalCalculatedSize = this.#_);
    };
  }
  #W = (t) => {};
  #M = (t, e, i) => {};
  #P = (t, e, i, s) => {
    if (i || s)
      throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    return 0;
  };
  *#F({ allowStale: t = this.allowStale } = {}) {
    if (this.#n)
      for (let e = this.#h;!(!this.#H(e) || ((t || !this.#p(e)) && (yield e), e === this.#l)); )
        e = this.#u[e];
  }
  *#O({ allowStale: t = this.allowStale } = {}) {
    if (this.#n)
      for (let e = this.#l;!(!this.#H(e) || ((t || !this.#p(e)) && (yield e), e === this.#h)); )
        e = this.#a[e];
  }
  #H(t) {
    return t !== undefined && this.#s.get(this.#i[t]) === t;
  }
  *entries() {
    for (let t of this.#F())
      this.#t[t] !== undefined && this.#i[t] !== undefined && !this.#e(this.#t[t]) && (yield [this.#i[t], this.#t[t]]);
  }
  *rentries() {
    for (let t of this.#O())
      this.#t[t] !== undefined && this.#i[t] !== undefined && !this.#e(this.#t[t]) && (yield [this.#i[t], this.#t[t]]);
  }
  *keys() {
    for (let t of this.#F()) {
      let e = this.#i[t];
      e !== undefined && !this.#e(this.#t[t]) && (yield e);
    }
  }
  *rkeys() {
    for (let t of this.#O()) {
      let e = this.#i[t];
      e !== undefined && !this.#e(this.#t[t]) && (yield e);
    }
  }
  *values() {
    for (let t of this.#F())
      this.#t[t] !== undefined && !this.#e(this.#t[t]) && (yield this.#t[t]);
  }
  *rvalues() {
    for (let t of this.#O())
      this.#t[t] !== undefined && !this.#e(this.#t[t]) && (yield this.#t[t]);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "LRUCache";
  find(t, e = {}) {
    for (let i of this.#F()) {
      let s = this.#t[i], n = this.#e(s) ? s.__staleWhileFetching : s;
      if (n !== undefined && t(n, this.#i[i], this))
        return this.get(this.#i[i], e);
    }
  }
  forEach(t, e = this) {
    for (let i of this.#F()) {
      let s = this.#t[i], n = this.#e(s) ? s.__staleWhileFetching : s;
      n !== undefined && t.call(e, n, this.#i[i], this);
    }
  }
  rforEach(t, e = this) {
    for (let i of this.#O()) {
      let s = this.#t[i], n = this.#e(s) ? s.__staleWhileFetching : s;
      n !== undefined && t.call(e, n, this.#i[i], this);
    }
  }
  purgeStale() {
    let t = false;
    for (let e of this.#O({ allowStale: true }))
      this.#p(e) && (this.#E(this.#i[e], "expire"), t = true);
    return t;
  }
  info(t) {
    let e = this.#s.get(t);
    if (e === undefined)
      return;
    let i = this.#t[e], s = this.#e(i) ? i.__staleWhileFetching : i;
    if (s === undefined)
      return;
    let n = { value: s };
    if (this.#d && this.#A) {
      let o = this.#d[e], h = this.#A[e];
      if (o && h) {
        let r = o - (this.#m.now() - h);
        n.ttl = r, n.start = Date.now();
      }
    }
    return this.#y && (n.size = this.#y[e]), n;
  }
  dump() {
    let t = [];
    for (let e of this.#F({ allowStale: true })) {
      let i = this.#i[e], s = this.#t[e], n = this.#e(s) ? s.__staleWhileFetching : s;
      if (n === undefined || i === undefined)
        continue;
      let o = { value: n };
      if (this.#d && this.#A) {
        o.ttl = this.#d[e];
        let h = this.#m.now() - this.#A[e];
        o.start = Math.floor(Date.now() - h);
      }
      this.#y && (o.size = this.#y[e]), t.unshift([i, o]);
    }
    return t;
  }
  load(t) {
    this.clear();
    for (let [e, i] of t) {
      if (i.start) {
        let s = Date.now() - i.start;
        i.start = this.#m.now() - s;
      }
      this.set(e, i.value, i);
    }
  }
  set(t, e, i = {}) {
    if (e === undefined)
      return this.delete(t), this;
    let { ttl: s = this.ttl, start: n, noDisposeOnSet: o = this.noDisposeOnSet, sizeCalculation: h = this.sizeCalculation, status: r } = i, { noUpdateTTL: a = this.noUpdateTTL } = i, w = this.#P(t, e, i.size || 0, h);
    if (this.maxEntrySize && w > this.maxEntrySize)
      return r && (r.set = "miss", r.maxEntrySizeExceeded = true), this.#E(t, "set"), this;
    let f = this.#n === 0 ? undefined : this.#s.get(t);
    if (f === undefined)
      f = this.#n === 0 ? this.#h : this.#b.length !== 0 ? this.#b.pop() : this.#n === this.#o ? this.#x(false) : this.#n, this.#i[f] = t, this.#t[f] = e, this.#s.set(t, f), this.#a[this.#h] = f, this.#u[f] = this.#h, this.#h = f, this.#n++, this.#M(f, w, r), r && (r.set = "add"), a = false, this.#U && this.#C?.(e, t, "add");
    else {
      this.#D(f);
      let d = this.#t[f];
      if (e !== d) {
        if (this.#v && this.#e(d)) {
          d.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: g } = d;
          g !== undefined && !o && (this.#T && this.#w?.(g, t, "set"), this.#f && this.#r?.push([g, t, "set"]));
        } else
          o || (this.#T && this.#w?.(d, t, "set"), this.#f && this.#r?.push([d, t, "set"]));
        if (this.#W(f), this.#M(f, w, r), this.#t[f] = e, r) {
          r.set = "replace";
          let g = d && this.#e(d) ? d.__staleWhileFetching : d;
          g !== undefined && (r.oldValue = g);
        }
      } else
        r && (r.set = "update");
      this.#U && this.onInsert?.(e, t, e === d ? "update" : "replace");
    }
    if (s !== 0 && !this.#d && this.#j(), this.#d && (a || this.#N(f, s, n), r && this.#z(r, f)), !o && this.#f && this.#r) {
      let d = this.#r, g;
      for (;g = d?.shift(); )
        this.#S?.(...g);
    }
    return this;
  }
  pop() {
    try {
      for (;this.#n; ) {
        let t = this.#t[this.#l];
        if (this.#x(true), this.#e(t)) {
          if (t.__staleWhileFetching)
            return t.__staleWhileFetching;
        } else if (t !== undefined)
          return t;
      }
    } finally {
      if (this.#f && this.#r) {
        let t = this.#r, e;
        for (;e = t?.shift(); )
          this.#S?.(...e);
      }
    }
  }
  #x(t) {
    let e = this.#l, i = this.#i[e], s = this.#t[e];
    return this.#v && this.#e(s) ? s.__abortController.abort(new Error("evicted")) : (this.#T || this.#f) && (this.#T && this.#w?.(s, i, "evict"), this.#f && this.#r?.push([s, i, "evict"])), this.#W(e), this.#g?.[e] && (clearTimeout(this.#g[e]), this.#g[e] = undefined), t && (this.#i[e] = undefined, this.#t[e] = undefined, this.#b.push(e)), this.#n === 1 ? (this.#l = this.#h = 0, this.#b.length = 0) : this.#l = this.#a[e], this.#s.delete(i), this.#n--, e;
  }
  has(t, e = {}) {
    let { updateAgeOnHas: i = this.updateAgeOnHas, status: s } = e, n = this.#s.get(t);
    if (n !== undefined) {
      let o = this.#t[n];
      if (this.#e(o) && o.__staleWhileFetching === undefined)
        return false;
      if (this.#p(n))
        s && (s.has = "stale", this.#z(s, n));
      else
        return i && this.#R(n), s && (s.has = "hit", this.#z(s, n)), true;
    } else
      s && (s.has = "miss");
    return false;
  }
  peek(t, e = {}) {
    let { allowStale: i = this.allowStale } = e, s = this.#s.get(t);
    if (s === undefined || !i && this.#p(s))
      return;
    let n = this.#t[s];
    return this.#e(n) ? n.__staleWhileFetching : n;
  }
  #G(t, e, i, s) {
    let n = e === undefined ? undefined : this.#t[e];
    if (this.#e(n))
      return n;
    let o = new C, { signal: h } = i;
    h?.addEventListener("abort", () => o.abort(h.reason), { signal: o.signal });
    let r = { signal: o.signal, options: i, context: s }, a = (p, _ = false) => {
      let { aborted: l } = o.signal, S = i.ignoreFetchAbort && p !== undefined, b = i.ignoreFetchAbort || !!(i.allowStaleOnFetchAbort && p !== undefined);
      if (i.status && (l && !_ ? (i.status.fetchAborted = true, i.status.fetchError = o.signal.reason, S && (i.status.fetchAbortIgnored = true)) : i.status.fetchResolved = true), l && !S && !_)
        return f(o.signal.reason, b);
      let m = g, u = this.#t[e];
      return (u === g || S && _ && u === undefined) && (p === undefined ? m.__staleWhileFetching !== undefined ? this.#t[e] = m.__staleWhileFetching : this.#E(t, "fetch") : (i.status && (i.status.fetchUpdated = true), this.set(t, p, r.options))), p;
    }, w = (p) => (i.status && (i.status.fetchRejected = true, i.status.fetchError = p), f(p, false)), f = (p, _) => {
      let { aborted: l } = o.signal, S = l && i.allowStaleOnFetchAbort, b = S || i.allowStaleOnFetchRejection, m = b || i.noDeleteOnFetchRejection, u = g;
      if (this.#t[e] === g && (!m || !_ && u.__staleWhileFetching === undefined ? this.#E(t, "fetch") : S || (this.#t[e] = u.__staleWhileFetching)), b)
        return i.status && u.__staleWhileFetching !== undefined && (i.status.returnedStale = true), u.__staleWhileFetching;
      if (u.__returned === u)
        throw p;
    }, d = (p, _) => {
      let l = this.#L?.(t, n, r);
      l && l instanceof Promise && l.then((S) => p(S === undefined ? undefined : S), _), o.signal.addEventListener("abort", () => {
        (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) && (p(undefined), i.allowStaleOnFetchAbort && (p = (S) => a(S, true)));
      });
    };
    i.status && (i.status.fetchDispatched = true);
    let g = new Promise(d).then(a, w), A = Object.assign(g, { __abortController: o, __staleWhileFetching: n, __returned: undefined });
    return e === undefined ? (this.set(t, A, { ...r.options, status: undefined }), e = this.#s.get(t)) : this.#t[e] = A, A;
  }
  #e(t) {
    if (!this.#v)
      return false;
    let e = t;
    return !!e && e instanceof Promise && e.hasOwnProperty("__staleWhileFetching") && e.__abortController instanceof C;
  }
  async fetch(t, e = {}) {
    let { allowStale: i = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: n = this.noDeleteOnStaleGet, ttl: o = this.ttl, noDisposeOnSet: h = this.noDisposeOnSet, size: r = 0, sizeCalculation: a = this.sizeCalculation, noUpdateTTL: w = this.noUpdateTTL, noDeleteOnFetchRejection: f = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: d = this.allowStaleOnFetchRejection, ignoreFetchAbort: g = this.ignoreFetchAbort, allowStaleOnFetchAbort: A = this.allowStaleOnFetchAbort, context: p, forceRefresh: _ = false, status: l, signal: S } = e;
    if (!this.#v)
      return l && (l.fetch = "get"), this.get(t, { allowStale: i, updateAgeOnGet: s, noDeleteOnStaleGet: n, status: l });
    let b = { allowStale: i, updateAgeOnGet: s, noDeleteOnStaleGet: n, ttl: o, noDisposeOnSet: h, size: r, sizeCalculation: a, noUpdateTTL: w, noDeleteOnFetchRejection: f, allowStaleOnFetchRejection: d, allowStaleOnFetchAbort: A, ignoreFetchAbort: g, status: l, signal: S }, m = this.#s.get(t);
    if (m === undefined) {
      l && (l.fetch = "miss");
      let u = this.#G(t, m, b, p);
      return u.__returned = u;
    } else {
      let u = this.#t[m];
      if (this.#e(u)) {
        let E = i && u.__staleWhileFetching !== undefined;
        return l && (l.fetch = "inflight", E && (l.returnedStale = true)), E ? u.__staleWhileFetching : u.__returned = u;
      }
      let T = this.#p(m);
      if (!_ && !T)
        return l && (l.fetch = "hit"), this.#D(m), s && this.#R(m), l && this.#z(l, m), u;
      let F = this.#G(t, m, b, p), O = F.__staleWhileFetching !== undefined && i;
      return l && (l.fetch = T ? "stale" : "refresh", O && T && (l.returnedStale = true)), O ? F.__staleWhileFetching : F.__returned = F;
    }
  }
  async forceFetch(t, e = {}) {
    let i = await this.fetch(t, e);
    if (i === undefined)
      throw new Error("fetch() returned undefined");
    return i;
  }
  memo(t, e = {}) {
    let i = this.#I;
    if (!i)
      throw new Error("no memoMethod provided to constructor");
    let { context: s, forceRefresh: n, ...o } = e, h = this.get(t, o);
    if (!n && h !== undefined)
      return h;
    let r = i(t, h, { options: o, context: s });
    return this.set(t, r, o), r;
  }
  get(t, e = {}) {
    let { allowStale: i = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: n = this.noDeleteOnStaleGet, status: o } = e, h = this.#s.get(t);
    if (h !== undefined) {
      let r = this.#t[h], a = this.#e(r);
      return o && this.#z(o, h), this.#p(h) ? (o && (o.get = "stale"), a ? (o && i && r.__staleWhileFetching !== undefined && (o.returnedStale = true), i ? r.__staleWhileFetching : undefined) : (n || this.#E(t, "expire"), o && i && (o.returnedStale = true), i ? r : undefined)) : (o && (o.get = "hit"), a ? r.__staleWhileFetching : (this.#D(h), s && this.#R(h), r));
    } else
      o && (o.get = "miss");
  }
  #k(t, e) {
    this.#u[e] = t, this.#a[t] = e;
  }
  #D(t) {
    t !== this.#h && (t === this.#l ? this.#l = this.#a[t] : this.#k(this.#u[t], this.#a[t]), this.#k(this.#h, t), this.#h = t);
  }
  delete(t) {
    return this.#E(t, "delete");
  }
  #E(t, e) {
    let i = false;
    if (this.#n !== 0) {
      let s = this.#s.get(t);
      if (s !== undefined)
        if (this.#g?.[s] && (clearTimeout(this.#g?.[s]), this.#g[s] = undefined), i = true, this.#n === 1)
          this.#V(e);
        else {
          this.#W(s);
          let n = this.#t[s];
          if (this.#e(n) ? n.__abortController.abort(new Error("deleted")) : (this.#T || this.#f) && (this.#T && this.#w?.(n, t, e), this.#f && this.#r?.push([n, t, e])), this.#s.delete(t), this.#i[s] = undefined, this.#t[s] = undefined, s === this.#h)
            this.#h = this.#u[s];
          else if (s === this.#l)
            this.#l = this.#a[s];
          else {
            let o = this.#u[s];
            this.#a[o] = this.#a[s];
            let h = this.#a[s];
            this.#u[h] = this.#u[s];
          }
          this.#n--, this.#b.push(s);
        }
    }
    if (this.#f && this.#r?.length) {
      let s = this.#r, n;
      for (;n = s?.shift(); )
        this.#S?.(...n);
    }
    return i;
  }
  clear() {
    return this.#V("delete");
  }
  #V(t) {
    for (let e of this.#O({ allowStale: true })) {
      let i = this.#t[e];
      if (this.#e(i))
        i.__abortController.abort(new Error("deleted"));
      else {
        let s = this.#i[e];
        this.#T && this.#w?.(i, s, t), this.#f && this.#r?.push([i, s, t]);
      }
    }
    if (this.#s.clear(), this.#t.fill(undefined), this.#i.fill(undefined), this.#d && this.#A) {
      this.#d.fill(0), this.#A.fill(0);
      for (let e of this.#g ?? [])
        e !== undefined && clearTimeout(e);
      this.#g?.fill(undefined);
    }
    if (this.#y && this.#y.fill(0), this.#l = 0, this.#h = 0, this.#b.length = 0, this.#_ = 0, this.#n = 0, this.#f && this.#r) {
      let e = this.#r, i;
      for (;i = e?.shift(); )
        this.#S?.(...i);
    }
  }
};

// src/lib/channels.ts
import { homedir as homedir3 } from "os";
import { join as join5 } from "path";
import { isDeepStrictEqual } from "util";

// src/lib/cli-json.ts
function isLikelyJsonStart(source, index) {
  const start = source[index];
  if (start !== "{" && start !== "[") {
    return false;
  }
  let cursor = index + 1;
  while (cursor < source.length && /\s/.test(source[cursor])) {
    cursor += 1;
  }
  if (cursor >= source.length) {
    return false;
  }
  const next = source[cursor];
  if (start === "{") {
    return next === '"' || next === "}";
  }
  return next === "{" || next === "[" || next === '"' || next === "]" || next === "-" || /[0-9tfn]/.test(next);
}
function findJsonEnd(source, startIndex) {
  const start = source[startIndex];
  if (start !== "{" && start !== "[") {
    return -1;
  }
  const stack = [start];
  let inString = false;
  let escaping = false;
  for (let index = startIndex + 1;index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaping) {
        escaping = false;
        continue;
      }
      if (char === "\\") {
        escaping = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{" || char === "[") {
      stack.push(char);
      continue;
    }
    if (char === "}" || char === "]") {
      const expected = char === "}" ? "{" : "[";
      if (stack[stack.length - 1] !== expected) {
        return -1;
      }
      stack.pop();
      if (stack.length === 0) {
        return index;
      }
    }
  }
  return -1;
}
function parseJsonFromCommandOutput(stdout) {
  const trimmed = stdout.trim();
  if (!trimmed) {
    throw new Error("Command returned empty output");
  }
  try {
    return JSON.parse(trimmed);
  } catch {}
  for (let index = 0;index < stdout.length; index += 1) {
    if (!isLikelyJsonStart(stdout, index)) {
      continue;
    }
    const endIndex = findJsonEnd(stdout, index);
    if (endIndex < index) {
      continue;
    }
    const candidate = stdout.slice(index, endIndex + 1).trim();
    try {
      return JSON.parse(candidate);
    } catch {}
  }
  throw new Error("Invalid JSON payload in command output");
}

// src/lib/openclaw-cli-policy.ts
var OPENCLAW_CLI_DEFAULT_STDOUT_BYTES = 2 * 1024 * 1024;
var OPENCLAW_CLI_DEFAULT_STDERR_BYTES = 512 * 1024;
var OPENCLAW_CLI_SMALL_STDOUT_BYTES = 16 * 1024;
var OPENCLAW_CLI_SMALL_STDERR_BYTES = 16 * 1024;
var OPENCLAW_CLI_POLICIES = {
  "status.version": {
    key: "status.version",
    tag: "status.version",
    description: "Read OpenClaw version for instance status",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_SMALL_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_SMALL_STDERR_BYTES
  },
  "install.version": {
    key: "install.version",
    tag: "install.version",
    description: "Read OpenClaw version during install flow",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_SMALL_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_SMALL_STDERR_BYTES
  },
  "models.config.set": {
    key: "models.config.set",
    tag: "models.config.set",
    description: "Write models provider config",
    actionClass: "mutation",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "models.config.unset": {
    key: "models.config.unset",
    tag: "models.config.unset",
    description: "Remove models provider config",
    actionClass: "mutation",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "models.config.validate": {
    key: "models.config.validate",
    tag: "models.config.validate",
    description: "Validate models config",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "models.catalog.refresh": {
    key: "models.catalog.refresh",
    tag: "models.catalog.refresh",
    description: "Refresh models catalog snapshot",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "channels.config.set": {
    key: "channels.config.set",
    tag: "channels.config.set",
    description: "Write channels config",
    actionClass: "mutation",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "channels.config.validate": {
    key: "channels.config.validate",
    tag: "channels.config.validate",
    description: "Validate channels config",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "channels.plugins.info": {
    key: "channels.plugins.info",
    tag: "channels.plugins.info",
    description: "Inspect a single plugin",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "channels.plugins.list": {
    key: "channels.plugins.list",
    tag: "channels.plugins.list",
    description: "List installed plugins",
    actionClass: "query",
    timeoutMs: 60000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  },
  "channels.plugins.lifecycle": {
    key: "channels.plugins.lifecycle",
    tag: "channels.plugins.lifecycle",
    description: "Install or reinstall a plugin",
    actionClass: "lifecycle",
    timeoutMs: 120000,
    maxStdoutBytes: OPENCLAW_CLI_DEFAULT_STDOUT_BYTES,
    maxStderrBytes: OPENCLAW_CLI_DEFAULT_STDERR_BYTES
  }
};
function getOpenclawCliPolicy(key) {
  return OPENCLAW_CLI_POLICIES[key];
}
// ../../packages/fn-process-governor/src/runner.ts
async function collectStream(stream2, maxBytes, onOverflow) {
  if (!stream2) {
    return {
      text: "",
      bytes: 0,
      truncated: false
    };
  }
  const reader = stream2.getReader();
  const chunks = [];
  let bytes = 0;
  let truncated = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!value || value.length === 0) {
        continue;
      }
      const remaining = maxBytes - bytes;
      if (remaining <= 0) {
        truncated = true;
        onOverflow();
        break;
      }
      if (value.length > remaining) {
        chunks.push(value.slice(0, remaining));
        bytes += remaining;
        truncated = true;
        onOverflow();
        break;
      }
      chunks.push(value);
      bytes += value.length;
    }
  } finally {
    reader.releaseLock();
  }
  return {
    text: Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf8").trim(),
    bytes,
    truncated
  };
}
async function runProcess(spec) {
  const startedAt = Date.now();
  try {
    const proc = Bun.spawn(spec.command, {
      stdout: "pipe",
      stderr: "pipe",
      stdin: spec.stdin ? "pipe" : "ignore",
      cwd: spec.cwd,
      env: spec.env
    });
    if (spec.stdin && proc.stdin) {
      const data = typeof spec.stdin === "string" ? new TextEncoder().encode(spec.stdin) : spec.stdin;
      await proc.stdin.write(data);
      await proc.stdin.end();
    }
    let failureKind = null;
    let timedOut = false;
    let killed = false;
    const killProcess = (reason) => {
      if (!failureKind) {
        failureKind = reason;
      }
      if (killed) {
        return;
      }
      killed = true;
      try {
        proc.kill();
      } catch {}
    };
    const timeoutId = setTimeout(() => {
      timedOut = true;
      killProcess("timeout");
    }, spec.timeoutMs);
    const stdoutPromise = collectStream(proc.stdout, spec.maxStdoutBytes, () => {
      killProcess("stdout_limit");
    });
    const stderrPromise = collectStream(proc.stderr, spec.maxStderrBytes, () => {
      killProcess("stderr_limit");
    });
    let exitCode = -1;
    try {
      exitCode = await proc.exited;
    } finally {
      clearTimeout(timeoutId);
    }
    const [stdout, stderr] = await Promise.all([stdoutPromise, stderrPromise]);
    if (!failureKind && exitCode !== 0) {
      failureKind = "non_zero_exit";
    }
    return {
      pid: proc.pid,
      exitCode,
      stdout: stdout.text,
      stderr: stderr.text,
      durationMs: Date.now() - startedAt,
      timedOut,
      stdoutTruncated: stdout.truncated,
      stderrTruncated: stderr.truncated,
      stdoutBytes: stdout.bytes,
      stderrBytes: stderr.bytes,
      failureKind
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      pid: null,
      exitCode: -1,
      stdout: "",
      stderr: message,
      durationMs: Date.now() - startedAt,
      timedOut: false,
      stdoutTruncated: false,
      stderrTruncated: false,
      stdoutBytes: 0,
      stderrBytes: Buffer.byteLength(message),
      failureKind: "spawn_failure"
    };
  }
}
// ../../packages/fn-process-governor/src/logger.ts
function formatFields(event) {
  const fields = {
    taskId: event.task.taskId,
    key: event.task.key,
    singleFlightKey: event.task.singleFlightKey,
    resourceGroup: event.task.resourceGroup,
    priority: event.task.priority,
    status: event.task.status,
    durationMs: event.task.durationMs,
    queueDepth: event.queueDepth,
    runningCount: event.runningCount,
    error: event.task.error,
    command: event.task.command ? event.task.command.join(" ") : undefined
  };
  return Object.entries(fields).filter(([, value]) => value !== undefined && value !== null).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(" ");
}
function defaultGovernorLogger(event) {
  const line = formatFields(event);
  if (event.type === "failure") {
    console.error(`[process:${event.type}] ${line}`);
    return;
  }
  console.info(`[process:${event.type}] ${line}`);
}

// ../../packages/fn-process-governor/src/state.ts
function cloneSnapshot(snapshot) {
  return {
    taskId: snapshot.taskId,
    key: snapshot.key,
    singleFlightKey: snapshot.singleFlightKey,
    resourceGroup: snapshot.resourceGroup,
    priority: snapshot.priority,
    description: snapshot.description,
    command: snapshot.command ? [...snapshot.command] : null,
    status: snapshot.status,
    enqueueAt: snapshot.enqueueAt,
    startAt: snapshot.startAt,
    endAt: snapshot.endAt,
    durationMs: snapshot.durationMs,
    tags: snapshot.tags ? { ...snapshot.tags } : undefined,
    metadata: snapshot.metadata ? { ...snapshot.metadata } : undefined,
    error: snapshot.error
  };
}

class GovernorStateStore {
  historyLimit;
  taskById = new Map;
  queuedTaskIds = new Set;
  runningTaskIds = new Set;
  recentTasks = [];
  constructor(historyLimit) {
    this.historyLimit = historyLimit;
  }
  createTask(input) {
    const created = {
      taskId: input.taskId,
      key: input.key,
      singleFlightKey: input.singleFlightKey,
      resourceGroup: input.resourceGroup,
      priority: input.priority,
      description: input.description,
      command: input.command,
      status: "accepted",
      enqueueAt: Date.now(),
      startAt: null,
      endAt: null,
      durationMs: null,
      tags: input.tags ? { ...input.tags } : undefined,
      metadata: input.metadata ? { ...input.metadata } : undefined,
      error: null,
      abortController: new AbortController,
      promise: null
    };
    this.taskById.set(created.taskId, created);
    return created;
  }
  markQueued(taskId) {
    const task = this.require(taskId);
    task.status = "queued";
    this.queuedTaskIds.add(taskId);
  }
  markDeduplicated(taskId) {
    const task = this.require(taskId);
    task.status = "deduplicated";
    this.finish(taskId);
  }
  markCooldownSkip(taskId) {
    const task = this.require(taskId);
    task.status = "skipped_cooldown";
    this.finish(taskId);
  }
  markRunning(taskId) {
    const task = this.require(taskId);
    task.status = "running";
    task.startAt = Date.now();
    this.queuedTaskIds.delete(taskId);
    this.runningTaskIds.add(taskId);
  }
  markSucceeded(taskId) {
    const task = this.require(taskId);
    task.status = "succeeded";
    this.finish(taskId);
  }
  markFailed(taskId, error) {
    const task = this.require(taskId);
    task.status = "failed";
    task.error = error;
    this.finish(taskId);
  }
  markCancelled(taskId) {
    const task = this.require(taskId);
    task.status = "cancelled";
    task.error = "cancelled";
    task.abortController.abort();
    this.finish(taskId);
  }
  setPromise(taskId, promise) {
    const task = this.require(taskId);
    task.promise = promise;
  }
  listRunning() {
    return Array.from(this.runningTaskIds).map((taskId) => cloneSnapshot(this.require(taskId)));
  }
  listQueued() {
    return Array.from(this.queuedTaskIds).map((taskId) => cloneSnapshot(this.require(taskId)));
  }
  listRecent() {
    return this.recentTasks.map((task) => cloneSnapshot(task));
  }
  getTask(taskId) {
    const task = this.taskById.get(taskId);
    return task ? cloneSnapshot(task) : null;
  }
  getMutableTask(taskId) {
    return this.require(taskId);
  }
  clear() {
    this.taskById.clear();
    this.queuedTaskIds.clear();
    this.runningTaskIds.clear();
    this.recentTasks = [];
  }
  require(taskId) {
    const task = this.taskById.get(taskId);
    if (!task) {
      throw new Error(`Unknown task: ${taskId}`);
    }
    return task;
  }
  finish(taskId) {
    const task = this.require(taskId);
    task.endAt = Date.now();
    task.durationMs = task.startAt ? task.endAt - task.startAt : task.endAt - task.enqueueAt;
    this.queuedTaskIds.delete(taskId);
    this.runningTaskIds.delete(taskId);
    this.recentTasks = [task, ...this.recentTasks].slice(0, this.historyLimit);
  }
}

// ../../packages/fn-process-governor/src/governor.ts
function priorityValue(priority) {
  switch (priority) {
    case "high":
      return 3;
    case "low":
      return 1;
    default:
      return 2;
  }
}
function requirePositiveInteger(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive integer`);
  }
}
function cooldownRemaining(startedAt, cooldownMs) {
  return Math.max(0, cooldownMs - (Date.now() - startedAt));
}
function createProcessGovernor(options) {
  requirePositiveInteger(options.globalConcurrency, "globalConcurrency");
  for (const [resourceGroup, concurrency] of Object.entries(options.resourceConcurrency ?? {})) {
    requirePositiveInteger(concurrency, `resourceConcurrency.${resourceGroup}`);
  }
  const listeners = new Set;
  const logger = options.logger || defaultGovernorLogger;
  const state = new GovernorStateStore(options.historyLimit ?? 200);
  const singleFlight = new Map;
  const lastStartedAt = new Map;
  const runningByResource = new Map;
  const pendingTasks = [];
  const idleWaiters = [];
  let runningCount = 0;
  let sequence = 0;
  const queueDepth = () => pendingTasks.length;
  const emit = (type, taskId) => {
    const task = state.getTask(taskId);
    if (!task) {
      return;
    }
    const event = {
      type,
      task,
      queueDepth: queueDepth(),
      runningCount
    };
    logger(event);
    for (const listener of listeners) {
      listener(event);
    }
  };
  const resolveIdle = () => {
    if (runningCount !== 0 || pendingTasks.length !== 0) {
      return;
    }
    while (idleWaiters.length > 0) {
      const resolve2 = idleWaiters.shift();
      resolve2?.();
    }
  };
  const resourceCapacityFor = (resourceGroup) => {
    return options.resourceConcurrency?.[resourceGroup] ?? options.globalConcurrency;
  };
  const canStartTask = (spec) => {
    if (runningCount >= options.globalConcurrency) {
      return false;
    }
    const resourceRunning = runningByResource.get(spec.resourceGroup) ?? 0;
    return resourceRunning < resourceCapacityFor(spec.resourceGroup);
  };
  const sortPendingTasks = () => {
    pendingTasks.sort((left, right) => {
      if (left.priority !== right.priority) {
        return right.priority - left.priority;
      }
      return left.sequence - right.sequence;
    });
  };
  const finishTask = (spec) => {
    runningCount = Math.max(0, runningCount - 1);
    const resourceRunning = runningByResource.get(spec.resourceGroup) ?? 0;
    if (resourceRunning <= 1) {
      runningByResource.delete(spec.resourceGroup);
    } else {
      runningByResource.set(spec.resourceGroup, resourceRunning - 1);
    }
  };
  const dispatch = () => {
    sortPendingTasks();
    while (runningCount < options.globalConcurrency) {
      const nextIndex = pendingTasks.findIndex((task) => canStartTask(task.spec));
      if (nextIndex === -1) {
        break;
      }
      const [next] = pendingTasks.splice(nextIndex, 1);
      runningCount += 1;
      runningByResource.set(next.spec.resourceGroup, (runningByResource.get(next.spec.resourceGroup) ?? 0) + 1);
      state.markRunning(next.taskId);
      emit("start", next.taskId);
      if (next.spec.singleFlightKey) {
        lastStartedAt.set(next.spec.singleFlightKey, Date.now());
      }
      next.start(state.getMutableTask(next.taskId).abortController.signal);
    }
  };
  return {
    runTask(spec, execute) {
      if (options.maxQueueSize !== undefined && pendingTasks.length >= options.maxQueueSize) {
        throw new Error(`Process governor queue limit reached: ${options.maxQueueSize}`);
      }
      const taskId = crypto.randomUUID();
      state.createTask({
        taskId,
        key: spec.key || null,
        singleFlightKey: spec.singleFlightKey || null,
        resourceGroup: spec.resourceGroup,
        priority: spec.priority || "normal",
        description: spec.description || null,
        command: spec.command || null,
        tags: spec.tags,
        metadata: spec.metadata
      });
      emit("accepted", taskId);
      if (spec.singleFlightKey) {
        const existing = singleFlight.get(spec.singleFlightKey);
        if (existing) {
          state.setPromise(taskId, existing);
          state.markDeduplicated(taskId);
          emit("deduplicated", taskId);
          return {
            taskId,
            accepted: true,
            deduplicated: true,
            skippedCooldown: false,
            cooldownRemainingMs: null,
            promise: existing
          };
        }
        const startedAt = lastStartedAt.get(spec.singleFlightKey);
        if (!spec.force && spec.cooldownMs && startedAt !== undefined && Date.now() - startedAt < spec.cooldownMs) {
          const remainingMs = cooldownRemaining(startedAt, spec.cooldownMs);
          state.markCooldownSkip(taskId);
          emit("cooldown_skip", taskId);
          return {
            taskId,
            accepted: true,
            deduplicated: true,
            skippedCooldown: true,
            cooldownRemainingMs: remainingMs,
            promise: null
          };
        }
      }
      state.markQueued(taskId);
      emit("queued", taskId);
      const promise = new Promise((resolve2, reject) => {
        const start = async (signal) => {
          let result;
          let failure = null;
          try {
            result = await execute({
              taskId,
              signal
            });
            state.markSucceeded(taskId);
            emit("success", taskId);
          } catch (error) {
            failure = error;
            state.markFailed(taskId, error instanceof Error ? error.message : String(error));
            emit("failure", taskId);
          } finally {
            finishTask(spec);
            if (spec.singleFlightKey) {
              singleFlight.delete(spec.singleFlightKey);
            }
            dispatch();
            resolveIdle();
          }
          if (failure !== null) {
            reject(failure);
            return;
          }
          resolve2(result);
        };
        const pendingTask = {
          taskId,
          spec,
          start,
          priority: priorityValue(spec.priority || "normal"),
          sequence: sequence++
        };
        pendingTasks.push(pendingTask);
      });
      state.setPromise(taskId, promise);
      if (spec.singleFlightKey) {
        singleFlight.set(spec.singleFlightKey, promise);
      }
      dispatch();
      return {
        taskId,
        accepted: true,
        deduplicated: false,
        skippedCooldown: false,
        cooldownRemainingMs: null,
        promise
      };
    },
    getSnapshot() {
      const queued = state.listQueued();
      const running = state.listRunning();
      const recent = state.listRecent();
      return {
        globalConcurrency: options.globalConcurrency,
        resourceConcurrency: { ...options.resourceConcurrency ?? {} },
        resourceUsage: Object.fromEntries(runningByResource.entries()),
        queueDepth: pendingTasks.length,
        runningCount,
        queued,
        running,
        recent,
        updatedAt: Date.now()
      };
    },
    listRunning() {
      return state.listRunning();
    },
    listQueued() {
      return state.listQueued();
    },
    listRecent() {
      return state.listRecent();
    },
    getTask(taskId) {
      return state.getTask(taskId);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    async onIdle() {
      if (runningCount === 0 && pendingTasks.length === 0) {
        return;
      }
      await new Promise((resolve2) => {
        idleWaiters.push(resolve2);
      });
    },
    clear() {
      if (runningCount > 0 || pendingTasks.length > 0) {
        throw new Error("Cannot clear process governor while tasks are active; wait for onIdle() first");
      }
      singleFlight.clear();
      lastStartedAt.clear();
      runningByResource.clear();
      state.clear();
    }
  };
}
// src/lib/openclaw-core-compat.ts
import { existsSync as existsSync2, readdirSync as readdirSync3, readFileSync as readFileSync3, realpathSync, statSync as statSync2, writeFileSync } from "fs";
import { delimiter as delimiter2, dirname as dirname4, join as join3 } from "path";

// src/lib/openclaw-plugin-sdk-compat-surface.ts
var PLUGIN_SDK_COMPAT_PATCH_SENTINEL = "fn-openclaw-plugin-sdk-compat-v3";
var LEGACY_PLUGIN_SDK_COMPAT_PATCH_SENTINELS = [
  "fn-openclaw-plugin-sdk-compat-v1",
  "fn-openclaw-plugin-sdk-compat-v2"
];
var PLUGIN_SDK_COMPAT_FAST_EXPORT_NAMES = [
  "emptyPluginConfigSchema",
  "resolveControlCommandGate",
  "buildChannelConfigSchema",
  "resolvePreferredOpenClawTmpDir",
  "DEFAULT_ACCOUNT_ID",
  "normalizeAccountId",
  "normalizeOptionalAccountId",
  "normalizeAgentId",
  "resolveThreadSessionKeys",
  "withFileLock",
  "readJsonFileWithFallback",
  "writeJsonFileAtomically",
  "addWildcardAllowFrom",
  "formatPairingApproveHint",
  "resolveSenderCommandAuthorization",
  "resolveSenderCommandAuthorizationWithRuntime",
  "resolveDirectDmAuthorizationOutcome",
  "createTypingCallbacks",
  "stripMarkdown",
  "applyAccountNameToChannelSection",
  "deleteAccountFromConfigSection",
  "setAccountEnabledInConfigSection"
];
var PLUGIN_SDK_COMPAT_FAST_EXPORTS_BLOCK = [
  "const fastExports = {",
  ...PLUGIN_SDK_COMPAT_FAST_EXPORT_NAMES.map((name) => `  ${name},`),
  "};"
].join(`
`);
var PLUGIN_SDK_COMPAT_JITI_BLOCK = [
  `function resolveCreateJiti() {`,
  `  const jitiModule = require("jiti");`,
  `  if (typeof jitiModule === "function") {`,
  `    return jitiModule;`,
  `  }`,
  `  if (jitiModule && typeof jitiModule.createJiti === "function") {`,
  `    return jitiModule.createJiti;`,
  `  }`,
  `  if (jitiModule && typeof jitiModule.default === "function") {`,
  `    return jitiModule.default;`,
  `  }`,
  `  if (jitiModule && jitiModule.default && typeof jitiModule.default.createJiti === "function") {`,
  `    return jitiModule.default.createJiti;`,
  `  }`,
  `  throw new TypeError("Unsupported jiti export shape");`,
  `}`,
  ``,
  `function getJiti() {`,
  `  if (jitiLoader) {`,
  `    return jitiLoader;`,
  `  }`,
  ``,
  `  const createJiti = resolveCreateJiti();`,
  `  jitiLoader = createJiti(__filename, {`,
  `    interopDefault: true,`,
  `    extensions: [".ts", ".tsx", ".mts", ".cts", ".mtsx", ".ctsx", ".js", ".mjs", ".cjs", ".json"],`,
  `  });`,
  `  return jitiLoader;`,
  `}`
].join(`
`);
var PLUGIN_SDK_COMPAT_TRY_LOAD_BLOCK = [
  `let monolithicSdkLoadWarningPrinted = false;`,
  ``,
  `function tryLoadMonolithicSdk() {`,
  `  try {`,
  `    return loadMonolithicSdk();`,
  `  } catch (error) {`,
  `    if (!monolithicSdkLoadWarningPrinted) {`,
  `      monolithicSdkLoadWarningPrinted = true;`,
  `      const detail = error && typeof error === "object" && "stack" in error && error.stack`,
  `        ? error.stack`,
  `        : String(error);`,
  `      console.warn("[openclaw/plugin-sdk] failed to load monolithic sdk, falling back to compat exports\\n" + detail);`,
  `    }`,
  `    return null;`,
  `  }`,
  `}`
].join(`
`);
var PLUGIN_SDK_COMPAT_EXPORT_RESOLUTION_BLOCK = [
  `function getCompatExportValue(prop, receiver) {`,
  `  if (Reflect.has(target, prop)) {`,
  `    return Reflect.get(target, prop, receiver);`,
  `  }`,
  `  return undefined;`,
  `}`,
  ``,
  `function getExportValue(prop, receiver) {`,
  `  const monolithic = getMonolithicSdk();`,
  `  if (monolithic && Reflect.has(monolithic, prop)) {`,
  `    return Reflect.get(monolithic, prop, receiver);`,
  `  }`,
  `  return getCompatExportValue(prop, receiver);`,
  `}`,
  ``,
  `function getExportDescriptor(prop) {`,
  `  const monolithic = getMonolithicSdk();`,
  `  if (monolithic && Reflect.has(monolithic, prop)) {`,
  `    const descriptor = Reflect.getOwnPropertyDescriptor(monolithic, prop);`,
  `    if (descriptor) {`,
  `      return {`,
  `        ...descriptor,`,
  `        configurable: true,`,
  `      };`,
  `    }`,
  `  }`,
  `  return Reflect.getOwnPropertyDescriptor(target, prop);`,
  `}`,
  ``,
  `rootExports = new Proxy(target, {`,
  `  get(_target, prop, receiver) {`,
  `    return getExportValue(prop, receiver);`,
  `  },`,
  `  has(_target, prop) {`,
  `    if (Reflect.has(target, prop)) {`,
  `      return true;`,
  `    }`,
  `    const monolithic = getMonolithicSdk();`,
  `    return monolithic ? Reflect.has(monolithic, prop) : false;`,
  `  },`,
  `  ownKeys() {`,
  `    const keys = new Set(Reflect.ownKeys(target));`,
  `    const monolithic = getMonolithicSdk();`,
  `    if (monolithic) {`,
  `      for (const key of Reflect.ownKeys(monolithic)) {`,
  `        if (!keys.has(key)) {`,
  `          keys.add(key);`,
  `        }`,
  `      }`,
  `    }`,
  `    return [...keys];`,
  `  },`,
  `  getOwnPropertyDescriptor(_target, prop) {`,
  `    return getExportDescriptor(prop);`,
  `  },`,
  `});`
].join(`
`);
var PLUGIN_SDK_COMPAT_FALLBACK_BLOCK = [
  `function buildChannelConfigSchema(schema) {`,
  `  const schemaWithJson = schema;`,
  `  if (schemaWithJson && typeof schemaWithJson.toJSONSchema === "function") {`,
  `    return {`,
  `      schema: schemaWithJson.toJSONSchema({`,
  `        target: "draft-07",`,
  `        unrepresentable: "any",`,
  `      }),`,
  `    };`,
  `  }`,
  `  if (schemaWithJson && schemaWithJson.jsonSchema && typeof schemaWithJson.jsonSchema === "object") {`,
  `    return { schema: schemaWithJson.jsonSchema };`,
  `  }`,
  `  return {`,
  `    schema: {`,
  `      type: "object",`,
  `      additionalProperties: true,`,
  `    },`,
  `  };`,
  `}`,
  ``,
  `function resolvePreferredOpenClawTmpDir(options = {}) {`,
  `  const os = require("node:os");`,
  `  const candidate = "/tmp/openclaw";`,
  `  const accessSync = options.accessSync ?? fs.accessSync.bind(fs);`,
  `  const chmodSync = options.chmodSync ?? fs.chmodSync.bind(fs);`,
  `  const lstatSync = options.lstatSync ?? fs.lstatSync.bind(fs);`,
  `  const mkdirSync = options.mkdirSync ?? fs.mkdirSync.bind(fs);`,
  `  const warn = options.warn ?? ((message) => console.warn(message));`,
  `  const tmpdir = options.tmpdir ?? os.tmpdir;`,
  `  const getuid = options.getuid ?? (() => {`,
  `    try {`,
  `      return typeof process.getuid === "function" ? process.getuid() : undefined;`,
  `    } catch {`,
  `      return undefined;`,
  `    }`,
  `  });`,
  `  const uid = getuid();`,
  `  const tmpAccessMode = fs.constants.W_OK | fs.constants.X_OK;`,
  `  const isNodeErrorWithCode = (error, code) => {`,
  `    return typeof error === "object" && error !== null && "code" in error && error.code === code;`,
  `  };`,
  `  const isSecureDirForUser = (stats) => {`,
  `    if (uid === undefined) {`,
  `      return true;`,
  `    }`,
  `    if (typeof stats.uid === "number" && stats.uid !== uid) {`,
  `      return false;`,
  `    }`,
  `    if (typeof stats.mode === "number" && (stats.mode & 0o022) !== 0) {`,
  `      return false;`,
  `    }`,
  `    return true;`,
  `  };`,
  `  const isTrustedTmpDir = (stats) => {`,
  `    return stats.isDirectory() && !stats.isSymbolicLink() && isSecureDirForUser(stats);`,
  `  };`,
  `  const fallbackPath = () => {`,
  `    const suffix = uid === undefined ? "openclaw" : "openclaw-" + String(uid);`,
  `    return path.join(tmpdir(), suffix);`,
  `  };`,
  `  const resolveDirState = (targetPath) => {`,
  `    try {`,
  `      if (!isTrustedTmpDir(lstatSync(targetPath))) {`,
  `        return "invalid";`,
  `      }`,
  `      accessSync(targetPath, tmpAccessMode);`,
  `      return "available";`,
  `    } catch (error) {`,
  `      if (isNodeErrorWithCode(error, "ENOENT")) {`,
  `        return "missing";`,
  `      }`,
  `      return "invalid";`,
  `    }`,
  `  };`,
  `  const tryRepairWritableBits = (targetPath) => {`,
  `    try {`,
  `      const stats = lstatSync(targetPath);`,
  `      if (!stats.isDirectory() || stats.isSymbolicLink()) {`,
  `        return false;`,
  `      }`,
  `      if (uid !== undefined && typeof stats.uid === "number" && stats.uid !== uid) {`,
  `        return false;`,
  `      }`,
  `      if (typeof stats.mode !== "number" || (stats.mode & 0o022) === 0) {`,
  `        return false;`,
  `      }`,
  `      chmodSync(targetPath, 0o700);`,
  `      warn("[openclaw] tightened permissions on temp dir: " + targetPath);`,
  `      return resolveDirState(targetPath) === "available";`,
  `    } catch {`,
  `      return false;`,
  `    }`,
  `  };`,
  `  const ensureTrustedFallbackDir = () => {`,
  `    const targetPath = fallbackPath();`,
  `    const state = resolveDirState(targetPath);`,
  `    if (state === "available") {`,
  `      return targetPath;`,
  `    }`,
  `    if (state === "invalid") {`,
  `      if (tryRepairWritableBits(targetPath)) {`,
  `        return targetPath;`,
  `      }`,
  `      throw new Error("Unsafe fallback OpenClaw temp dir: " + targetPath);`,
  `    }`,
  `    mkdirSync(targetPath, { recursive: true, mode: 0o700 });`,
  `    chmodSync(targetPath, 0o700);`,
  `    if (resolveDirState(targetPath) !== "available" && !tryRepairWritableBits(targetPath)) {`,
  `      throw new Error("Unsafe fallback OpenClaw temp dir: " + targetPath);`,
  `    }`,
  `    return targetPath;`,
  `  };`,
  `  const preferredState = resolveDirState(candidate);`,
  `  if (preferredState === "available") {`,
  `    return candidate;`,
  `  }`,
  `  if (preferredState === "invalid") {`,
  `    if (tryRepairWritableBits(candidate)) {`,
  `      return candidate;`,
  `    }`,
  `    return ensureTrustedFallbackDir();`,
  `  }`,
  `  try {`,
  `    accessSync("/tmp", tmpAccessMode);`,
  `    mkdirSync(candidate, { recursive: true, mode: 0o700 });`,
  `    chmodSync(candidate, 0o700);`,
  `    if (resolveDirState(candidate) !== "available" && !tryRepairWritableBits(candidate)) {`,
  `      return ensureTrustedFallbackDir();`,
  `    }`,
  `    return candidate;`,
  `  } catch {`,
  `    return ensureTrustedFallbackDir();`,
  `  }`,
  `}`,
  ``,
  `const DEFAULT_ACCOUNT_ID = "default";`,
  `const DEFAULT_AGENT_ID = "main";`,
  `const BLOCKED_OBJECT_KEYS = new Set(["__proto__", "prototype", "constructor"]);`,
  `const ACCOUNT_OR_AGENT_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/i;`,
  `const INVALID_ID_CHARS_RE = /[^a-z0-9_-]+/g;`,
  `const LEADING_DASH_RE = /^-+/;`,
  `const TRAILING_DASH_RE = /-+$/;`,
  `const ACCOUNT_ID_CACHE_MAX = 512;`,
  `const normalizeAccountIdCache = new Map();`,
  `const normalizeOptionalAccountIdCache = new Map();`,
  `function canonicalizeCompatId(value) {`,
  `  if (ACCOUNT_OR_AGENT_ID_RE.test(value)) return value.toLowerCase();`,
  `  return value.toLowerCase().replace(INVALID_ID_CHARS_RE, "-").replace(LEADING_DASH_RE, "").replace(TRAILING_DASH_RE, "").slice(0, 64);`,
  `}`,
  `function normalizeCanonicalCompatId(value) {`,
  `  const canonical = canonicalizeCompatId(value);`,
  `  if (!canonical || BLOCKED_OBJECT_KEYS.has(canonical)) return undefined;`,
  `  return canonical;`,
  `}`,
  `function rememberCompatCacheValue(cache, key, value) {`,
  `  if (cache.size >= ACCOUNT_ID_CACHE_MAX) {`,
  `    const oldest = cache.keys().next();`,
  `    if (!oldest.done) {`,
  `      cache.delete(oldest.value);`,
  `    }`,
  `  }`,
  `  cache.set(key, value);`,
  `  return value;`,
  `}`,
  `function normalizeAccountId(value) {`,
  `  const trimmed = String(value ?? "").trim();`,
  `  if (!trimmed) return DEFAULT_ACCOUNT_ID;`,
  `  const cached = normalizeAccountIdCache.get(trimmed);`,
  `  if (cached) return cached;`,
  `  return rememberCompatCacheValue(normalizeAccountIdCache, trimmed, normalizeCanonicalCompatId(trimmed) ?? DEFAULT_ACCOUNT_ID);`,
  `}`,
  `function normalizeOptionalAccountId(value) {`,
  `  const trimmed = String(value ?? "").trim();`,
  `  if (!trimmed) return undefined;`,
  `  const cached = normalizeOptionalAccountIdCache.get(trimmed);`,
  `  if (cached !== undefined) return cached;`,
  `  const normalized = normalizeCanonicalCompatId(trimmed);`,
  `  return rememberCompatCacheValue(normalizeOptionalAccountIdCache, trimmed, normalized);`,
  `}`,
  `function normalizeAgentId(value) {`,
  `  const trimmed = String(value ?? "").trim();`,
  `  if (!trimmed) return DEFAULT_AGENT_ID;`,
  `  return normalizeCanonicalCompatId(trimmed) ?? DEFAULT_AGENT_ID;`,
  `}`,
  `function resolveThreadSessionKeys(params) {`,
  `  const threadId = String(params.threadId ?? "").trim();`,
  `  if (!threadId) {`,
  `    return {`,
  `      sessionKey: params.baseSessionKey,`,
  `      parentSessionKey: undefined,`,
  `    };`,
  `  }`,
  `  const normalizeThreadId = typeof params.normalizeThreadId === "function" ? params.normalizeThreadId : ((value) => String(value).toLowerCase());`,
  `  return {`,
  `    sessionKey: params.useSuffix ?? true ? \`${"${params.baseSessionKey}"}:thread:${"${normalizeThreadId(threadId)}"}\` : params.baseSessionKey,`,
  `    parentSessionKey: params.parentSessionKey,`,
  `  };`,
  `}`,
  ``,
  `function normalizeRetryOptions(retries) {`,
  `  const source = retries && typeof retries === "object" ? retries : {};`,
  `  return {`,
  `    retries: Number.isFinite(source.retries) ? Math.max(0, Math.floor(source.retries)) : 10,`,
  `    factor: Number.isFinite(source.factor) ? Math.max(1, Number(source.factor)) : 2,`,
  `    minTimeout: Number.isFinite(source.minTimeout) ? Math.max(1, Number(source.minTimeout)) : 100,`,
  `    maxTimeout: Number.isFinite(source.maxTimeout) ? Math.max(1, Number(source.maxTimeout)) : 1000,`,
  `    randomize: Boolean(source.randomize),`,
  `  };`,
  `}`,
  `function computeRetryDelayMs(retries, attempt) {`,
  `  const delay = Math.min(retries.minTimeout * Math.pow(retries.factor, attempt), retries.maxTimeout);`,
  `  return retries.randomize ? Math.max(1, Math.round(delay * (0.75 + Math.random() * 0.5))) : delay;`,
  `}`,
  `async function acquireCompatFileLock(filePath, options = {}) {`,
  `  const normalizedFile = path.resolve(String(filePath));`,
  `  const lockPath = normalizedFile + ".lock";`,
  `  const retries = normalizeRetryOptions(options.retries);`,
  `  const staleMs = Number.isFinite(options.stale) ? Math.max(0, Number(options.stale)) : 30000;`,
  `  const timeoutMs = Number.isFinite(options.timeoutMs) ? Math.max(0, Number(options.timeoutMs)) : retries.minTimeout + retries.maxTimeout * Math.max(1, retries.retries + 1);`,
  `  const deadline = Date.now() + timeoutMs;`,
  `  for (let attempt = 0; ; attempt += 1) {`,
  `    let handle;`,
  `    try {`,
  `      await fs.promises.mkdir(path.dirname(normalizedFile), { recursive: true, mode: 0o700 });`,
  `      handle = await fs.promises.open(lockPath, "wx", 0o600);`,
  `      await handle.writeFile(String(process.pid));`,
  `      return {`,
  `        async release() {`,
  `          try {`,
  `            await handle.close();`,
  `          } finally {`,
  `            await fs.promises.unlink(lockPath).catch(() => undefined);`,
  `          }`,
  `        },`,
  `      };`,
  `    } catch (error) {`,
  `      if (handle) {`,
  `        await handle.close().catch(() => undefined);`,
  `      }`,
  `      const errorCode = error && typeof error === "object" && "code" in error ? error.code : undefined;`,
  `      if (errorCode !== "EEXIST") {`,
  `        throw error;`,
  `      }`,
  `      if (staleMs > 0) {`,
  `        try {`,
  `          const stats = await fs.promises.stat(lockPath);`,
  `          if (Date.now() - stats.mtimeMs >= staleMs) {`,
  `            await fs.promises.unlink(lockPath).catch(() => undefined);`,
  `            continue;`,
  `          }`,
  `        } catch {`,
  `          continue;`,
  `        }`,
  `      }`,
  `      if (Date.now() >= deadline || attempt >= retries.retries) {`,
  `        throw new Error(\`file lock timeout for ${"${normalizedFile}"}\`);`,
  `      }`,
  `      await new Promise((resolve) => setTimeout(resolve, computeRetryDelayMs(retries, attempt)));`,
  `    }`,
  `  }`,
  `}`,
  `async function withFileLock(filePath, options, fn) {`,
  `  const task = typeof options === "function" ? options : fn;`,
  `  const resolvedOptions = typeof options === "function" ? {} : options;`,
  `  if (typeof task !== "function") {`,
  `    throw new TypeError("withFileLock requires a callback");`,
  `  }`,
  `  const lock = await acquireCompatFileLock(filePath, resolvedOptions ?? {});`,
  `  try {`,
  `    return await task();`,
  `  } finally {`,
  `    await lock.release();`,
  `  }`,
  `}`,
  `async function readJsonFileWithFallback(filePath, fallback) {`,
  `  try {`,
  `    const raw = await fs.promises.readFile(filePath, "utf-8");`,
  `    try {`,
  `      return {`,
  `        value: JSON.parse(raw),`,
  `        exists: true,`,
  `      };`,
  `    } catch {`,
  `      return {`,
  `        value: fallback,`,
  `        exists: true,`,
  `      };`,
  `    }`,
  `  } catch (error) {`,
  `    return {`,
  `      value: fallback,`,
  `      exists: !(error && typeof error === "object" && "code" in error && error.code === "ENOENT"),`,
  `    };`,
  `  }`,
  `}`,
  `async function writeJsonFileAtomically(filePath, value) {`,
  `  const normalizedFile = path.resolve(String(filePath));`,
  `  const directory = path.dirname(normalizedFile);`,
  `  const temporaryPath = \`${"${normalizedFile}"}.tmp-${"${process.pid}"}-${"${Date.now()}"}-${"${Math.random().toString(16).slice(2)}"}\`;`,
  `  await fs.promises.mkdir(directory, { recursive: true, mode: 0o700 });`,
  `  try {`,
  `    await fs.promises.writeFile(temporaryPath, JSON.stringify(value, null, 2) + "\\n", { mode: 0o600 });`,
  `    await fs.promises.rename(temporaryPath, normalizedFile);`,
  `  } catch (error) {`,
  `    await fs.promises.unlink(temporaryPath).catch(() => undefined);`,
  `    throw error;`,
  `  }`,
  `}`,
  `function addWildcardAllowFrom(allowFrom) {`,
  `  const next = (allowFrom ?? []).map((entry) => String(entry).trim()).filter(Boolean);`,
  `  if (!next.includes("*")) next.push("*");`,
  `  return next;`,
  `}`,
  `function formatPairingApproveHint(channelId) {`,
  `  const normalizedChannelId = String(channelId ?? "").trim() || "unknown";`,
  `  return \`Approve via: openclaw pairing list ${"${normalizedChannelId}"} / openclaw pairing approve ${"${normalizedChannelId}"} <code>\`;`,
  `}`,
  `function normalizeStringEntries(values) {`,
  `  return [...new Set((Array.isArray(values) ? values : []).map((value) => String(value).trim()).filter(Boolean))];`,
  `}`,
  `function mergeDmAllowFromSources(params) {`,
  `  const storeEntries = params.dmPolicy === "allowlist" ? [] : params.storeAllowFrom ?? [];`,
  `  return [...params.allowFrom ?? [], ...storeEntries].map((value) => String(value).trim()).filter(Boolean);`,
  `}`,
  `function resolveGroupAllowFromSources(params) {`,
  `  const explicitGroupAllowFrom = Array.isArray(params.groupAllowFrom) && params.groupAllowFrom.length > 0 ? params.groupAllowFrom : undefined;`,
  `  return (explicitGroupAllowFrom ? explicitGroupAllowFrom : params.fallbackToAllowFrom === false ? [] : params.allowFrom ?? []).map((value) => String(value).trim()).filter(Boolean);`,
  `}`,
  `function resolveEffectiveAllowFromLists(params) {`,
  `  const allowFrom = Array.isArray(params.allowFrom) ? params.allowFrom : undefined;`,
  `  const groupAllowFrom = Array.isArray(params.groupAllowFrom) ? params.groupAllowFrom : undefined;`,
  `  return {`,
  `    effectiveAllowFrom: normalizeStringEntries(mergeDmAllowFromSources({`,
  `      allowFrom,`,
  `      storeAllowFrom: Array.isArray(params.storeAllowFrom) ? params.storeAllowFrom : undefined,`,
  `      dmPolicy: params.dmPolicy ?? undefined,`,
  `    })),`,
  `    effectiveGroupAllowFrom: normalizeStringEntries(resolveGroupAllowFromSources({`,
  `      allowFrom,`,
  `      groupAllowFrom,`,
  `      fallbackToAllowFrom: params.groupAllowFromFallbackToAllowFrom ?? undefined,`,
  `    })),`,
  `  };`,
  `}`,
  `function resolveDirectDmAuthorizationOutcome(params) {`,
  `  if (params.isGroup) return "allowed";`,
  `  if (params.dmPolicy === "disabled") return "disabled";`,
  `  if (params.dmPolicy !== "open" && !params.senderAllowedForCommands) return "unauthorized";`,
  `  return "allowed";`,
  `}`,
  `function resolveCommandAuthorizedFromAuthorizersCompat(params) {`,
  `  return resolveCommandAuthorizedFromAuthorizers(params);`,
  `}`,
  `async function resolveSenderCommandAuthorization(params) {`,
  `  const shouldComputeAuth = params.shouldComputeCommandAuthorized(params.rawBody, params.cfg);`,
  `  const storeAllowFrom = !params.isGroup && params.dmPolicy !== "allowlist" && (params.dmPolicy !== "open" || shouldComputeAuth)`,
  `    ? await Promise.resolve(params.readAllowFromStore()).catch(() => [])`,
  `    : [];`,
  `  const access = resolveEffectiveAllowFromLists({`,
  `    allowFrom: params.configuredAllowFrom,`,
  `    groupAllowFrom: params.configuredGroupAllowFrom ?? [],`,
  `    storeAllowFrom,`,
  `    dmPolicy: params.dmPolicy,`,
  `  });`,
  `  const effectiveAllowFrom = access.effectiveAllowFrom;`,
  `  const effectiveGroupAllowFrom = access.effectiveGroupAllowFrom;`,
  `  const useAccessGroups = params.cfg?.commands?.useAccessGroups !== false;`,
  `  const senderAllowedForCommands = params.isSenderAllowed(params.senderId, params.isGroup ? effectiveGroupAllowFrom : effectiveAllowFrom);`,
  `  const ownerAllowedForCommands = params.isSenderAllowed(params.senderId, effectiveAllowFrom);`,
  `  const groupAllowedForCommands = params.isSenderAllowed(params.senderId, effectiveGroupAllowFrom);`,
  `  return {`,
  `    shouldComputeAuth,`,
  `    effectiveAllowFrom,`,
  `    effectiveGroupAllowFrom,`,
  `    senderAllowedForCommands,`,
  `    commandAuthorized: shouldComputeAuth ? params.resolveCommandAuthorizedFromAuthorizers({`,
  `      useAccessGroups,`,
  `      authorizers: [`,
  `        { configured: effectiveAllowFrom.length > 0, allowed: ownerAllowedForCommands },`,
  `        { configured: effectiveGroupAllowFrom.length > 0, allowed: groupAllowedForCommands },`,
  `      ],`,
  `    }) : undefined,`,
  `  };`,
  `}`,
  `async function resolveSenderCommandAuthorizationWithRuntime(params) {`,
  `  const runtime = params.runtime ?? {};`,
  `  return resolveSenderCommandAuthorization({`,
  `    ...params,`,
  `    shouldComputeCommandAuthorized: typeof runtime.shouldComputeCommandAuthorized === "function"`,
  `      ? runtime.shouldComputeCommandAuthorized`,
  `      : (rawBody) => typeof rawBody === "string" && rawBody.trim().startsWith("/"),`,
  `    resolveCommandAuthorizedFromAuthorizers: typeof runtime.resolveCommandAuthorizedFromAuthorizers === "function"`,
  `      ? runtime.resolveCommandAuthorizedFromAuthorizers`,
  `      : resolveCommandAuthorizedFromAuthorizersCompat,`,
  `  });`,
  `}`,
  `function createTypingCallbacks(params) {`,
  `  let closed = false;`,
  `  let started = false;`,
  `  const fireStart = async () => {`,
  `    if (closed) return;`,
  `    started = true;`,
  `    try {`,
  `      await Promise.resolve(params.start());`,
  `    } catch (error) {`,
  `      (params.onStartError ?? console.warn)(error);`,
  `    }`,
  `  };`,
  `  const fireStop = async () => {`,
  `    if (closed) return;`,
  `    closed = true;`,
  `    if (!started || typeof params.stop !== "function") return;`,
  `    try {`,
  `      await Promise.resolve(params.stop());`,
  `    } catch (error) {`,
  `      (params.onStopError ?? params.onStartError ?? console.warn)(error);`,
  `    }`,
  `  };`,
  `  return {`,
  `    onReplyStart: fireStart,`,
  `    onIdle: fireStop,`,
  `    onCleanup: fireStop,`,
  `    clear: fireStop,`,
  `    restoreInitial: async () => undefined,`,
  `    setQueued: async () => undefined,`,
  `    setThinking: async () => undefined,`,
  `    setTool: async () => undefined,`,
  `    setCompacting: async () => undefined,`,
  `    cancelPending: () => undefined,`,
  `    setDone: fireStop,`,
  `    setError: fireStop,`,
  `  };`,
  `}`,
  `function stripMarkdown(text) {`,
  `  let result = String(text ?? "");`,
  `  result = result.replace(/\\*\\*(.+?)\\*\\*/g, "$1");`,
  `  result = result.replace(/__(.+?)__/g, "$1");`,
  `  result = result.replace(/(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)/g, "$1");`,
  `  result = result.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "$1");`,
  `  result = result.replace(/~~(.+?)~~/g, "$1");`,
  `  result = result.replace(/^#{1,6}\\s+(.+)$/gm, "$1");`,
  `  result = result.replace(/^>\\s?(.*)$/gm, "$1");`,
  `  result = result.replace(/^[-*_]{3,}$/gm, "");`,
  `  result = result.replace(/` + "`([^`]+)`" + `/g, "$1");`,
  `  result = result.replace(/\\n{3,}/g, "\\n\\n");`,
  `  return result.trim();`,
  `}`,
  `function isObjectRecord(value) {`,
  `  return Boolean(value) && typeof value === "object" && !Array.isArray(value);`,
  `}`,
  `function cloneChannelConfigRoot(cfg, channelKey) {`,
  `  const channels = isObjectRecord(cfg?.channels) ? cfg.channels : {};`,
  `  const base = isObjectRecord(channels[channelKey]) ? channels[channelKey] : {};`,
  `  const accounts = isObjectRecord(base.accounts) ? base.accounts : {};`,
  `  return { channels, base, accounts };`,
  `}`,
  `function withChannelConfig(cfg, channelKey, section) {`,
  `  return {`,
  `    ...cfg,`,
  `    channels: {`,
  `      ...(isObjectRecord(cfg?.channels) ? cfg.channels : {}),`,
  `      [channelKey]: section,`,
  `    },`,
  `  };`,
  `}`,
  `function applyAccountNameToChannelSection(params) {`,
  `  const trimmed = String(params.name ?? "").trim();`,
  `  if (!trimmed) return params.cfg;`,
  `  const accountId = normalizeAccountId(params.accountId);`,
  `  const { base, accounts } = cloneChannelConfigRoot(params.cfg, params.channelKey);`,
  `  const alwaysUseAccounts = Boolean(params.alwaysUseAccounts) || accountId !== DEFAULT_ACCOUNT_ID || Object.keys(accounts).length > 0;`,
  `  if (!alwaysUseAccounts && accountId === DEFAULT_ACCOUNT_ID) {`,
  `    return withChannelConfig(params.cfg, params.channelKey, {`,
  `      ...base,`,
  `      name: trimmed,`,
  `    });`,
  `  }`,
  `  const existingAccount = isObjectRecord(accounts[accountId]) ? accounts[accountId] : {};`,
  `  const nextSection = {`,
  `    ...base,`,
  `    accounts: {`,
  `      ...accounts,`,
  `      [accountId]: {`,
  `        ...existingAccount,`,
  `        name: trimmed,`,
  `      },`,
  `    },`,
  `  };`,
  `  if (accountId === DEFAULT_ACCOUNT_ID) {`,
  `    delete nextSection.name;`,
  `  }`,
  `  return withChannelConfig(params.cfg, params.channelKey, nextSection);`,
  `}`,
  `function deleteAccountFromConfigSection(params) {`,
  `  const accountId = normalizeAccountId(params.accountId);`,
  `  const { base, accounts } = cloneChannelConfigRoot(params.cfg, params.channelKey);`,
  `  if (accountId === DEFAULT_ACCOUNT_ID) {`,
  `    const nextSection = { ...base };`,
  `    delete nextSection.enabled;`,
  `    delete nextSection.name;`,
  `    if (Object.keys(accounts).length > 0) {`,
  `      nextSection.accounts = accounts;`,
  `    } else {`,
  `      delete nextSection.accounts;`,
  `    }`,
  `    if (nextSection.defaultAccount === accountId) {`,
  `      delete nextSection.defaultAccount;`,
  `    }`,
  `    return withChannelConfig(params.cfg, params.channelKey, nextSection);`,
  `  }`,
  `  if (!(accountId in accounts)) {`,
  `    return params.cfg;`,
  `  }`,
  `  const nextAccounts = { ...accounts };`,
  `  delete nextAccounts[accountId];`,
  `  const nextSection = { ...base };`,
  `  if (Object.keys(nextAccounts).length > 0) {`,
  `    nextSection.accounts = nextAccounts;`,
  `  } else {`,
  `    delete nextSection.accounts;`,
  `  }`,
  `  if (nextSection.defaultAccount === accountId) {`,
  `    delete nextSection.defaultAccount;`,
  `  }`,
  `  return withChannelConfig(params.cfg, params.channelKey, nextSection);`,
  `}`,
  `function setAccountEnabledInConfigSection(params) {`,
  `  const accountId = normalizeAccountId(params.accountId);`,
  `  const { base, accounts } = cloneChannelConfigRoot(params.cfg, params.channelKey);`,
  `  if (accountId === DEFAULT_ACCOUNT_ID && Object.keys(accounts).length === 0) {`,
  `    return withChannelConfig(params.cfg, params.channelKey, {`,
  `      ...base,`,
  `      enabled: Boolean(params.enabled),`,
  `    });`,
  `  }`,
  `  const existingAccount = isObjectRecord(accounts[accountId]) ? accounts[accountId] : {};`,
  `  return withChannelConfig(params.cfg, params.channelKey, {`,
  `    ...base,`,
  `    accounts: {`,
  `      ...accounts,`,
  `      [accountId]: {`,
  `        ...existingAccount,`,
  `        enabled: Boolean(params.enabled),`,
  `      },`,
  `    },`,
  `  });`,
  `}`,
  ``,
  `// ${PLUGIN_SDK_COMPAT_PATCH_SENTINEL}`
].join(`
`);

// src/lib/openclaw-core-compat.ts
var OPENCLAW_PACKAGE_DIRNAME = "openclaw";
var INSTALLER_COMPAT_PATCH_SENTINEL = "fn-openclaw-install-peer-compat-v1";
var BUNDLED_PLUGIN_ENTRY_ORDER_PATCH_SENTINEL = "fn-openclaw-bundled-plugin-entry-order-v1";
var GATEWAY_IMAGE_CAPABILITY_PATCH_SENTINEL = "fn-openclaw-gateway-image-capability-v1";
var HOST_PEER_DEPENDENCY_NAMES = ["openclaw", "clawdbot", "moltbot"];
var ROOT_ALIAS_COMPAT_MAX_VERSION = [2026, 3, 31];
var INSTALLER_MANIFEST_COMPAT_MAX_VERSION = [2026, 4, 999];
var BUNDLED_PLUGIN_ENTRY_ORDER_COMPAT_MAX_VERSION = [2026, 4, 999];
var GATEWAY_IMAGE_CAPABILITY_COMPAT_MAX_VERSION = [2026, 4, 999];
var INSTALLER_MANIFEST_SANITIZER = [
  `async function sanitizeManifestForNpmInstall(targetDir) {`,
  `	const manifestPath = path.join(targetDir, "package.json");`,
  `	let manifestRaw = "";`,
  `	try {`,
  `		manifestRaw = await fs.readFile(manifestPath, "utf-8");`,
  `	} catch {`,
  `		return;`,
  `	}`,
  `	let manifest;`,
  `	try {`,
  `		const parsed = JSON.parse(manifestRaw);`,
  `		if (!isObjectRecord(parsed)) return;`,
  `		manifest = parsed;`,
  `	} catch {`,
  `		return;`,
  `	}`,
  `	let changed = false;`,
  `	const devDependencies = manifest.devDependencies;`,
  `	if (isObjectRecord(devDependencies)) {`,
  `		const filteredEntries = Object.entries(devDependencies).filter(([, rawSpec]) => {`,
  `			return !(typeof rawSpec === "string" ? rawSpec.trim() : "").startsWith("workspace:");`,
  `		});`,
  `		if (filteredEntries.length !== Object.keys(devDependencies).length) {`,
  `			changed = true;`,
  `			if (filteredEntries.length === 0) delete manifest.devDependencies;`,
  `			else manifest.devDependencies = Object.fromEntries(filteredEntries);`,
  `		}`,
  `	}`,
  `	const hostPeerDependencies = new Set(${JSON.stringify([...HOST_PEER_DEPENDENCY_NAMES])});`,
  `	const peerDependencies = manifest.peerDependencies;`,
  `	if (isObjectRecord(peerDependencies)) {`,
  `		const filteredPeerEntries = Object.entries(peerDependencies).filter(([name]) => !hostPeerDependencies.has(name));`,
  `		if (filteredPeerEntries.length !== Object.keys(peerDependencies).length) {`,
  `			changed = true;`,
  `			if (filteredPeerEntries.length === 0) delete manifest.peerDependencies;`,
  `			else manifest.peerDependencies = Object.fromEntries(filteredPeerEntries);`,
  `			const peerDependenciesMeta = manifest.peerDependenciesMeta;`,
  `			if (isObjectRecord(peerDependenciesMeta)) {`,
  `				const filteredMetaEntries = Object.entries(peerDependenciesMeta).filter(([name]) => !hostPeerDependencies.has(name));`,
  `				if (filteredMetaEntries.length === 0) delete manifest.peerDependenciesMeta;`,
  `				else manifest.peerDependenciesMeta = Object.fromEntries(filteredMetaEntries);`,
  `			}`,
  `		}`,
  `	}`,
  `	if (!changed) return;`,
  `	await fs.writeFile(manifestPath, \`${"${JSON.stringify(manifest, null, 2)}"}\\n\`, "utf-8");`,
  `}`,
  `// ${INSTALLER_COMPAT_PATCH_SENTINEL}`
].join(`
`);
var BUNDLED_PLUGIN_ENTRY_ORDER_BLOCK = [
  `const DEFAULT_PLUGIN_ENTRY_CANDIDATES = [`,
  `	"index.js",`,
  `	"index.mjs",`,
  `	"index.cjs",`,
  `	"index.ts"`,
  `];`,
  `// ${BUNDLED_PLUGIN_ENTRY_ORDER_PATCH_SENTINEL}`
].join(`
`);
var GATEWAY_IMAGE_CAPABILITY_BLOCK = [
  `function resolveConfiguredModelSupportsImages(params) {`,
  `	const modelRaw = typeof params.model === "string" ? params.model.trim() : "";`,
  `	if (!modelRaw) return void 0;`,
  `	try {`,
  `		const cfg = loadConfig();`,
  `		let providerRaw = typeof params.provider === "string" ? params.provider.trim().toLowerCase() : "";`,
  `		if (!providerRaw) {`,
  `			const inferredProvider = inferUniqueProviderFromConfiguredModels({`,
  `				cfg,`,
  `				model: modelRaw`,
  `			});`,
  `			providerRaw = typeof inferredProvider === "string" ? inferredProvider.trim().toLowerCase() : "";`,
  `		}`,
  `		if (!providerRaw) return void 0;`,
  `		const providers = cfg.models?.providers;`,
  `		if (!providers || typeof providers !== "object") return void 0;`,
  `		const providerEntry = Object.entries(providers).find(([providerKey]) => providerKey.trim().toLowerCase() === providerRaw)?.[1];`,
  `		if (!providerEntry || typeof providerEntry !== "object") return void 0;`,
  `		const configuredModels = providerEntry.models;`,
  `		if (!Array.isArray(configuredModels)) return void 0;`,
  `		const normalizedModel = modelRaw.toLowerCase();`,
  `		for (const configuredModel of configuredModels) {`,
  `			if (!configuredModel || typeof configuredModel !== "object") continue;`,
  `			const idRaw = typeof configuredModel.id === "string" ? configuredModel.id.trim().toLowerCase() : "";`,
  `			const nameRaw = typeof configuredModel.name === "string" ? configuredModel.name.trim().toLowerCase() : "";`,
  `			if (idRaw !== normalizedModel && nameRaw !== normalizedModel) continue;`,
  `			const input = configuredModel.input;`,
  `			if (!Array.isArray(input)) return void 0;`,
  `			return input.includes("image");`,
  `		}`,
  `		return void 0;`,
  `	} catch {`,
  `		return void 0;`,
  `	}`,
  `}`,
  `async function resolveGatewayModelSupportsImages(params) {`,
  `	if (!params.model) return true;`,
  `	const configuredSupportsImages = resolveConfiguredModelSupportsImages(params);`,
  `	if (typeof configuredSupportsImages === "boolean") return configuredSupportsImages;`,
  `	try {`,
  `		const modelEntry = (await params.loadGatewayModelCatalog()).find((entry) => entry.id === params.model && (!params.provider || entry.provider === params.provider));`,
  `		if (modelEntry) {`,
  `			if (modelEntry.input?.includes("image")) return true;`,
  `			const normalizedProvider = params.provider?.trim().toLowerCase();`,
  `			const normalizedCandidates = [params.model.trim().toLowerCase(), typeof modelEntry.name === "string" ? modelEntry.name.trim().toLowerCase() : ""].filter(Boolean);`,
  `			if (normalizedProvider === "microsoft-foundry" && normalizedCandidates.some((candidate) => candidate.startsWith("gpt-") || candidate.startsWith("o1") || candidate.startsWith("o3") || candidate.startsWith("o4") || candidate === "computer-use-preview")) return true;`,
  `			return false;`,
  `		}`,
  `		return false;`,
  `	} catch {`,
  `		return false;`,
  `	}`,
  `}`,
  `// ${GATEWAY_IMAGE_CAPABILITY_PATCH_SENTINEL}`
].join(`
`);
function isAlreadyPatched(source, sentinel) {
  return source.includes(sentinel);
}
function exposesRequiredCompatExports(source) {
  const fastExportsMatch = source.match(/const fastExports = \{([\s\S]*?)\n\};/);
  const fastExportsBody = fastExportsMatch?.[1] || "";
  return source.includes("function resolveCreateJiti() {") && source.includes("let monolithicSdkLoadWarningPrinted = false;") && source.includes("function getCompatExportValue(prop, receiver) {") && PLUGIN_SDK_COMPAT_FAST_EXPORT_NAMES.every((name) => fastExportsBody.includes(name));
}
function applyRootAliasCompatPatch(source) {
  if (isAlreadyPatched(source, PLUGIN_SDK_COMPAT_PATCH_SENTINEL) && exposesRequiredCompatExports(source)) {
    return source;
  }
  let nextSource = source;
  const legacySentinel = LEGACY_PLUGIN_SDK_COMPAT_PATCH_SENTINELS.find((sentinel) => nextSource.includes(sentinel));
  const getJitiPattern = /function getJiti\(\) \{[\s\S]*?\n\}\n\nfunction loadMonolithicSdk\(\) \{/;
  const tryLoadPattern = /function tryLoadMonolithicSdk\(\) \{[\s\S]*?\n\}/;
  const fastExportsPattern = /(?:function buildChannelConfigSchema\(schema\) \{[\s\S]*?\/\/ fn-openclaw-plugin-sdk-compat-v\d+\n\n)?const fastExports = \{[\s\S]*?\n\};/;
  const exportResolutionPattern = /function getExportValue\(prop\) \{[\s\S]*?\n\}\n\nfunction getExportDescriptor\(prop\) \{[\s\S]*?\n\}\n\nrootExports = new Proxy\(target, \{[\s\S]*?\n\}\);/;
  if (!getJitiPattern.test(nextSource) || !tryLoadPattern.test(nextSource) || !fastExportsPattern.test(nextSource) || !exportResolutionPattern.test(nextSource)) {
    return source;
  }
  nextSource = nextSource.replace(getJitiPattern, `${PLUGIN_SDK_COMPAT_JITI_BLOCK}

function loadMonolithicSdk() {`);
  nextSource = nextSource.replace(tryLoadPattern, PLUGIN_SDK_COMPAT_TRY_LOAD_BLOCK);
  nextSource = nextSource.replace(fastExportsPattern, `${PLUGIN_SDK_COMPAT_FALLBACK_BLOCK}

${PLUGIN_SDK_COMPAT_FAST_EXPORTS_BLOCK}`);
  nextSource = nextSource.replace(exportResolutionPattern, PLUGIN_SDK_COMPAT_EXPORT_RESOLUTION_BLOCK);
  if (legacySentinel) {
    nextSource = nextSource.replaceAll(legacySentinel, PLUGIN_SDK_COMPAT_PATCH_SENTINEL);
  }
  return nextSource;
}
function applyInstallManifestCompatPatch(source) {
  if (isAlreadyPatched(source, INSTALLER_COMPAT_PATCH_SENTINEL)) {
    return source;
  }
  const functionPattern = /async function sanitizeManifestForNpmInstall\(targetDir\) \{[\s\S]*?\n\}\nasync function assertInstallBoundaryPaths/;
  if (!functionPattern.test(source)) {
    return source;
  }
  return source.replace(functionPattern, `${INSTALLER_MANIFEST_SANITIZER}
async function assertInstallBoundaryPaths`);
}
function applyBundledPluginEntryOrderPatch(source) {
  if (isAlreadyPatched(source, BUNDLED_PLUGIN_ENTRY_ORDER_PATCH_SENTINEL)) {
    return source;
  }
  const candidatesPattern = /const DEFAULT_PLUGIN_ENTRY_CANDIDATES = \[[\s\S]*?\];/;
  if (!candidatesPattern.test(source)) {
    return source;
  }
  return source.replace(candidatesPattern, BUNDLED_PLUGIN_ENTRY_ORDER_BLOCK);
}
function applyGatewayImageCapabilityPatch(source) {
  if (isAlreadyPatched(source, GATEWAY_IMAGE_CAPABILITY_PATCH_SENTINEL)) {
    return source;
  }
  const resolverPattern = /async function resolveGatewayModelSupportsImages\(params\) \{[\s\S]*?\n\}\nfunction resolveSessionModelIdentityRef/;
  if (!resolverPattern.test(source)) {
    return source;
  }
  return source.replace(resolverPattern, `${GATEWAY_IMAGE_CAPABILITY_BLOCK}
function resolveSessionModelIdentityRef`);
}
function compatInstallerScriptPaths(distDir) {
  if (!existsSync2(distDir)) {
    return [];
  }
  return readdirSync3(distDir).filter((entry) => /^npm-pack-install-.*\.js$/.test(entry)).sort().map((entry) => join3(distDir, entry));
}
function compatBundledPluginDiscoveryScriptPaths(distDir) {
  if (!existsSync2(distDir)) {
    return [];
  }
  return readdirSync3(distDir).filter((entry) => /^skills-.*\.js$/.test(entry)).sort().map((entry) => join3(distDir, entry));
}
function compatGatewayImageCapabilityScriptPaths(distDir) {
  if (!existsSync2(distDir)) {
    return [];
  }
  return readdirSync3(distDir).filter((entry) => /^session-utils-.*\.js$/.test(entry)).sort().map((entry) => join3(distDir, entry));
}
function parseOpenclawVersion(version) {
  if (!version) {
    return null;
  }
  const match2 = version.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!match2) {
    return null;
  }
  const parsed = match2.slice(1).map((value) => Number.parseInt(value, 10));
  if (parsed.some((value) => Number.isNaN(value))) {
    return null;
  }
  return [parsed[0], parsed[1], parsed[2]];
}
function compareOpenclawVersions(left, right) {
  for (let index = 0;index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] < right[index] ? -1 : 1;
    }
  }
  return 0;
}
function readInstalledOpenclawVersion(packageJsonPath) {
  if (!existsSync2(packageJsonPath)) {
    return null;
  }
  try {
    const raw2 = JSON.parse(readFileSync3(packageJsonPath, "utf8"));
    return typeof raw2.version === "string" && raw2.version.trim().length > 0 ? raw2.version.trim() : null;
  } catch {
    return null;
  }
}
function shouldPatchForInstalledVersion(packageJsonPath, maxVersion) {
  const parsedVersion = parseOpenclawVersion(readInstalledOpenclawVersion(packageJsonPath));
  if (!parsedVersion) {
    return true;
  }
  return compareOpenclawVersions(parsedVersion, maxVersion) <= 0;
}
function shouldPatchRootAlias(packageJsonPath) {
  return shouldPatchForInstalledVersion(packageJsonPath, ROOT_ALIAS_COMPAT_MAX_VERSION);
}
function shouldPatchInstallerManifestCompat(packageJsonPath) {
  return shouldPatchForInstalledVersion(packageJsonPath, INSTALLER_MANIFEST_COMPAT_MAX_VERSION);
}
function shouldPatchBundledPluginEntryOrderCompat(packageJsonPath) {
  return shouldPatchForInstalledVersion(packageJsonPath, BUNDLED_PLUGIN_ENTRY_ORDER_COMPAT_MAX_VERSION);
}
function shouldPatchGatewayImageCapabilityCompat(packageJsonPath) {
  return shouldPatchForInstalledVersion(packageJsonPath, GATEWAY_IMAGE_CAPABILITY_COMPAT_MAX_VERSION);
}
function patchFileIfNeeded(filePath, patcher, options) {
  const currentSource = readFileSync3(filePath, "utf8");
  if (options?.isPatched?.(currentSource)) {
    return "already_patched";
  }
  const nextSource = patcher(currentSource);
  if (nextSource === currentSource) {
    return "skipped";
  }
  writeFileSync(filePath, nextSource, "utf8");
  return "patched";
}
function isOpenclawPackageRoot(packageRoot) {
  const packageJsonPath = join3(packageRoot, "package.json");
  const distDir = join3(packageRoot, "dist");
  if (!existsSync2(packageJsonPath) || !existsSync2(distDir)) {
    return false;
  }
  try {
    const raw2 = JSON.parse(readFileSync3(packageJsonPath, "utf8"));
    return raw2.name === OPENCLAW_PACKAGE_DIRNAME;
  } catch {
    return false;
  }
}
function pushSystemPackageRootCandidate(candidates, seen, candidate) {
  if (!candidate) {
    return;
  }
  if (seen.has(candidate)) {
    return;
  }
  seen.add(candidate);
  candidates.push(candidate);
}
function walkSystemPackageRootCandidates(startPath, candidates, seen) {
  let current = startPath;
  while (true) {
    pushSystemPackageRootCandidate(candidates, seen, current);
    pushSystemPackageRootCandidate(candidates, seen, join3(current, "node_modules", OPENCLAW_PACKAGE_DIRNAME));
    pushSystemPackageRootCandidate(candidates, seen, join3(current, "lib", "node_modules", OPENCLAW_PACKAGE_DIRNAME));
    const parent = dirname4(current);
    if (parent === current) {
      return;
    }
    current = parent;
  }
}
function resolveSystemOpenclawPackageRoot(binaryPath) {
  const candidates = [];
  const seen = new Set;
  const pathVariants = [binaryPath];
  try {
    pathVariants.push(realpathSync(binaryPath));
  } catch {}
  for (const variant of pathVariants) {
    let start = variant;
    try {
      if (statSync2(variant).isFile()) {
        start = dirname4(variant);
      }
    } catch {
      start = dirname4(variant);
    }
    walkSystemPackageRootCandidates(start, candidates, seen);
  }
  return candidates.find((candidate) => isOpenclawPackageRoot(candidate)) || null;
}
function resolveSystemOpenclawBinaryForCompat() {
  const resolved = resolveSystemOpenclawBinary();
  if (resolved) {
    return resolved;
  }
  const pathValue = process.env.PATH;
  if (!pathValue) {
    return null;
  }
  const binaryNames = process.platform === "win32" ? ["openclaw.cmd", "openclaw.exe", "openclaw"] : ["openclaw"];
  for (const dir of pathValue.split(delimiter2).filter(Boolean)) {
    for (const binaryName of binaryNames) {
      const candidate = join3(dir, binaryName);
      if (existsSync2(candidate)) {
        return candidate;
      }
    }
  }
  return null;
}
function buildCompatTarget(mode, packageRoot) {
  const distDir = join3(packageRoot, "dist");
  const packageJsonPath = join3(packageRoot, "package.json");
  if (!existsSync2(distDir) || !existsSync2(packageJsonPath)) {
    return null;
  }
  return {
    mode,
    packageRoot,
    distDir,
    packageJsonPath,
    rootAliasPath: join3(distDir, "plugin-sdk", "root-alias.cjs"),
    installerPaths: compatInstallerScriptPaths(distDir),
    pluginDiscoveryPaths: compatBundledPluginDiscoveryScriptPaths(distDir),
    sessionUtilsPaths: compatGatewayImageCapabilityScriptPaths(distDir)
  };
}
function resolveCompatTarget(instance) {
  if (!usesSystemOpenclaw(instance)) {
    return buildCompatTarget("managed", join3(instance.installDir, "node_modules", OPENCLAW_PACKAGE_DIRNAME));
  }
  const binaryPath = resolveSystemOpenclawBinaryForCompat();
  if (!binaryPath) {
    return null;
  }
  const packageRoot = resolveSystemOpenclawPackageRoot(binaryPath);
  if (!packageRoot) {
    return null;
  }
  return buildCompatTarget("system", packageRoot);
}
function maybeRecordCompatEvent(events, event) {
  events.push(event);
  if (event.target !== "gateway-image-capability") {
    return;
  }
  console.info(`[openclaw:compat] mode=${event.mode} target=${event.target} status=${event.status} path=${event.filePath}`);
}
async function ensureManagedOpenclawPluginSdkCompat(instance) {
  const target = resolveCompatTarget(instance);
  if (!target) {
    return {
      checked: false,
      patched: false,
      mode: null,
      rootAliasPath: null,
      events: [],
      patchedPaths: []
    };
  }
  const rootAliasPath = target.rootAliasPath;
  const installerPaths = target.installerPaths;
  const pluginDiscoveryPaths = target.pluginDiscoveryPaths;
  const gatewayImageCapabilityPaths = target.sessionUtilsPaths;
  const patchedPaths = [];
  const events = [];
  const hasRootAlias = existsSync2(rootAliasPath);
  const patchRootAlias = hasRootAlias && shouldPatchRootAlias(target.packageJsonPath);
  const patchInstallerManifestCompat = shouldPatchInstallerManifestCompat(target.packageJsonPath);
  const patchBundledPluginEntryOrderCompat = shouldPatchBundledPluginEntryOrderCompat(target.packageJsonPath);
  const patchGatewayImageCapabilityCompat = shouldPatchGatewayImageCapabilityCompat(target.packageJsonPath);
  if (patchRootAlias) {
    const status = patchFileIfNeeded(rootAliasPath, applyRootAliasCompatPatch, {
      isPatched: (source) => isAlreadyPatched(source, PLUGIN_SDK_COMPAT_PATCH_SENTINEL) && exposesRequiredCompatExports(source)
    });
    if (status === "patched") {
      patchedPaths.push(rootAliasPath);
    }
    if (status !== "skipped") {
      maybeRecordCompatEvent(events, {
        filePath: rootAliasPath,
        mode: target.mode,
        status,
        target: "root-alias"
      });
    }
  }
  if (patchInstallerManifestCompat) {
    for (const installerPath of installerPaths) {
      const status = patchFileIfNeeded(installerPath, applyInstallManifestCompatPatch, {
        isPatched: (source) => isAlreadyPatched(source, INSTALLER_COMPAT_PATCH_SENTINEL)
      });
      if (status === "patched") {
        patchedPaths.push(installerPath);
      }
      if (status !== "skipped") {
        maybeRecordCompatEvent(events, {
          filePath: installerPath,
          mode: target.mode,
          status,
          target: "installer"
        });
      }
    }
  }
  if (patchBundledPluginEntryOrderCompat) {
    for (const pluginDiscoveryPath of pluginDiscoveryPaths) {
      const status = patchFileIfNeeded(pluginDiscoveryPath, applyBundledPluginEntryOrderPatch, {
        isPatched: (source) => isAlreadyPatched(source, BUNDLED_PLUGIN_ENTRY_ORDER_PATCH_SENTINEL)
      });
      if (status === "patched") {
        patchedPaths.push(pluginDiscoveryPath);
      }
      if (status !== "skipped") {
        maybeRecordCompatEvent(events, {
          filePath: pluginDiscoveryPath,
          mode: target.mode,
          status,
          target: "bundled-plugin-entry-order"
        });
      }
    }
  }
  if (patchGatewayImageCapabilityCompat) {
    for (const gatewayImageCapabilityPath of gatewayImageCapabilityPaths) {
      const status = patchFileIfNeeded(gatewayImageCapabilityPath, applyGatewayImageCapabilityPatch, {
        isPatched: (source) => isAlreadyPatched(source, GATEWAY_IMAGE_CAPABILITY_PATCH_SENTINEL)
      });
      if (status === "patched") {
        patchedPaths.push(gatewayImageCapabilityPath);
      }
      if (status !== "skipped") {
        maybeRecordCompatEvent(events, {
          filePath: gatewayImageCapabilityPath,
          mode: target.mode,
          status,
          target: "gateway-image-capability"
        });
      }
    }
  }
  if (!hasRootAlias && installerPaths.length === 0 && pluginDiscoveryPaths.length === 0 && gatewayImageCapabilityPaths.length === 0) {
    return {
      checked: false,
      patched: false,
      mode: target.mode,
      rootAliasPath,
      events: [],
      patchedPaths: []
    };
  }
  return {
    checked: true,
    patched: patchedPaths.length > 0,
    mode: target.mode,
    rootAliasPath,
    events,
    patchedPaths
  };
}

// src/lib/openclaw-cli-runner.ts
var openclawCliGovernor = createProcessGovernor({
  globalConcurrency: 1,
  resourceConcurrency: {
    "openclaw.cli.query": 1,
    "openclaw.cli.mutation": 1,
    "openclaw.cli.lifecycle": 1
  },
  historyLimit: 200,
  logger: () => {}
});
var OPENCLAW_CLI_GOVERNOR_ID = "openclaw.cli";
var OPENCLAW_CLI_GOVERNOR_LABEL = "OpenClaw CLI Governor";
function formatRunnerFields(fields) {
  return Object.entries(fields).filter(([, value]) => value !== undefined).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(" ");
}
function logRunnerEvent(event, fields) {
  const line = formatRunnerFields(fields);
  if (event === "fail") {
    console.error(`[runner:${event}] ${line}`);
    return;
  }
  console.info(`[runner:${event}] ${line}`);
}
function resourceGroupFor(actionClass) {
  return `openclaw.cli.${actionClass}`;
}
function resolveRunOptions(options) {
  if (options.policyKey) {
    const policy = getOpenclawCliPolicy(options.policyKey);
    return {
      args: options.args,
      timeoutMs: options.timeoutMs ?? policy.timeoutMs,
      maxStdoutBytes: options.maxStdoutBytes ?? policy.maxStdoutBytes,
      maxStderrBytes: options.maxStderrBytes ?? policy.maxStderrBytes,
      env: options.env,
      tag: options.tag ?? policy.tag,
      description: options.description ?? policy.description,
      actionClass: options.actionClass ?? policy.actionClass,
      metadata: {
        policyKey: policy.key,
        policyTag: policy.tag,
        actionClass: options.actionClass ?? policy.actionClass,
        timeoutMs: options.timeoutMs ?? policy.timeoutMs,
        maxStdoutBytes: options.maxStdoutBytes ?? policy.maxStdoutBytes,
        maxStderrBytes: options.maxStderrBytes ?? policy.maxStderrBytes,
        ...options.metadata || {}
      }
    };
  }
  if (typeof options.timeoutMs !== "number" || typeof options.maxStdoutBytes !== "number" || typeof options.maxStderrBytes !== "number" || !options.tag) {
    throw new Error("runOpenclawCli requires either policyKey or explicit timeout/tag/byte limits");
  }
  return {
    args: options.args,
    timeoutMs: options.timeoutMs,
    maxStdoutBytes: options.maxStdoutBytes,
    maxStderrBytes: options.maxStderrBytes,
    env: options.env,
    tag: options.tag,
    description: options.description ?? options.tag,
    actionClass: options.actionClass ?? "query",
    metadata: {
      actionClass: options.actionClass ?? "query",
      timeoutMs: options.timeoutMs,
      maxStdoutBytes: options.maxStdoutBytes,
      maxStderrBytes: options.maxStderrBytes,
      ...options.metadata || {}
    }
  };
}
function getOpenclawCliGovernorSnapshot() {
  return openclawCliGovernor.getSnapshot();
}
async function runOpenclawCli(instance, options) {
  const resolved = resolveRunOptions(options);
  const compatResult = await ensureManagedOpenclawPluginSdkCompat(instance);
  if (compatResult.checked && compatResult.events.length > 0) {
    for (const event of compatResult.events) {
      console.info(`[openclaw:compat] mode=${event.mode} target=${event.target} status=${event.status} path=${event.filePath}`);
    }
  }
  const binaryPath = await requireOpenclawBinary(instance);
  const command = [binaryPath, ...resolved.args];
  const submittedAt = Date.now();
  const submitted = openclawCliGovernor.runTask({
    resourceGroup: resourceGroupFor(resolved.actionClass),
    description: resolved.description,
    command,
    tags: {
      instanceId: instance.id,
      tag: resolved.tag,
      actionClass: resolved.actionClass
    },
    metadata: {
      ...resolved.metadata,
      instanceId: instance.id,
      command
    }
  }, async () => {
    logRunnerEvent("start", {
      tag: resolved.tag,
      instanceId: instance.id,
      command: command.join(" "),
      actionClass: resolved.actionClass,
      queuedMs: Date.now() - submittedAt,
      timeoutMs: resolved.timeoutMs,
      maxStdoutBytes: resolved.maxStdoutBytes,
      maxStderrBytes: resolved.maxStderrBytes
    });
    const result = await runProcess({
      command,
      cwd: openclawSpawnCwd(instance),
      env: {
        ...openclawEnv(instance),
        ...resolved.env || {}
      },
      timeoutMs: resolved.timeoutMs,
      maxStdoutBytes: resolved.maxStdoutBytes,
      maxStderrBytes: resolved.maxStderrBytes,
      tag: resolved.tag,
      metadata: resolved.metadata,
      tags: {
        instanceId: instance.id,
        actionClass: resolved.actionClass
      }
    });
    const fields = {
      tag: resolved.tag,
      instanceId: instance.id,
      command: command.join(" "),
      actionClass: resolved.actionClass,
      durationMs: result.durationMs,
      exitCode: result.exitCode,
      timedOut: result.timedOut,
      stdoutBytes: result.stdoutBytes,
      stderrBytes: result.stderrBytes,
      stdoutTruncated: result.stdoutTruncated,
      stderrTruncated: result.stderrTruncated,
      failureKind: result.failureKind
    };
    if (result.failureKind) {
      logRunnerEvent("fail", fields);
    } else {
      logRunnerEvent("finish", fields);
    }
    return result;
  });
  const snapshot = openclawCliGovernor.getSnapshot();
  logRunnerEvent("accepted", {
    taskId: submitted.taskId,
    tag: resolved.tag,
    instanceId: instance.id,
    command: command.join(" "),
    actionClass: resolved.actionClass,
    queueDepth: snapshot.queueDepth,
    runningCount: snapshot.runningCount,
    timeoutMs: resolved.timeoutMs
  });
  return submitted.promise;
}

// src/lib/refresh-queue.ts
var refreshGovernor = createProcessGovernor({
  globalConcurrency: 1,
  resourceConcurrency: {
    "openclaw.refresh": 1
  },
  historyLimit: 200,
  logger: () => {}
});
var REFRESH_GOVERNOR_ID = "openclaw.refresh";
var REFRESH_GOVERNOR_LABEL = "OpenClaw Refresh Governor";
var refreshTaskState = new Map;
function ensureRefreshRecord(taskKey) {
  const existing = refreshTaskState.get(taskKey);
  if (existing) {
    return existing;
  }
  const created = {
    promise: null,
    refreshing: false,
    lastStartedAt: null,
    lastFinishedAt: null,
    lastDurationMs: null
  };
  refreshTaskState.set(taskKey, created);
  return created;
}
function logRefreshEvent(event, fields) {
  const line = Object.entries(fields).filter(([, value]) => value !== undefined).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(" ");
  if (event === "failure") {
    console.error(`[refresh:${event}] ${line}`);
    return;
  }
  console.info(`[refresh:${event}] ${line}`);
}
function getRefreshState(taskKey) {
  const record = ensureRefreshRecord(taskKey);
  return {
    refreshing: record.refreshing,
    lastStartedAt: record.lastStartedAt,
    lastFinishedAt: record.lastFinishedAt,
    lastDurationMs: record.lastDurationMs
  };
}
function getRefreshGovernorSnapshot() {
  return refreshGovernor.getSnapshot();
}
function enqueueRefreshTask(options) {
  const record = ensureRefreshRecord(options.taskKey);
  if (record.promise) {
    logRefreshEvent("deduplicated", {
      taskKey: options.taskKey,
      reason: "in_flight",
      queueSize: refreshGovernor.listQueued().length,
      pending: refreshGovernor.listRunning().length
    });
    return {
      accepted: true,
      deduplicated: true,
      taskKey: options.taskKey,
      refreshing: true,
      promise: record.promise
    };
  }
  const submitted = refreshGovernor.runTask({
    key: options.taskKey,
    singleFlightKey: options.taskKey,
    cooldownMs: options.cooldownMs,
    force: Boolean(options.force),
    resourceGroup: "openclaw.refresh",
    description: `refresh:${options.taskKey}`
  }, async () => {
    const startedAt = Date.now();
    record.refreshing = true;
    record.lastStartedAt = startedAt;
    logRefreshEvent("start", {
      taskKey: options.taskKey,
      queueSize: refreshGovernor.listQueued().length,
      pending: refreshGovernor.listRunning().length
    });
    try {
      const result = await options.task();
      const durationMs = Date.now() - startedAt;
      record.lastFinishedAt = Date.now();
      record.lastDurationMs = durationMs;
      logRefreshEvent("success", {
        taskKey: options.taskKey,
        durationMs
      });
      return result;
    } catch (error) {
      const durationMs = Date.now() - startedAt;
      record.lastFinishedAt = Date.now();
      record.lastDurationMs = durationMs;
      logRefreshEvent("failure", {
        taskKey: options.taskKey,
        durationMs,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    } finally {
      record.refreshing = false;
      record.promise = null;
    }
  });
  if (submitted.skippedCooldown) {
    logRefreshEvent("skipped", {
      taskKey: options.taskKey,
      reason: "cooldown",
      cooldownMs: options.cooldownMs,
      remainingMs: submitted.cooldownRemainingMs ?? options.cooldownMs
    });
    return {
      accepted: true,
      deduplicated: true,
      taskKey: options.taskKey,
      refreshing: false,
      promise: null
    };
  }
  if (submitted.deduplicated) {
    logRefreshEvent("deduplicated", {
      taskKey: options.taskKey,
      reason: "in_flight",
      queueSize: refreshGovernor.listQueued().length,
      pending: refreshGovernor.listRunning().length
    });
    return {
      accepted: true,
      deduplicated: true,
      taskKey: options.taskKey,
      refreshing: true,
      promise: submitted.promise
    };
  }
  logRefreshEvent("accepted", {
    taskKey: options.taskKey,
    cooldownMs: options.cooldownMs,
    force: Boolean(options.force),
    queueSize: refreshGovernor.listQueued().length,
    pending: refreshGovernor.listRunning().length
  });
  record.promise = submitted.promise;
  record.refreshing = true;
  return {
    accepted: true,
    deduplicated: false,
    taskKey: options.taskKey,
    refreshing: true,
    promise: submitted.promise
  };
}

// src/lib/openclaw-weixin-runtime-compat.ts
import { existsSync as existsSync3, readFileSync as readFileSync4, writeFileSync as writeFileSync2 } from "fs";
import { join as join4 } from "path";
var WEIXIN_PLUGIN_ID = "openclaw-weixin";
var WEIXIN_PLUGIN_PACKAGE_SCOPE = "@tencent-weixin";
var WEIXIN_COMPAT_SENTINEL = "fn-openclaw-weixin-channelRuntime-compat";
var WEIXIN_CONTENT_LENGTH_HEADER = `        "Content-Length": String(Buffer.byteLength(opts.body, "utf-8")),
`;
function weixinInstallRootCandidates(instance) {
  return Array.from(new Set([
    join4(instance.homeDir, ".openclaw", "extensions", WEIXIN_PLUGIN_ID),
    join4(instance.homeDir, ".openclaw", "npm", "node_modules", WEIXIN_PLUGIN_PACKAGE_SCOPE, WEIXIN_PLUGIN_ID),
    join4(instance.homeDir, ".openclaw", "npm", "node_modules", WEIXIN_PLUGIN_ID)
  ]));
}
function readPluginVersion(pluginRoot) {
  const packageJsonPath = join4(pluginRoot, "package.json");
  if (!existsSync3(packageJsonPath)) {
    return null;
  }
  try {
    const packageJson = JSON.parse(readFileSync4(packageJsonPath, "utf8"));
    return typeof packageJson.version === "string" ? packageJson.version.trim() || null : null;
  } catch {
    return null;
  }
}
function patchChannelSource(source) {
  if (source.includes("channelRuntime: ctx.channelRuntime")) {
    return source;
  }
  const target = `                runtime: ctx.runtime,
                abortSignal: ctx.abortSignal,`;
  if (!source.includes(target)) {
    return null;
  }
  return source.replace(target, `                runtime: ctx.runtime,
                channelRuntime: ctx.channelRuntime,
                abortSignal: ctx.abortSignal,`);
}
function patchMonitorSource(source) {
  if (source.includes(WEIXIN_COMPAT_SENTINEL)) {
    return source;
  }
  const target = `    aLog.info(\`waiting for Weixin runtime...\`);
    let channelRuntime;
    try {
        const pluginRuntime = await waitForWeixinRuntime();
        channelRuntime = pluginRuntime.channel;
        aLog.info(\`Weixin runtime acquired, channelRuntime type: \${typeof channelRuntime}\`);
    }
    catch (err) {
        aLog.error(\`waitForWeixinRuntime() failed: \${String(err)}\`);
        throw err;
    }`;
  if (!source.includes(target)) {
    return null;
  }
  const replacement = `    aLog.info(\`waiting for Weixin runtime...\`);
    let channelRuntime = opts.channelRuntime;
    if (channelRuntime) {
        aLog.info(\`Weixin runtime acquired from ChannelGatewayContext, channelRuntime type: \${typeof channelRuntime}\`);
    }
    else {
        try {
            const pluginRuntime = await waitForWeixinRuntime();
            channelRuntime = pluginRuntime.channel;
            aLog.info(\`Weixin runtime acquired, channelRuntime type: \${typeof channelRuntime}\`);
        }
        catch (err) {
            aLog.error(\`waitForWeixinRuntime() failed: \${String(err)}\`);
            throw err;
        }
    }
    // ${WEIXIN_COMPAT_SENTINEL}`;
  return source.replace(target, replacement);
}
function patchApiSource(source) {
  if (!source.includes('"Content-Length"')) {
    return source;
  }
  if (!source.includes(WEIXIN_CONTENT_LENGTH_HEADER)) {
    return null;
  }
  return source.replace(WEIXIN_CONTENT_LENGTH_HEADER, "");
}
function patchFile(path, patcher) {
  const source = readFileSync4(path, "utf8");
  const patched = patcher(source);
  if (patched === null) {
    throw new Error(`Unexpected Weixin plugin source shape: ${path}`);
  }
  if (patched === source) {
    return false;
  }
  writeFileSync2(path, patched, "utf8");
  return true;
}
function applyWeixinRuntimeCompatPatch(instance) {
  if (usesSystemOpenclaw(instance)) {
    return {
      changed: false,
      checked: false,
      message: null,
      patchedFiles: []
    };
  }
  const pluginRoots = weixinInstallRootCandidates(instance).filter((candidate) => existsSync3(candidate));
  if (pluginRoots.length === 0) {
    return {
      changed: false,
      checked: false,
      message: null,
      patchedFiles: []
    };
  }
  const patchedFiles = [];
  for (const pluginRoot of pluginRoots) {
    const version = readPluginVersion(pluginRoot);
    if (version !== OPENCLAW_WEIXIN_PLUGIN_VERSION) {
      continue;
    }
    const channelPath = join4(pluginRoot, "dist", "src", "channel.js");
    const monitorPath = join4(pluginRoot, "dist", "src", "monitor", "monitor.js");
    const apiPath = join4(pluginRoot, "dist", "src", "api", "api.js");
    if (!existsSync3(channelPath) || !existsSync3(monitorPath) || !existsSync3(apiPath)) {
      throw new Error(`Weixin plugin runtime compat patch failed: compiled plugin files are missing under ${pluginRoot}.`);
    }
    if (patchFile(channelPath, patchChannelSource)) {
      patchedFiles.push(channelPath);
    }
    if (patchFile(monitorPath, patchMonitorSource)) {
      patchedFiles.push(monitorPath);
    }
    if (patchFile(apiPath, patchApiSource)) {
      patchedFiles.push(apiPath);
    }
  }
  return {
    changed: patchedFiles.length > 0,
    checked: true,
    message: patchedFiles.length > 0 ? "\u5DF2\u4FEE\u590D Weixin \u63D2\u4EF6\u5728 OpenClaw \u4E0B\u7684 channelRuntime \u521D\u59CB\u5316\u548C Node fetch header \u517C\u5BB9\u6027\u3002" : null,
    patchedFiles
  };
}

// src/lib/channels.ts
var MANAGED_CHANNEL_KEYS = ["feishu", "wecom", "dingtalk", "weixin", "qqbot"];
var DEFAULT_QQBOT_ACCOUNT_ID = "default";
var VALID_QQBOT_ACCOUNT_ID_RE = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
var QQBOT_BLOCKED_ACCOUNT_IDS = new Set(["__proto__", "prototype", "constructor"]);
var WECOM_CHANNEL_CONFIG_KEY = "wecom";
var DINGTALK_CHANNEL_CONFIG_KEY = "dingtalk-connector";
var INVALID_DINGTALK_CHANNEL_CONFIG_KEYS = ["dingtalk", DINGTALK_CHANNEL_CONFIG_KEY];
var AUTO_PRUNABLE_UNKNOWN_CHANNEL_CONFIG_KEYS = [
  WECOM_CHANNEL_CONFIG_KEY,
  ...INVALID_DINGTALK_CHANNEL_CONFIG_KEYS
];
var NPM_REPLACE_REGISTRY_HOST = "always";
var DINGTALK_DM_POLICY_VALUES = new Set(["open", "pairing", "allowlist"]);
var DINGTALK_GROUP_POLICY_VALUES = new Set(["open", "allowlist", "disabled"]);
var DINGTALK_GROUP_SESSION_SCOPE_VALUES = new Set(["group", "group_sender"]);
var DINGTALK_GROUP_REPLY_MODE_VALUES = new Set(["aicard", "text", "markdown"]);
var DINGTALK_SECRET_SOURCE_VALUES = new Set(["env", "file", "exec"]);
var IGNORABLE_PLUGIN_ALLOW_WARNING_BLOCK_RE = /\[plugins\] plugins\.allow is empty; discovered non-bundled plugins[\s\S]*?Set plugins\.allow to explicit trusted id\.?/g;
var CHANNEL_PLUGINS_FRONTEND_POLL_WINDOW_MS = getOpenclawCliPolicy("channels.plugins.list").timeoutMs;
function formatChannelLogFields(fields) {
  if (!fields) {
    return "";
  }
  const serialized = Object.entries(fields).filter(([, value]) => value !== undefined).map(([key, value]) => {
    try {
      return `${key}=${JSON.stringify(value)}`;
    } catch {
      return `${key}=${JSON.stringify(String(value))}`;
    }
  });
  return serialized.length > 0 ? ` ${serialized.join(" ")}` : "";
}
function logChannelStep(level, step, fields) {
  const line = `[channels:${step}]${formatChannelLogFields(fields)}`;
  if (level === "error") {
    console.error(line);
    return;
  }
  if (level === "warn") {
    console.warn(line);
    return;
  }
  console.info(line);
}
function errorMessage2(error) {
  return error instanceof Error ? error.message : String(error);
}
function buildPluginLifecycleNpmEnv() {
  return {
    NPM_CONFIG_REGISTRY: OPENCLAW_NPM_REGISTRY,
    npm_config_registry: OPENCLAW_NPM_REGISTRY,
    NPM_CONFIG_REPLACE_REGISTRY_HOST: NPM_REPLACE_REGISTRY_HOST,
    npm_config_replace_registry_host: NPM_REPLACE_REGISTRY_HOST
  };
}
function hasConfiguredProxy(env) {
  return Boolean(env.npm_config_proxy || env.npm_config_https_proxy || env.NPM_CONFIG_PROXY || env.NPM_CONFIG_HTTPS_PROXY || env.HTTP_PROXY || env.HTTPS_PROXY || env.http_proxy || env.https_proxy);
}
var CHANNEL_PLUGIN_LEGACY_IDS = {
  qqbot: ["openclaw-qqbot"]
};
var CHANNEL_PLUGINS_CACHE_MAX = 16;
var CHANNEL_PLUGINS_REFRESH_TASK_KEY = "channels.plugins.default";
var CHANNEL_PLUGINS_FRESH_MS = 60000;
var CHANNEL_PLUGINS_COOLDOWN_MS = 30000;
var pluginsCache = new L({
  max: CHANNEL_PLUGINS_CACHE_MAX
});
var channelsConfigNormalizationInFlight = new Map;
function channelPluginsSnapshotPath(instance) {
  return `${instance.stateDir}/channel-plugins.snapshot.json`;
}
function channelPluginsMetaPath(instance) {
  return `${instance.stateDir}/channel-plugins.snapshot.meta.json`;
}
function pluginInstallRecordsPath(instance) {
  return join5(instance.homeDir, ".openclaw", "plugins", "installs.json");
}
function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function asString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}
function asStringArray(value) {
  return Array.isArray(value) ? value.map((entry) => asString(entry)).filter((entry) => entry !== null) : [];
}
function asBoolean(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function asNumber(value, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function normalizeQQBotAccountId(value) {
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed === DEFAULT_QQBOT_ACCOUNT_ID) {
    return DEFAULT_QQBOT_ACCOUNT_ID;
  }
  if (!VALID_QQBOT_ACCOUNT_ID_RE.test(trimmed) || QQBOT_BLOCKED_ACCOUNT_IDS.has(trimmed)) {
    throw new Error("QQ Bot \u8D26\u53F7 ID \u53EA\u80FD\u4F7F\u7528\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\u548C\u4E2D\u5212\u7EBF\uFF0C\u4E14\u4E0D\u80FD\u4EE5\u7279\u6B8A\u5BF9\u8C61\u952E\u547D\u540D\u3002");
  }
  return trimmed;
}
function splitQQBotSection(section) {
  const defaultAccount = {};
  for (const [key, value] of Object.entries(section)) {
    if (key === "accounts") {
      continue;
    }
    defaultAccount[key] = value;
  }
  return {
    defaultAccount,
    accounts: asObject(section.accounts)
  };
}
function sanitizeQQBotAccountIdCandidate(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return "bot";
  }
  const sanitized = trimmed.replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+/g, "").replace(/-+$/g, "").slice(0, 64);
  if (!sanitized || QQBOT_BLOCKED_ACCOUNT_IDS.has(sanitized)) {
    return "bot";
  }
  if (!VALID_QQBOT_ACCOUNT_ID_RE.test(sanitized)) {
    return "bot";
  }
  return sanitized;
}
function allocateQQBotAccountId(accounts, defaultAccount) {
  const existingIds = new Set(objectKeys(accounts));
  const baseId = sanitizeQQBotAccountIdCandidate(asString(defaultAccount.appId) || asString(defaultAccount.name) || "bot");
  if (!existingIds.has(baseId) && baseId !== DEFAULT_QQBOT_ACCOUNT_ID) {
    return baseId;
  }
  let suffix = 2;
  while (existingIds.has(`${baseId}-${suffix}`) || `${baseId}-${suffix}` === DEFAULT_QQBOT_ACCOUNT_ID) {
    suffix += 1;
  }
  return `${baseId}-${suffix}`;
}
function isDecorativeCliLine(line) {
  return /^[\u2502\u25C7\u251C\u256E\u256F\u2570\u2500\s]+$/.test(line);
}
function isIgnorableCliNoiseLine(line) {
  return line === "{}";
}
function isIgnorablePluginWarning(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return true;
  }
  return trimmed === "Config warnings:" || trimmed.startsWith("[plugins] plugins.allow is empty;") || trimmed.includes("loaded without install/load-path provenance;") || trimmed.startsWith("[plugins] feishu_") || trimmed.startsWith("[plugins] dingtalk-connector:") || trimmed.startsWith("[wecom] ") || trimmed.startsWith("may auto-load:") || trimmed.startsWith("Set plugins.allow to explicit trusted id") || trimmed.startsWith("- plugins.entries.skillhub: plugin not found: skillhub") || trimmed.startsWith("[plugins] plugins.allow is empty; discovered non-bundled plugins may auto-load:") || isDecorativeCliLine(trimmed);
}
function isStructuredJsonPayload(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  const first = trimmed[0];
  if (first !== "{" && first !== "[") {
    return false;
  }
  try {
    const parsed = JSON.parse(trimmed);
    return typeof parsed === "object" && parsed !== null;
  } catch {
    return false;
  }
}
function stripIgnorableCliBlocks(value) {
  if (!value) {
    return value;
  }
  return value.replace(IGNORABLE_PLUGIN_ALLOW_WARNING_BLOCK_RE, "");
}
function sanitizeCliFailureMessage(stderr, stdout) {
  const sanitizedStdout = stripIgnorableCliBlocks(stdout);
  const preferredLines = [stripIgnorableCliBlocks(stderr), isStructuredJsonPayload(sanitizedStdout) ? "" : sanitizedStdout].map(stripIgnorableCliBlocks).flatMap((value) => value.split(/\r?\n/)).map((line) => line.trim()).filter((line) => line.length > 0 && !isIgnorablePluginWarning(line) && !isIgnorableCliNoiseLine(line));
  if (preferredLines.length > 0) {
    return preferredLines.join(`
`);
  }
  const fallback = [stripIgnorableCliBlocks(stderr), isStructuredJsonPayload(sanitizedStdout) ? "" : sanitizedStdout].map(stripIgnorableCliBlocks).map((value) => value.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0 && !isIgnorableCliNoiseLine(line)).join(`
`).trim()).find((value) => value.length > 0) || "";
  return fallback;
}
function formatOpenclawCommandError(args, result) {
  const sanitizedFailure = sanitizeCliFailureMessage(result.stderr, result.stdout);
  if (sanitizedFailure) {
    return sanitizedFailure;
  }
  const command = `openclaw ${args.join(" ")}`;
  if (result.failureKind === "timeout") {
    return `${command} failed (timeout after ${result.durationMs}ms)`;
  }
  if (result.failureKind) {
    return `${command} failed (${result.failureKind})`;
  }
  return `${command} failed`;
}
async function readConfigFile2(path) {
  return readLooseConfigFile(path);
}
function isChannelsSnapshotStale(fetchedAt) {
  if (!fetchedAt) {
    return true;
  }
  return Date.now() - fetchedAt > CHANNEL_PLUGINS_FRESH_MS;
}
function emptyChannelPluginsEnvelope(source, overrides) {
  return {
    ...emptyChannelPluginsResponse(),
    fetchedAt: null,
    refreshing: false,
    stale: true,
    source,
    lastError: null,
    refreshWindowMs: CHANNEL_PLUGINS_FRONTEND_POLL_WINDOW_MS,
    ...overrides || {}
  };
}
async function tryResolveOpenclawBinary(instance) {
  return resolveOpenclawBinary(instance);
}
async function runOpenclawCommand(instance, args, options) {
  return runOpenclawCli(instance, {
    args,
    policyKey: options?.policyKey,
    tag: options?.tag,
    description: options?.description,
    env: options?.env
  });
}
async function loadConfigValidation(instance, configPath) {
  logChannelStep("info", "config.validate.prepare", {
    instanceId: instance.id,
    configPath
  });
  const binaryPath = await tryResolveOpenclawBinary(instance);
  const configExists = existsSync4(configPath);
  if (!binaryPath || !configExists) {
    logChannelStep("info", "config.validate.skip", {
      instanceId: instance.id,
      reason: !binaryPath ? "missing_binary" : "missing_config",
      configPath
    });
    return null;
  }
  logChannelStep("info", "config.validate.run", {
    instanceId: instance.id,
    configPath
  });
  const result = await runOpenclawCommand(instance, ["config", "validate", "--json"], {
    policyKey: "channels.config.validate"
  });
  try {
    const validation = parseJsonFromCommandOutput([result.stdout, result.stderr].filter(Boolean).join(`
`));
    const normalizedValidation = {
      ...validation,
      path: validation.path || configPath
    };
    logChannelStep(result.exitCode === 0 ? "info" : "warn", "config.validate.parsed", {
      instanceId: instance.id,
      configPath: normalizedValidation.path,
      valid: Boolean(normalizedValidation.valid),
      issueCount: Array.isArray(normalizedValidation.issues) ? normalizedValidation.issues.length : 0,
      hasError: Boolean(normalizedValidation.error || (normalizedValidation.errors?.length ?? 0) > 0),
      exitCode: result.exitCode
    });
    return normalizedValidation;
  } catch {
    logChannelStep(result.exitCode === 0 ? "error" : "warn", "config.validate.parse_failed", {
      instanceId: instance.id,
      configPath,
      exitCode: result.exitCode,
      stdoutBytes: result.stdoutBytes,
      stderrBytes: result.stderrBytes
    });
    if (result.exitCode !== 0) {
      throw new Error(formatOpenclawCommandError(["config", "validate", "--json"], result));
    }
    throw new Error("Invalid JSON from openclaw config validate --json");
  }
}
function summarizeValidationMessage(validation) {
  if (Array.isArray(validation.issues) && validation.issues.length > 0) {
    return validation.issues.map((issue) => {
      const path = typeof issue?.path === "string" && issue.path.trim() ? `${issue.path}: ` : "";
      const message = typeof issue?.message === "string" && issue.message.trim() ? issue.message.trim() : "unknown config issue";
      return `${path}${message}`;
    }).join("; ");
  }
  if (Array.isArray(validation.errors) && validation.errors.length > 0) {
    return validation.errors.join("; ");
  }
  return validation.error || undefined;
}
function issueMessage(issue) {
  return typeof issue?.message === "string" && issue.message.trim() ? issue.message.trim() : "unknown config issue";
}
function mergeNotices(...groups) {
  const merged = groups.flatMap((group) => group || []);
  if (merged.length === 0) {
    return;
  }
  return Array.from(new Set(merged));
}
function noticeCount(notices) {
  return notices?.length ?? 0;
}
async function getActiveConfigPath(instance) {
  return activeConfigPath(instance);
}
async function readChannelPluginsMeta(instance) {
  const metaPath = channelPluginsMetaPath(instance);
  if (!existsSync4(metaPath)) {
    return {
      fetchedAt: null,
      lastError: null
    };
  }
  try {
    const raw2 = await readLooseConfigFile(metaPath);
    return {
      fetchedAt: typeof raw2.fetchedAt === "number" && Number.isFinite(raw2.fetchedAt) ? raw2.fetchedAt : null,
      lastError: asString(raw2.lastError)
    };
  } catch (error) {
    console.warn("[channels] failed to read plugins snapshot meta", error);
    return {
      fetchedAt: null,
      lastError: null
    };
  }
}
async function writeChannelPluginsMeta(instance, meta) {
  mkdirSync5(instance.stateDir, { recursive: true });
  await Bun.write(channelPluginsMetaPath(instance), `${JSON.stringify({
    fetchedAt: meta.fetchedAt,
    lastError: meta.lastError
  }, null, 2)}
`);
}
async function readChannelPluginsSnapshotData(instance) {
  const snapshotPath = channelPluginsSnapshotPath(instance);
  if (!existsSync4(snapshotPath)) {
    return null;
  }
  try {
    const raw2 = await readLooseConfigFile(snapshotPath);
    return {
      plugins: Array.isArray(raw2.plugins) ? raw2.plugins.flatMap((entry) => {
        const normalized = normalizeStoredPluginStatus(entry);
        return normalized ? [normalized] : [];
      }) : emptyChannelPluginsResponse().plugins,
      notices: Array.isArray(raw2.notices) ? raw2.notices.filter((value) => typeof value === "string" && value.trim().length > 0) : undefined
    };
  } catch (error) {
    console.warn("[channels] failed to read plugins snapshot", error);
    return null;
  }
}
async function writeChannelPluginsSnapshotData(instance, snapshot) {
  mkdirSync5(instance.stateDir, { recursive: true });
  await Bun.write(channelPluginsSnapshotPath(instance), `${JSON.stringify({
    plugins: snapshot.plugins,
    notices: snapshot.notices
  }, null, 2)}
`);
}
function makeJsonArg(value) {
  return JSON.stringify(value);
}
function originFromSourcePath(sourcePath, origin) {
  if (origin === "bundled") {
    return "bundled";
  }
  if (origin === "package") {
    return "package";
  }
  if (typeof sourcePath !== "string" || sourcePath.trim().length === 0) {
    return "unknown";
  }
  const normalizedPath = sourcePath.replace(/\\/g, "/");
  return normalizedPath.includes("/extensions/") || normalizedPath.includes("/.openclaw/npm/node_modules/") || normalizedPath.includes("/npm/node_modules/") ? "package" : "unknown";
}
function normalizePluginRecord(record) {
  const sourcePath = asString(record.source);
  const origin = originFromSourcePath(sourcePath, asString(record.origin)?.toLowerCase() || null);
  const error = asString(record.error);
  return {
    status: asString(record.status),
    sourcePath,
    origin,
    version: asString(record.version),
    error: origin === "bundled" && error === "bundled (disabled by default)" ? null : error
  };
}
function parsePluginCatalogResponse(raw2) {
  if (Array.isArray(raw2)) {
    return raw2.filter((entry) => Boolean(entry && typeof entry === "object"));
  }
  const payload = asObject(raw2);
  if (Array.isArray(payload.plugins)) {
    return payload.plugins.filter((entry) => Boolean(entry && typeof entry === "object"));
  }
  if (Array.isArray(payload.items)) {
    return payload.items.filter((entry) => Boolean(entry && typeof entry === "object"));
  }
  return [];
}
function channelPluginCandidateIds(descriptor) {
  return Array.from(new Set([
    descriptor.pluginId,
    descriptor.channelKey,
    ...CHANNEL_PLUGIN_LEGACY_IDS[descriptor.channelKey] || []
  ]));
}
function extractPinnedPackageVersion(packageSpec) {
  const match2 = packageSpec.match(/@([^@]+)$/);
  return match2?.[1]?.trim() || null;
}
function pluginRecordChannelIds(entry) {
  return Array.from(new Set([
    ...asStringArray(entry.channelIds),
    ...asStringArray(asObject(entry.channel).aliases),
    ...asStringArray(asObject(asObject(entry.openclaw).channel).aliases),
    asString(entry.channelId),
    asString(asObject(entry.channel).id),
    asString(asObject(asObject(entry.openclaw).channel).id),
    asString(entry.id)
  ].filter((value) => Boolean(value))));
}
function normalizeStoredPluginStatus(raw2) {
  const record = asObject(raw2);
  const rawChannelKey = asString(record.channelKey) || asString(record.pluginId);
  const channelKey = rawChannelKey === "feishu" || rawChannelKey === "wecom" || rawChannelKey === "dingtalk" || rawChannelKey === "weixin" || rawChannelKey === "qqbot" ? rawChannelKey : rawChannelKey === "dingtalk-connector" ? "dingtalk" : rawChannelKey === "openclaw-qqbot" ? "qqbot" : null;
  if (!channelKey) {
    return null;
  }
  const descriptor = pluginDescriptor(channelKey);
  const source = asString(record.source) || asString(record.sourceKind);
  const normalizedSource = source === "bundled" || source === "package" || source === "unknown" ? source : "unknown";
  const effectiveSource = descriptor.managementMode === "bundled_first" && normalizedSource !== "package" ? "bundled" : normalizedSource;
  const expectedVersion = extractPinnedPackageVersion(descriptor.packageSpec);
  const resolvedVersion = asString(record.version);
  const versionMismatch = Boolean(descriptor.managementMode === "install_managed" && expectedVersion && resolvedVersion && resolvedVersion !== expectedVersion);
  const installed = descriptor.managementMode === "install_managed" ? Boolean(record.installed) || normalizedSource !== "unknown" : typeof record.installed === "boolean" ? record.installed : normalizedSource !== "unknown";
  const inferredAction = normalizedSource === "bundled" ? "none" : versionMismatch || installed ? "reinstall" : "install";
  const action = descriptor.managementMode === "bundled_first" ? "none" : asString(record.action) || inferredAction;
  return {
    ...descriptor,
    installed,
    source: effectiveSource,
    action,
    actionLabel: asString(record.actionLabel) || (action === "none" ? "\u5185\u7F6E" : action === "reinstall" ? "\u91CD\u88C5" : "\u5B89\u88C5"),
    requiresRestart: typeof record.requiresRestart === "boolean" ? record.requiresRestart : descriptor.requiresRestart,
    sourcePath: asString(record.sourcePath),
    version: resolvedVersion,
    error: asString(record.error),
    note: descriptor.note
  };
}
function readConfigValueAtPath(config, path) {
  return path.split(".").filter((segment) => segment.length > 0).reduce((current, segment) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return;
    }
    return current[segment];
  }, config);
}
async function didConfigMutationPersist(instance, path, expectedValue) {
  const configPath = await getActiveConfigPath(instance);
  if (!existsSync4(configPath)) {
    return false;
  }
  const currentConfig = await readConfigFile2(configPath);
  return isDeepStrictEqual(readConfigValueAtPath(currentConfig, path), expectedValue);
}
async function setConfigValue(instance, path, value) {
  const result = await runOpenclawCommand(instance, ["config", "set", path, makeJsonArg(value), "--strict-json"], {
    policyKey: "channels.config.set"
  });
  if (result.exitCode === 0) {
    return;
  }
  if (await didConfigMutationPersist(instance, path, value)) {
    return;
  }
  throw new Error(formatOpenclawCommandError(["config", "set", path, "--strict-json"], result));
}
function assignOrDelete(target, key, value) {
  if (value === undefined || value === null || typeof value === "string" && value.trim().length === 0 || Array.isArray(value) && value.length === 0) {
    delete target[key];
    return;
  }
  target[key] = value;
}
function objectKeys(value) {
  return Object.keys(asObject(value)).sort();
}
function hasNamedAccounts(value) {
  return objectKeys(value).length > 0;
}
function readonlyReasonForNamedAccounts(label) {
  return `${label} \u5F53\u524D\u4F7F\u7528 OpenClaw \u5B98\u65B9\u591A\u8D26\u53F7\u6A21\u5F0F\uFF0Cmonitor \u53EA\u8BFB\u5C55\u793A\uFF0C\u907F\u514D\u8BEF\u6539\u547D\u540D\u8D26\u53F7\u914D\u7F6E\u3002`;
}
function readDingtalkChannelConfig(channelsConfig) {
  return asObject(channelsConfig[DINGTALK_CHANNEL_CONFIG_KEY]);
}
function asDingtalkClientSecret(value) {
  const textValue = asString(value);
  if (textValue) {
    return textValue;
  }
  const objectValue = asObject(value);
  const source = asString(objectValue.source);
  const provider = asString(objectValue.provider);
  const id = asString(objectValue.id);
  if (source && DINGTALK_SECRET_SOURCE_VALUES.has(source) && provider && id) {
    return { source, provider, id };
  }
  return null;
}
function asStringOrNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  return asString(value);
}
function asStringOrNumberArray(value) {
  if (!Array.isArray(value)) {
    return null;
  }
  const entries = value.map((entry) => asStringOrNumber(entry)).filter((entry) => entry !== null);
  return entries.length > 0 ? entries : null;
}
function copyStringField(source, target, key) {
  const value = asString(source[key]);
  if (value) {
    target[key] = value;
  }
}
function copyBooleanField(source, target, key) {
  if (typeof source[key] === "boolean") {
    target[key] = source[key];
  }
}
function copyIntegerField(source, target, key, options = {}) {
  const value = source[key];
  if (typeof value === "number" && Number.isInteger(value) && (options.min === undefined || value >= options.min) && (options.exclusiveMin === undefined || value > options.exclusiveMin)) {
    target[key] = value;
  }
}
function copyNumberField(source, target, key, options = {}) {
  const value = source[key];
  if (typeof value === "number" && Number.isFinite(value) && (options.exclusiveMin === undefined || value > options.exclusiveMin)) {
    target[key] = value;
  }
}
function copyEnumField(source, target, key, values) {
  const value = asString(source[key]);
  if (value && values.has(value)) {
    target[key] = value;
  }
}
function copyStringOrNumberArrayField(source, target, key) {
  const values = asStringOrNumberArray(source[key]);
  if (values) {
    target[key] = values;
  }
}
function sanitizeDingtalkToolsConfig(value) {
  const raw2 = asObject(value);
  const sanitized = {};
  copyBooleanField(raw2, sanitized, "docs");
  copyBooleanField(raw2, sanitized, "media");
  return Object.keys(sanitized).length > 0 ? sanitized : null;
}
function sanitizeDingtalkGroupsConfig(value) {
  const rawGroups = asObject(value);
  const sanitizedGroups = {};
  for (const [groupId, rawGroupConfig] of Object.entries(rawGroups)) {
    const groupConfig = asObject(rawGroupConfig);
    const sanitizedGroup = {};
    copyBooleanField(groupConfig, sanitizedGroup, "requireMention");
    copyBooleanField(groupConfig, sanitizedGroup, "enabled");
    copyStringOrNumberArrayField(groupConfig, sanitizedGroup, "allowFrom");
    copyStringField(groupConfig, sanitizedGroup, "systemPrompt");
    copyEnumField(groupConfig, sanitizedGroup, "groupSessionScope", DINGTALK_GROUP_SESSION_SCOPE_VALUES);
    const tools = sanitizeDingtalkToolsAllowDenyConfig(groupConfig.tools);
    if (tools) {
      sanitizedGroup.tools = tools;
    }
    if (Object.keys(sanitizedGroup).length > 0) {
      sanitizedGroups[groupId] = sanitizedGroup;
    }
  }
  return Object.keys(sanitizedGroups).length > 0 ? sanitizedGroups : null;
}
function sanitizeDingtalkToolsAllowDenyConfig(value) {
  const raw2 = asObject(value);
  const sanitized = {};
  for (const key of ["allow", "deny"]) {
    const entries = asStringArray(raw2[key]);
    if (entries.length > 0) {
      sanitized[key] = entries;
    }
  }
  return Object.keys(sanitized).length > 0 ? sanitized : null;
}
function sanitizeDingtalkSingleAccountConfig(source) {
  const sanitized = {};
  copyStringField(source, sanitized, "defaultAccount");
  copyBooleanField(source, sanitized, "enableMediaUpload");
  copyStringField(source, sanitized, "systemPrompt");
  copyEnumField(source, sanitized, "dmPolicy", DINGTALK_DM_POLICY_VALUES);
  copyStringOrNumberArrayField(source, sanitized, "allowFrom");
  copyEnumField(source, sanitized, "groupPolicy", DINGTALK_GROUP_POLICY_VALUES);
  copyStringOrNumberArrayField(source, sanitized, "groupAllowFrom");
  copyBooleanField(source, sanitized, "requireMention");
  copyIntegerField(source, sanitized, "historyLimit", { min: 0 });
  copyIntegerField(source, sanitized, "textChunkLimit", { exclusiveMin: 0 });
  copyNumberField(source, sanitized, "mediaMaxMb", { exclusiveMin: 0 });
  copyBooleanField(source, sanitized, "typingIndicator");
  copyBooleanField(source, sanitized, "resolveSenderNames");
  copyBooleanField(source, sanitized, "separateSessionByConversation");
  copyBooleanField(source, sanitized, "sharedMemoryAcrossConversations");
  copyEnumField(source, sanitized, "groupSessionScope", DINGTALK_GROUP_SESSION_SCOPE_VALUES);
  copyBooleanField(source, sanitized, "asyncMode");
  copyStringField(source, sanitized, "ackText");
  copyStringField(source, sanitized, "endpoint");
  copyBooleanField(source, sanitized, "debug");
  copyEnumField(source, sanitized, "groupReplyMode", DINGTALK_GROUP_REPLY_MODE_VALUES);
  const tools = sanitizeDingtalkToolsConfig(source.tools);
  if (tools) {
    sanitized.tools = tools;
  }
  const groups = sanitizeDingtalkGroupsConfig(source.groups);
  if (groups) {
    sanitized.groups = groups;
  }
  return sanitized;
}
function normalizeConfiguredChannelIds(channelsConfig) {
  return Object.keys(channelsConfig).sort();
}
async function validateConfigFile(instance, configPath) {
  const binaryPath = await tryResolveOpenclawBinary(instance);
  const configExists = existsSync4(configPath);
  if (!binaryPath || !configExists) {
    return {
      valid: true,
      path: configPath
    };
  }
  try {
    const validation = await loadConfigValidation(instance, configPath);
    if (!validation) {
      return {
        valid: true,
        path: configPath
      };
    }
    return {
      valid: Boolean(validation.valid),
      message: summarizeValidationMessage(validation),
      path: validation.path || configPath
    };
  } catch (error) {
    return {
      valid: false,
      path: configPath,
      message: error instanceof Error ? error.message : String(error)
    };
  }
}
async function snapshotConfigFile(path) {
  return {
    exists: await Bun.file(path).exists(),
    text: await Bun.file(path).text().catch(() => "")
  };
}
async function restoreConfigFile(path, snapshot) {
  if (snapshot.exists) {
    await Bun.write(path, snapshot.text);
  } else if (await Bun.file(path).exists()) {
    await rm(path, { force: true });
  }
}
async function rewriteConfigFile(instance, configPath, mutate) {
  const currentConfig = await readConfigFile2(configPath);
  const nextConfig = mutate(currentConfig);
  if (!nextConfig) {
    return;
  }
  const originalSnapshot = await snapshotConfigFile(configPath);
  try {
    await Bun.write(configPath, `${JSON.stringify(nextConfig, null, 2)}
`);
    const validation = await validateConfigFile(instance, configPath);
    if (!validation.valid) {
      throw new Error(validation.message || "OpenClaw \u914D\u7F6E\u6821\u9A8C\u5931\u8D25");
    }
    pluginsCache.delete(instance.id);
  } catch (error) {
    await restoreConfigFile(configPath, originalSnapshot);
    throw error;
  }
}
async function saveConfigSection(instance, configPath, mutate) {
  const originalSnapshot = await snapshotConfigFile(configPath);
  try {
    await mutate();
    const validation = await validateConfigFile(instance, configPath);
    if (!validation.valid) {
      throw new Error(validation.message || "Config validation failed");
    }
  } catch (error) {
    await restoreConfigFile(configPath, originalSnapshot);
    throw error;
  }
  return getChannelsConfig(instance);
}
async function rewriteChannelsConfig(instance, configPath, mutate) {
  const currentConfig = await readConfigFile2(configPath);
  const channelsRaw = asObject(currentConfig.channels);
  const nextChannels = mutate(channelsRaw, currentConfig);
  if (!nextChannels) {
    return;
  }
  const originalSnapshot = await snapshotConfigFile(configPath);
  try {
    await Bun.write(configPath, `${JSON.stringify({ ...currentConfig, channels: nextChannels }, null, 2)}
`);
    const validation = await validateConfigFile(instance, configPath);
    if (!validation.valid) {
      throw new Error(validation.message || "OpenClaw \u914D\u7F6E\u6821\u9A8C\u5931\u8D25");
    }
    pluginsCache.delete(instance.id);
  } catch (error) {
    await restoreConfigFile(configPath, originalSnapshot);
    throw error;
  }
}
async function removeWeixinAccountConfig(instance, accountId) {
  const targetAccountId = accountId.trim();
  if (!targetAccountId) {
    return false;
  }
  const configPath = await getActiveConfigPath(instance);
  let removed = false;
  await rewriteChannelsConfig(instance, configPath, (currentChannels) => {
    const currentSection = asObject(currentChannels["openclaw-weixin"]);
    const currentAccounts = asObject(currentSection.accounts);
    if (!(targetAccountId in currentAccounts)) {
      return null;
    }
    const nextAccounts = { ...currentAccounts };
    delete nextAccounts[targetAccountId];
    const nextSection = { ...currentSection };
    if (Object.keys(nextAccounts).length > 0) {
      nextSection.accounts = nextAccounts;
    } else {
      delete nextSection.accounts;
    }
    removed = true;
    if (Object.keys(nextSection).length === 0) {
      const nextChannels = { ...currentChannels };
      delete nextChannels["openclaw-weixin"];
      return nextChannels;
    }
    return {
      ...currentChannels,
      "openclaw-weixin": nextSection
    };
  });
  return removed;
}
async function removeQQBotAccountConfig(instance, accountId) {
  const normalizedAccountId = normalizeQQBotAccountId(accountId);
  const configPath = await getActiveConfigPath(instance);
  let removed = false;
  await rewriteChannelsConfig(instance, configPath, (currentChannels) => {
    const currentSection = asObject(currentChannels.qqbot);
    if (Object.keys(currentSection).length === 0) {
      return null;
    }
    const { defaultAccount, accounts } = splitQQBotSection(currentSection);
    const nextSection = {};
    const nextAccounts = { ...accounts };
    if (normalizedAccountId === DEFAULT_QQBOT_ACCOUNT_ID) {
      if (Object.keys(defaultAccount).length === 0) {
        return null;
      }
      const remainingIds = objectKeys(nextAccounts);
      if (remainingIds.length > 0) {
        const promotedAccountId = remainingIds[0];
        const promotedAccount = asObject(nextAccounts[promotedAccountId]);
        delete nextAccounts[promotedAccountId];
        Object.assign(nextSection, promotedAccount);
      }
      removed = true;
    } else {
      if (!(normalizedAccountId in nextAccounts)) {
        return null;
      }
      delete nextAccounts[normalizedAccountId];
      Object.assign(nextSection, defaultAccount);
      removed = true;
    }
    if (!removed) {
      return null;
    }
    if (Object.keys(nextAccounts).length > 0) {
      nextSection.accounts = nextAccounts;
    }
    if (Object.keys(nextSection).length === 0) {
      const nextChannels = { ...currentChannels };
      delete nextChannels.qqbot;
      return nextChannels;
    }
    return {
      ...currentChannels,
      qqbot: nextSection
    };
  });
  return removed;
}
function collectUnknownManagedChannelConfigKeys(validation) {
  if (!Array.isArray(validation.issues)) {
    return [];
  }
  const keys = new Set;
  for (const issue of validation.issues) {
    const path = typeof issue?.path === "string" ? issue.path.trim() : "";
    const message = typeof issue?.message === "string" ? issue.message.trim().toLowerCase() : "";
    if (!message.includes("unknown channel id")) {
      continue;
    }
    for (const key of AUTO_PRUNABLE_UNKNOWN_CHANNEL_CONFIG_KEYS) {
      if (path === `channels.${key}`) {
        keys.add(key);
      }
    }
  }
  return Array.from(keys);
}
function collectUnknownPluginReferenceIssues(validation) {
  if (!Array.isArray(validation.issues)) {
    return [];
  }
  return validation.issues.flatMap((issue) => {
    const path = typeof issue?.path === "string" ? issue.path.trim() : "";
    const message = issueMessage(issue);
    const normalizedMessage = message.toLowerCase();
    if (!normalizedMessage.includes("plugin not found")) {
      return [];
    }
    if (!path.startsWith("plugins.slots.") && !path.startsWith("plugins.entries.")) {
      return [];
    }
    return [{ path, message }];
  });
}
// 2026.9.1: 频道配置里的 allowFrom 若含非法项(数字 0 / 空串 / 非字符串), 配置校验会失败并阻塞网关启动。
// 收集这类 issue 的频道, 并在归一化阶段清理。
function collectAllowFromIssues(validation) {
  if (!Array.isArray(validation.issues)) {
    return [];
  }
  const keys = new Set;
  for (const issue of validation.issues) {
    const path = typeof issue?.path === "string" ? issue.path.trim() : "";
    const match = path.match(/^channels\.([A-Za-z0-9_-]+)\.(?:accounts\.[^.]+\.)?(?:allowFrom|groupAllowFrom|groups\.[^.]+\.allowFrom)(?:\.|$)/u);
    if (match) {
      keys.add(match[1]);
    }
  }
  return Array.from(keys);
}
// qqbot 的 allowFrom 必填且 2026.9.x 只接受常量 "openclaw:approval-disabled" 或合法用户 ID。
// 校验失败时把频道(及命名账号)的非法/缺失 allowFrom 统一修正为该合法值。
function fixQQBotAllowFrom(section) {
  let mutated = false;
  const fallback = ["openclaw:approval-disabled"];
  const ensure = (obj) => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      return;
    }
    const current = obj.allowFrom;
    const invalid = !Array.isArray(current) || current.length === 0 || current.some((entry) => typeof entry !== "string" || entry.trim().length === 0 || entry.trim() === "0" || entry.trim() === "*");
    if (invalid) {
      obj.allowFrom = [...fallback];
      mutated = true;
    }
  };
  ensure(section);
  const accounts = section.accounts;
  if (accounts && typeof accounts === "object" && !Array.isArray(accounts)) {
    for (const account of Object.values(accounts)) {
      ensure(account);
    }
  }
  return mutated;
}
// 递归清理某个频道配置子树里的 allowFrom: 过滤非字符串/空/占位 "0" 项; forceDelete 时直接删除。
function sanitizeAllowFromDeep(target, forceDelete) {
  let mutated = false;
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return mutated;
  }
  for (const key of ["allowFrom", "groupAllowFrom"]) {
    if (!(key in target)) continue;
    const value = target[key];
    if (forceDelete) {
      delete target[key];
      mutated = true;
      continue;
    }
    if (!Array.isArray(value)) {
      delete target[key];
      mutated = true;
      continue;
    }
    const filtered = value.filter((entry) => typeof entry === "string" && entry.trim().length > 0 && entry.trim() !== "0");
    if (filtered.length === 0) {
      delete target[key];
      mutated = true;
    } else if (filtered.length !== value.length) {
      target[key] = filtered;
      mutated = true;
    }
  }
  for (const value of Object.values(target)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (sanitizeAllowFromDeep(value, forceDelete)) {
        mutated = true;
      }
    }
  }
  return mutated;
}
function deleteNestedPath(target, segments) {
  if (segments.length === 0) {
    return false;
  }
  const [head, ...rest] = segments;
  if (!(head in target)) {
    return false;
  }
  if (rest.length === 0) {
    delete target[head];
    return true;
  }
  const next = asObject(target[head]);
  if (Object.keys(next).length === 0) {
    return false;
  }
  const mutated = deleteNestedPath(next, rest);
  if (!mutated) {
    return false;
  }
  target[head] = next;
  return true;
}
function buildPluginReferenceNotice(path, message) {
  return `\u5DF2\u81EA\u52A8\u79FB\u9664\u5931\u6548\u63D2\u4EF6\u5F15\u7528 ${path}\uFF08${message}\uFF09`;
}
function readPersistedPluginInstallRecords(instance) {
  if (usesSystemOpenclaw(instance)) {
    return {};
  }
  const recordsPath = pluginInstallRecordsPath(instance);
  if (!existsSync4(recordsPath)) {
    return {};
  }
  try {
    const payload = JSON.parse(readFileSync5(recordsPath, "utf8"));
    return asObject(asObject(payload).installRecords);
  } catch {
    return {};
  }
}
function findPluginInstallRecord(instance, config, descriptor) {
  const pluginsConfig = asObject(config.plugins);
  const installs = asObject(pluginsConfig.installs);
  const persistedInstalls = readPersistedPluginInstallRecords(instance);
  for (const pluginId of channelPluginCandidateIds(descriptor)) {
    const persistedRecord = asObject(persistedInstalls[pluginId]);
    if (Object.keys(persistedRecord).length > 0) {
      return persistedRecord;
    }
    const configRecord = asObject(installs[pluginId]);
    if (Object.keys(configRecord).length > 0) {
      return configRecord;
    }
  }
  return null;
}
function updateTargetForInstallRecord(installRecord, descriptor) {
  const source = asString(installRecord?.source);
  if (source === "npm") {
    return descriptor.packageSpec;
  }
  if (source === "marketplace" || source === "clawhub" || source === "git") {
    return descriptor.pluginId;
  }
  return null;
}
async function pruneKnownInvalidConfigReferences(instance, configPath) {
  const notices = [];
  logChannelStep("info", "config.normalize.start", {
    instanceId: instance.id,
    configPath
  });
  for (let attempt = 0;attempt < 5; attempt += 1) {
    logChannelStep("info", "config.normalize.validate", {
      instanceId: instance.id,
      configPath,
      attempt: attempt + 1
    });
    const validation = await loadConfigValidation(instance, configPath);
    if (!validation) {
      logChannelStep("info", "config.normalize.skip", {
        instanceId: instance.id,
        configPath,
        attempt: attempt + 1
      });
      return notices;
    }
    const staleChannelKeys = collectUnknownManagedChannelConfigKeys(validation);
    const stalePluginRefs = collectUnknownPluginReferenceIssues(validation);
    const allowFromChannels = collectAllowFromIssues(validation);
    if (staleChannelKeys.length === 0 && stalePluginRefs.length === 0 && allowFromChannels.length === 0) {
      if (!validation.valid) {
        const message = summarizeValidationMessage(validation) || "OpenClaw \u914D\u7F6E\u6821\u9A8C\u5931\u8D25";
        logChannelStep("error", "config.normalize.unhandled_invalid", {
          instanceId: instance.id,
          configPath,
          attempt: attempt + 1,
          message
        });
        throw new Error(message);
      }
      logChannelStep("info", "config.normalize.complete", {
        instanceId: instance.id,
        configPath,
        attempt: attempt + 1,
        changed: notices.length > 0,
        noticeCount: notices.length
      });
      return notices;
    }
    logChannelStep("warn", "config.normalize.prune", {
      instanceId: instance.id,
      configPath,
      attempt: attempt + 1,
      staleChannelKeys,
      stalePluginRefCount: stalePluginRefs.length,
      allowFromChannels
    });
    await rewriteConfigFile(instance, configPath, (currentConfig) => {
      const nextConfig = { ...currentConfig };
      let mutated = false;
      if (staleChannelKeys.length > 0) {
        const channelsRaw = asObject(nextConfig.channels);
        const nextChannels = { ...channelsRaw };
        for (const key of staleChannelKeys) {
          if (key in nextChannels) {
            delete nextChannels[key];
            mutated = true;
            notices.push(`\u5DF2\u81EA\u52A8\u79FB\u9664\u5931\u6548\u6D88\u606F\u6E20\u9053\u914D\u7F6E channels.${key}`);
          }
        }
        nextConfig.channels = nextChannels;
      }
      if (stalePluginRefs.length > 0) {
        const pluginsRaw = asObject(nextConfig.plugins);
        const nextPlugins = { ...pluginsRaw };
        for (const issue of stalePluginRefs) {
          const relativeSegments = issue.path.split(".").slice(1);
          if (deleteNestedPath(nextPlugins, relativeSegments)) {
            mutated = true;
            notices.push(buildPluginReferenceNotice(issue.path, issue.message));
          }
        }
        nextConfig.plugins = nextPlugins;
      }
      if (allowFromChannels.length > 0) {
        const channelsRaw = asObject(nextConfig.channels);
        const nextChannels = { ...channelsRaw };
        const forceDelete = attempt >= 1;
        for (const key of allowFromChannels) {
          const section = asObject(nextChannels[key]);
          if (Object.keys(section).length === 0) {
            continue;
          }
          const changed = key === "qqbot" ? fixQQBotAllowFrom(section) : sanitizeAllowFromDeep(section, forceDelete);
          if (changed) {
            mutated = true;
            nextChannels[key] = section;
            notices.push(`已自动修正消息渠道配置 channels.${key}.allowFrom 中的非法项`);
          }
        }
        nextConfig.channels = nextChannels;
      }
      return mutated ? nextConfig : null;
    });
    logChannelStep("info", "config.normalize.pruned", {
      instanceId: instance.id,
      configPath,
      attempt: attempt + 1,
      noticeCount: notices.length
    });
  }
  logChannelStep("warn", "config.normalize.max_attempts", {
    instanceId: instance.id,
    configPath,
    noticeCount: notices.length
  });
  throw new Error("OpenClaw \u914D\u7F6E\u81EA\u52A8\u6E05\u7406\u672A\u6536\u655B\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E\u6587\u4EF6\u3002");
}
async function ensureChannelsConfigNormalized(instance) {
  const inFlight = channelsConfigNormalizationInFlight.get(instance.id);
  if (inFlight) {
    logChannelStep("info", "config.normalize.join", {
      instanceId: instance.id
    });
    return inFlight;
  }
  const normalizePromise = (async () => {
    if (!await tryResolveOpenclawBinary(instance)) {
      logChannelStep("info", "config.normalize.skip", {
        instanceId: instance.id,
        reason: "missing_binary"
      });
      return [];
    }
    const configPath = await getActiveConfigPath(instance);
    const notices = await pruneKnownInvalidConfigReferences(instance, configPath);
    logChannelStep("info", "config.normalize.done", {
      instanceId: instance.id,
      configPath,
      noticeCount: notices.length
    });
    return notices;
  })();
  channelsConfigNormalizationInFlight.set(instance.id, normalizePromise);
  try {
    return await normalizePromise;
  } finally {
    channelsConfigNormalizationInFlight.delete(instance.id);
  }
}
function buildFeishuSnapshot(feishuConfigRaw) {
  const accountsRaw = asObject(feishuConfigRaw.accounts);
  const firstAccount = asObject(Object.values(accountsRaw)[0]);
  const appId = asString(feishuConfigRaw.appId) || asString(firstAccount.appId) || "";
  const appSecretConfigured = Boolean(asString(feishuConfigRaw.appSecret) || asString(firstAccount.appSecret));
  const accountIds = objectKeys(accountsRaw);
  const usesNamedAccounts = accountIds.length > 0;
  const defaultAccount = asString(feishuConfigRaw.defaultAccount);
  return {
    configured: Object.keys(feishuConfigRaw).length > 0,
    appId,
    appSecretConfigured,
    enabled: asBoolean(feishuConfigRaw.enabled, false),
    connectionMode: asString(feishuConfigRaw.connectionMode) === "webhook" ? "webhook" : "websocket",
    dmPolicy: (() => {
      const value = asString(feishuConfigRaw.dmPolicy);
      return value === "allowlist" || value === "open" || value === "disabled" ? value : "pairing";
    })(),
    groupPolicy: (() => {
      const value = asString(feishuConfigRaw.groupPolicy);
      return value === "open" || value === "disabled" ? value : "allowlist";
    })(),
    requireMention: asBoolean(feishuConfigRaw.requireMention, true),
    usesNamedAccounts,
    accountCount: accountIds.length,
    defaultAccount,
    editable: !usesNamedAccounts,
    readonlyReason: usesNamedAccounts ? readonlyReasonForNamedAccounts("\u98DE\u4E66") : null
  };
}
function buildDingtalkSnapshot(dingtalkConfigRaw, gatewayConfigRaw) {
  const gatewayAuth = asObject(gatewayConfigRaw.auth);
  const gatewayHttp = asObject(gatewayConfigRaw.http);
  const endpoints = asObject(gatewayHttp.endpoints);
  const chatCompletions = asObject(endpoints.chatCompletions);
  const accountIds = objectKeys(dingtalkConfigRaw.accounts);
  const usesNamedAccounts = accountIds.length > 0;
  return {
    configured: Object.keys(dingtalkConfigRaw).length > 0,
    clientId: asString(dingtalkConfigRaw.clientId) || "",
    clientSecretConfigured: Boolean(asString(dingtalkConfigRaw.clientSecret)),
    gatewayTokenConfigured: Boolean(asString(dingtalkConfigRaw.gatewayToken)),
    gatewayPasswordConfigured: Boolean(asString(dingtalkConfigRaw.gatewayPassword)),
    gatewayAuthMode: asString(gatewayAuth.mode),
    gatewayAuthTokenConfigured: Boolean(asString(gatewayAuth.token)),
    sessionTimeout: asNumber(dingtalkConfigRaw.sessionTimeout, 1800000),
    chatCompletionsEnabled: asBoolean(chatCompletions.enabled, false),
    usesNamedAccounts,
    accountCount: accountIds.length,
    editable: !usesNamedAccounts,
    readonlyReason: usesNamedAccounts ? readonlyReasonForNamedAccounts("\u9489\u9489") : null
  };
}
function buildWecomSnapshot(wecomConfigRaw) {
  return {
    configured: Object.keys(wecomConfigRaw).length > 0,
    botId: asString(wecomConfigRaw.botId) || "",
    secretConfigured: Boolean(asString(wecomConfigRaw.secret)),
    enabled: asBoolean(wecomConfigRaw.enabled, false),
    websocketUrl: asString(wecomConfigRaw.websocketUrl) || "wss://openws.work.weixin.qq.com",
    dmPolicy: (() => {
      const value = asString(wecomConfigRaw.dmPolicy);
      return value === "allowlist" || value === "open" || value === "disabled" ? value : "open";
    })()
  };
}
function buildQQBotSnapshot(qqbotConfigRaw) {
  const accountsRaw = asObject(qqbotConfigRaw.accounts);
  const namedAccountIds = objectKeys(accountsRaw);
  const accounts = [];
  if (asString(qqbotConfigRaw.appId) || asString(qqbotConfigRaw.clientSecret) || asString(qqbotConfigRaw.clientSecretFile)) {
    accounts.push({
      accountId: DEFAULT_QQBOT_ACCOUNT_ID,
      isDefault: true,
      appId: asString(qqbotConfigRaw.appId) || "",
      clientSecretConfigured: Boolean(asString(qqbotConfigRaw.clientSecret) || asString(qqbotConfigRaw.clientSecretFile)),
      enabled: asBoolean(qqbotConfigRaw.enabled, false),
      name: asString(qqbotConfigRaw.name) || "",
      imageServerBaseUrl: asString(qqbotConfigRaw.imageServerBaseUrl) || ""
    });
  }
  for (const accountId of namedAccountIds) {
    const accountRaw = asObject(accountsRaw[accountId]);
    accounts.push({
      accountId,
      isDefault: false,
      appId: asString(accountRaw.appId) || "",
      clientSecretConfigured: Boolean(asString(accountRaw.clientSecret) || asString(accountRaw.clientSecretFile)),
      enabled: asBoolean(accountRaw.enabled, false),
      name: asString(accountRaw.name) || "",
      imageServerBaseUrl: asString(accountRaw.imageServerBaseUrl) || ""
    });
  }
  return {
    configured: accounts.length > 0,
    usesNamedAccounts: namedAccountIds.length > 0,
    accountCount: accounts.length,
    defaultAccountId: accounts.some((account) => account.isDefault) ? DEFAULT_QQBOT_ACCOUNT_ID : null,
    accounts
  };
}
function normalizeFeishuInput(input) {
  const appId = input.appId.trim();
  if (!appId) {
    throw new Error("\u98DE\u4E66 App ID \u4E0D\u80FD\u4E3A\u7A7A");
  }
  return {
    appId,
    appSecret: typeof input.appSecret === "string" ? input.appSecret.trim() : null
  };
}
function normalizeWecomInput(input) {
  const botId = input.botId.trim();
  if (!botId) {
    throw new Error("\u4F01\u4E1A\u5FAE\u4FE1 Bot ID \u4E0D\u80FD\u4E3A\u7A7A");
  }
  return {
    botId,
    secret: typeof input.secret === "string" ? input.secret.trim() : null
  };
}
function normalizeQQBotInput(input) {
  const appId = input.appId.trim();
  if (!appId) {
    throw new Error("QQ Bot App ID \u4E0D\u80FD\u4E3A\u7A7A");
  }
  return {
    accountId: normalizeQQBotAccountId(input.accountId),
    existingAccountId: input.existingAccountId ? normalizeQQBotAccountId(input.existingAccountId) : null,
    appId,
    clientSecret: typeof input.clientSecret === "string" ? input.clientSecret.trim() : null,
    name: typeof input.name === "string" ? input.name.trim() : null,
    imageServerBaseUrl: typeof input.imageServerBaseUrl === "string" ? input.imageServerBaseUrl.trim() : null
  };
}
async function getChannelsConfig(instance) {
  const activeConfigPath3 = await getActiveConfigPath(instance);
  const configExists = existsSync4(activeConfigPath3);
  const config = await readConfigFile2(activeConfigPath3);
  const channelsConfig = asObject(config.channels);
  const feishuConfig = asObject(channelsConfig.feishu);
  const wecomConfig = asObject(channelsConfig.wecom);
  const dingtalkConfig = readDingtalkChannelConfig(channelsConfig);
  const qqbotConfig = asObject(channelsConfig.qqbot);
  const gatewayConfig = asObject(config.gateway);
  return {
    configPath: activeConfigPath3,
    configExists,
    validation: {
      valid: true
    },
    configuredChannelIds: normalizeConfiguredChannelIds(channelsConfig),
    feishu: buildFeishuSnapshot(feishuConfig),
    wecom: buildWecomSnapshot(wecomConfig),
    dingtalk: buildDingtalkSnapshot(dingtalkConfig, gatewayConfig),
    qqbot: buildQQBotSnapshot(qqbotConfig)
  };
}
function normalizeDingtalkInput(input) {
  const clientId = input.clientId.trim();
  if (!clientId) {
    throw new Error("\u9489\u9489 Client ID \u4E0D\u80FD\u4E3A\u7A7A");
  }
  return {
    clientId,
    clientSecret: typeof input.clientSecret === "string" ? input.clientSecret.trim() : null
  };
}
function pluginDescriptor(channelKey) {
  if (channelKey === "feishu") {
    return {
      channelKey,
      pluginId: "feishu",
      label: "\u98DE\u4E66",
      packageSpec: OPENCLAW_CHANNEL_PLUGIN_SPECS.feishu,
      requiresRestart: true,
      docUrl: "https://help.fnnas.com/articles/v1/ai/openclaw-feishu.md",
      note: "",
      managementMode: "install_managed"
    };
  }
  if (channelKey === "wecom") {
    return {
      channelKey,
      pluginId: "wecom-openclaw-plugin",
      label: "\u4F01\u4E1A\u5FAE\u4FE1",
      packageSpec: OPENCLAW_CHANNEL_PLUGIN_SPECS.wecom,
      requiresRestart: true,
      docUrl: "https://open.work.weixin.qq.com/help?doc_id=21657",
      note: "",
      managementMode: "install_managed"
    };
  }
  if (channelKey === "dingtalk") {
    return {
      channelKey,
      pluginId: "dingtalk-connector",
      label: "\u9489\u9489",
      packageSpec: OPENCLAW_CHANNEL_PLUGIN_SPECS.dingtalk,
      requiresRestart: true,
      docUrl: "https://help.fnnas.com/articles/v1/ai/openclaw-dingtalk.md",
      note: "",
      managementMode: "install_managed"
    };
  }
  if (channelKey === "weixin") {
    return {
      channelKey,
      pluginId: "openclaw-weixin",
      label: "\u5FAE\u4FE1",
      packageSpec: OPENCLAW_CHANNEL_PLUGIN_SPECS.weixin,
      requiresRestart: true,
      docUrl: "https://help.fnnas.com/articles/v1/ai/openclaw-weixin.md",
      note: "",
      managementMode: "install_managed"
    };
  }
  if (channelKey === "qqbot") {
    return {
      channelKey,
      pluginId: "qqbot",
      label: "QQ Bot",
      packageSpec: OPENCLAW_CHANNEL_PLUGIN_SPECS.qqbot,
      requiresRestart: true,
      docUrl: "https://q.qq.com/qqbot/openclaw/login.html",
      note: "",
      managementMode: "install_managed"
    };
  }
  return {
    channelKey,
    pluginId: "dingtalk-connector",
    label: "\u9489\u9489",
    packageSpec: OPENCLAW_CHANNEL_PLUGIN_SPECS.dingtalk,
    requiresRestart: true,
    docUrl: "https://help.fnnas.com/articles/v1/ai/openclaw-dingtalk.md",
    note: "",
    managementMode: "install_managed"
  };
}
function defaultPluginStatus(descriptor) {
  if (descriptor.managementMode === "bundled_first") {
    return {
      ...descriptor,
      installed: false,
      source: "bundled",
      action: "none",
      actionLabel: "\u5185\u7F6E",
      sourcePath: null,
      version: null,
      error: null
    };
  }
  return {
    ...descriptor,
    installed: false,
    source: "unknown",
    action: "install",
    actionLabel: "\u5B89\u88C5",
    sourcePath: null,
    version: null,
    error: null
  };
}
function emptyChannelPluginsResponse() {
  return {
    plugins: [
      defaultPluginStatus(pluginDescriptor("feishu")),
      defaultPluginStatus(pluginDescriptor("wecom")),
      defaultPluginStatus(pluginDescriptor("dingtalk")),
      defaultPluginStatus(pluginDescriptor("weixin")),
      defaultPluginStatus(pluginDescriptor("qqbot"))
    ]
  };
}
async function inspectPluginInfo(instance, descriptor) {
  const result = await runOpenclawCommand(instance, ["plugins", "info", descriptor.pluginId, "--json"], {
    policyKey: "channels.plugins.info",
    tag: `channels.plugins.info.${descriptor.pluginId}`,
    description: `Inspect plugin ${descriptor.pluginId}`
  });
  if (result.exitCode !== 0) {
    return null;
  }
  try {
    const payload = parseJsonFromCommandOutput([result.stdout, result.stderr].filter(Boolean).join(`
`));
    return normalizePluginRecord(payload);
  } catch {
    return null;
  }
}
async function inspectPluginCatalog(instance) {
  const result = await runOpenclawCommand(instance, ["plugins", "list", "--json"], {
    policyKey: "channels.plugins.list"
  });
  if (result.exitCode !== 0) {
    throw new Error(formatOpenclawCommandError(["plugins", "list", "--json"], result));
  }
  try {
    const payload = parseJsonFromCommandOutput([result.stdout, result.stderr].filter(Boolean).join(`
`));
    return parsePluginCatalogResponse(payload);
  } catch {
    throw new Error("Invalid JSON from openclaw plugins list --json");
  }
}
async function isPluginRuntimeRecognized(instance, descriptor) {
  const [info, catalog] = await Promise.all([
    inspectPluginInfo(instance, descriptor),
    inspectPluginCatalog(instance)
  ]);
  if (info) {
    return true;
  }
  return findPluginCatalogEntry(descriptor, catalog) !== null;
}
function pluginExtensionsRoot(instance) {
  if (usesSystemOpenclaw(instance)) {
    return join5(process.env.HOME || homedir3(), ".openclaw", "extensions");
  }
  return join5(instance.homeDir, ".openclaw", "extensions");
}
function pluginInstallDirectory(instance, descriptor) {
  return join5(pluginExtensionsRoot(instance), descriptor.pluginId);
}
function inspectPluginInstallDirectory(instance, descriptor) {
  const installDirectory = pluginInstallDirectory(instance, descriptor);
  if (!existsSync4(installDirectory)) {
    return null;
  }
  return {
    status: "installed",
    sourcePath: installDirectory,
    origin: "package",
    version: null,
    error: null
  };
}
function inspectPersistedPluginInstallRecord(instance, descriptor) {
  const installRecords = readPersistedPluginInstallRecords(instance);
  for (const pluginId of channelPluginCandidateIds(descriptor)) {
    const record = asObject(installRecords[pluginId]);
    if (Object.keys(record).length === 0) {
      continue;
    }
    return {
      status: "installed",
      sourcePath: asString(record.installPath) || asString(record.sourcePath),
      origin: "package",
      version: asString(record.version) || asString(record.resolvedVersion),
      error: null
    };
  }
  return null;
}
function findPluginCatalogEntry(descriptor, entries) {
  const ids = channelPluginCandidateIds(descriptor);
  for (const entry of entries) {
    if (ids.includes(asString(entry.id) || "")) {
      return entry;
    }
  }
  for (const entry of entries) {
    const channelIds = pluginRecordChannelIds(entry);
    if (ids.some((id) => channelIds.includes(id))) {
      return entry;
    }
  }
  return null;
}
function logManagedPluginVersionMismatch(descriptor, resolvedInfo) {
  if (!resolvedInfo?.version) {
    return;
  }
  const expectedVersion = extractPinnedPackageVersion(descriptor.packageSpec);
  if (!expectedVersion || resolvedInfo.version === expectedVersion) {
    return;
  }
  console.warn("[channels]", `${descriptor.label} plugin version differs from managed pin: installed=${resolvedInfo.version} expected=${expectedVersion}; reinstall will restore the pinned version.`);
}
function buildPluginStatus(descriptor, info, catalogEntry, installedFromDisk) {
  const resolvedInfo = info || (catalogEntry ? normalizePluginRecord(catalogEntry) : null) || installedFromDisk;
  if (descriptor.managementMode === "bundled_first") {
    return {
      ...descriptor,
      installed: Boolean(resolvedInfo),
      source: resolvedInfo?.origin === "package" ? "package" : "bundled",
      action: "none",
      actionLabel: "\u5185\u7F6E",
      sourcePath: resolvedInfo?.origin === "package" ? resolvedInfo.sourcePath : null,
      version: resolvedInfo?.version || null,
      error: resolvedInfo?.error || null
    };
  }
  if (!resolvedInfo) {
    return defaultPluginStatus(descriptor);
  }
  logManagedPluginVersionMismatch(descriptor, resolvedInfo);
  if (resolvedInfo.origin === "bundled") {
    return {
      ...descriptor,
      installed: true,
      source: "bundled",
      action: "none",
      actionLabel: "\u5185\u7F6E",
      sourcePath: null,
      version: resolvedInfo.version,
      error: resolvedInfo.error
    };
  }
  return {
    ...descriptor,
    installed: true,
    source: resolvedInfo.origin,
    action: "reinstall",
    actionLabel: "\u91CD\u88C5",
    sourcePath: resolvedInfo.sourcePath,
    version: resolvedInfo.version,
    error: resolvedInfo.error
  };
}
async function probeChannelPlugins(instance) {
  const descriptors = [
    pluginDescriptor("feishu"),
    pluginDescriptor("wecom"),
    pluginDescriptor("dingtalk"),
    pluginDescriptor("weixin"),
    pluginDescriptor("qqbot")
  ];
  const catalog = await inspectPluginCatalog(instance);
  return {
    plugins: descriptors.map((descriptor) => buildPluginStatus(descriptor, null, findPluginCatalogEntry(descriptor, catalog), inspectPluginInstallDirectory(instance, descriptor) || inspectPersistedPluginInstallRecord(instance, descriptor)))
  };
}
function mergeChannelPluginsEnvelope(data, meta, source) {
  const refreshState = getRefreshState(CHANNEL_PLUGINS_REFRESH_TASK_KEY);
  const payload = data || emptyChannelPluginsResponse();
  return {
    plugins: payload.plugins,
    notices: payload.notices,
    fetchedAt: meta.fetchedAt,
    refreshing: refreshState.refreshing,
    stale: isChannelsSnapshotStale(meta.fetchedAt),
    source,
    lastError: meta.lastError,
    refreshWindowMs: CHANNEL_PLUGINS_FRONTEND_POLL_WINDOW_MS
  };
}
async function loadChannelPluginsEnvelope(instance) {
  const cached = pluginsCache.get(instance.id);
  if (cached) {
    return {
      ...cached,
      source: "cache",
      refreshing: getRefreshState(CHANNEL_PLUGINS_REFRESH_TASK_KEY).refreshing
    };
  }
  const [snapshot, meta] = await Promise.all([
    readChannelPluginsSnapshotData(instance),
    readChannelPluginsMeta(instance)
  ]);
  if (snapshot) {
    const envelope = mergeChannelPluginsEnvelope(snapshot, meta, "snapshot");
    pluginsCache.set(instance.id, envelope);
    return envelope;
  }
  return emptyChannelPluginsEnvelope("none", {
    refreshing: getRefreshState(CHANNEL_PLUGINS_REFRESH_TASK_KEY).refreshing,
    lastError: meta.lastError
  });
}
async function refreshChannelPluginsNow(instance) {
  if (!await tryResolveOpenclawBinary(instance)) {
    const envelope = emptyChannelPluginsEnvelope("none", {
      lastError: "OpenClaw \u5C1A\u672A\u5B89\u88C5\uFF0C\u65E0\u6CD5\u5237\u65B0\u63D2\u4EF6\u72B6\u6001\u3002"
    });
    pluginsCache.set(instance.id, envelope);
    await writeChannelPluginsMeta(instance, {
      fetchedAt: null,
      lastError: envelope.lastError
    });
    return envelope;
  }
  try {
    const value = await probeChannelPlugins(instance);
    const fetchedAt = Date.now();
    await writeChannelPluginsSnapshotData(instance, value);
    await writeChannelPluginsMeta(instance, {
      fetchedAt,
      lastError: null
    });
    const envelope = {
      plugins: value.plugins,
      notices: value.notices,
      fetchedAt,
      refreshing: getRefreshState(CHANNEL_PLUGINS_REFRESH_TASK_KEY).refreshing,
      stale: false,
      source: "cache",
      lastError: null,
      refreshWindowMs: CHANNEL_PLUGINS_FRONTEND_POLL_WINDOW_MS
    };
    pluginsCache.set(instance.id, envelope);
    return envelope;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallback = await loadChannelPluginsEnvelope(instance);
    const nextMeta = {
      fetchedAt: fallback.fetchedAt,
      lastError: message
    };
    await writeChannelPluginsMeta(instance, nextMeta);
    const envelope = {
      ...fallback,
      lastError: message,
      refreshing: getRefreshState(CHANNEL_PLUGINS_REFRESH_TASK_KEY).refreshing,
      refreshWindowMs: CHANNEL_PLUGINS_FRONTEND_POLL_WINDOW_MS
    };
    pluginsCache.set(instance.id, envelope);
    throw new Error(message);
  }
}
function scheduleChannelPluginsRefresh(instance, options) {
  const queued = enqueueRefreshTask({
    taskKey: CHANNEL_PLUGINS_REFRESH_TASK_KEY,
    cooldownMs: options?.cooldownMs ?? CHANNEL_PLUGINS_COOLDOWN_MS,
    force: options?.force,
    task: async () => {
      console.info(`[channels] refreshing plugin snapshot reason=${JSON.stringify(options?.reason || "unspecified")}`);
      await refreshChannelPluginsNow(instance);
    }
  });
  observeBackgroundTask({
    label: "channels.plugins.refresh",
    instanceId: instance.id,
    taskKey: queued.taskKey,
    reason: options?.reason,
    metadata: {
      accepted: queued.accepted,
      deduplicated: queued.deduplicated,
      refreshing: queued.refreshing
    }
  }, queued.promise);
  return {
    accepted: queued.accepted,
    deduplicated: queued.deduplicated,
    taskKey: queued.taskKey,
    refreshing: queued.refreshing
  };
}
function refreshChannelPlugins(instance, options) {
  return scheduleChannelPluginsRefresh(instance, options);
}
async function getChannelPlugins(instance) {
  const envelope = await loadChannelPluginsEnvelope(instance);
  const binaryPath = await tryResolveOpenclawBinary(instance);
  if (binaryPath && (envelope.source === "none" || envelope.stale)) {
    const refresh = scheduleChannelPluginsRefresh(instance, {
      reason: envelope.source === "none" ? "read_miss" : "stale_read"
    });
    return {
      ...envelope,
      refreshing: refresh.refreshing
    };
  }
  return envelope;
}
async function runPluginLifecycleCommand(instance, args, fallbackMessage) {
  const npmEnv = buildPluginLifecycleNpmEnv();
  logChannelStep("info", "plugin.lifecycle.start", {
    instanceId: instance.id,
    command: args.join(" ")
  });
  logChannelStep("info", "plugin.lifecycle.npm_env", {
    instanceId: instance.id,
    registry: OPENCLAW_NPM_REGISTRY,
    replaceRegistryHost: NPM_REPLACE_REGISTRY_HOST,
    proxyConfigured: hasConfiguredProxy(process.env)
  });
  const result = await runOpenclawCommand(instance, args, {
    policyKey: "channels.plugins.lifecycle",
    tag: `channels.${args.slice(0, 3).join(".")}`,
    description: `Plugin lifecycle: ${args.join(" ")}`,
    env: npmEnv
  });
  if (result.exitCode !== 0) {
    logChannelStep("error", "plugin.lifecycle.failed", {
      instanceId: instance.id,
      command: args.join(" "),
      exitCode: result.exitCode,
      failureKind: result.failureKind,
      stdoutBytes: result.stdoutBytes,
      stderrBytes: result.stderrBytes
    });
    throw new Error(formatOpenclawCommandError(args, result) || fallbackMessage);
  }
  logChannelStep("info", "plugin.lifecycle.done", {
    instanceId: instance.id,
    command: args.join(" "),
    exitCode: result.exitCode,
    stdoutBytes: result.stdoutBytes,
    stderrBytes: result.stderrBytes
  });
  return {
    stdout: result.stdout,
    stderr: result.stderr
  };
}
async function replaceChannelPlugin(instance, descriptor) {
  logChannelStep("info", "plugin.replace.start", {
    instanceId: instance.id,
    channelKey: descriptor.channelKey,
    pluginId: descriptor.pluginId,
    packageSpec: descriptor.packageSpec
  });
  const configPath = await getActiveConfigPath(instance);
  const runtimeRecognized = await isPluginRuntimeRecognized(instance, descriptor);
  const currentConfig = await readConfigFile2(configPath);
  const installRecord = findPluginInstallRecord(instance, currentConfig, descriptor);
  const updateTarget = updateTargetForInstallRecord(installRecord, descriptor);
  const management = installRecord ? "managed_install" : runtimeRecognized || Boolean(inspectPluginInstallDirectory(instance, descriptor)) ? "untracked_local" : "absent";
  let restoreChannelConfig = null;
  const removableChannelConfigKey = descriptor.channelKey === "dingtalk" ? DINGTALK_CHANNEL_CONFIG_KEY : descriptor.channelKey === "wecom" ? WECOM_CHANNEL_CONFIG_KEY : null;
  if (removableChannelConfigKey) {
    const channelsRaw = asObject(currentConfig.channels);
    const currentChannelConfig = asObject(channelsRaw[removableChannelConfigKey]);
    if (Object.keys(currentChannelConfig).length > 0) {
      logChannelStep("warn", "plugin.replace.remove_channel_config", {
        instanceId: instance.id,
        channelKey: descriptor.channelKey,
        configKey: removableChannelConfigKey
      });
      await rewriteChannelsConfig(instance, configPath, (currentChannels) => {
        if (!(removableChannelConfigKey in currentChannels)) {
          return null;
        }
        const nextChannels = { ...currentChannels };
        delete nextChannels[removableChannelConfigKey];
        return nextChannels;
      });
      restoreChannelConfig = async () => {
        await rewriteChannelsConfig(instance, configPath, (currentChannels) => ({
          ...currentChannels,
          [removableChannelConfigKey]: currentChannelConfig
        }));
      };
    }
  }
  try {
    logChannelStep("info", "plugin.replace.remove_legacy_dirs", {
      instanceId: instance.id,
      channelKey: descriptor.channelKey,
      pluginIds: channelPluginCandidateIds(descriptor)
    });
    await Promise.all(channelPluginCandidateIds(descriptor).map((pluginId) => rm(join5(pluginExtensionsRoot(instance), pluginId), { recursive: true, force: true })));
    const lifecycleArgs = updateTarget ? ["plugins", "update", updateTarget, "--accept-capabilities"] : ["plugins", "install", descriptor.packageSpec, "--force", "--accept-capabilities"];
    logChannelStep("info", updateTarget ? "plugin.replace.update" : "plugin.replace.force_install", {
      instanceId: instance.id,
      channelKey: descriptor.channelKey,
      management,
      command: lifecycleArgs.join(" ")
    });
    const installResult = await runPluginLifecycleCommand(instance, lifecycleArgs, updateTarget ? `\u6309\u9501\u5B9A\u7248\u672C\u66F4\u65B0 ${descriptor.packageSpec} \u5931\u8D25` : `\u5F3A\u5236\u91CD\u88C5 ${descriptor.packageSpec} \u5931\u8D25`);
    return installResult;
  } finally {
    if (restoreChannelConfig) {
      await restoreChannelConfig().then(() => {
        logChannelStep("info", "plugin.replace.restore_channel_config", {
          instanceId: instance.id,
          channelKey: descriptor.channelKey
        });
      }).catch((error) => {
        logChannelStep("warn", "plugin.replace.restore_failed", {
          instanceId: instance.id,
          channelKey: descriptor.channelKey,
          error: errorMessage2(error)
        });
      });
    }
  }
}
async function installChannelPlugin(instance, payload) {
  logChannelStep("info", "plugin.install.request", {
    instanceId: instance.id,
    channelKey: payload.channelKey
  });
  if (!await tryResolveOpenclawBinary(instance)) {
    logChannelStep("error", "plugin.install.reject", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      reason: "missing_binary"
    });
    throw new Error("OpenClaw \u5C1A\u672A\u5B89\u88C5\uFF0C\u65E0\u6CD5\u5B89\u88C5\u6E20\u9053\u63D2\u4EF6\u3002");
  }
  if (payload.channelKey !== "feishu" && payload.channelKey !== "wecom" && payload.channelKey !== "dingtalk" && payload.channelKey !== "weixin" && payload.channelKey !== "qqbot") {
    logChannelStep("error", "plugin.install.reject", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      reason: "unsupported_channel"
    });
    throw new Error("Unsupported channel plugin");
  }
  const normalizationNotices = await ensureChannelsConfigNormalized(instance);
  logChannelStep("info", "plugin.install.normalized", {
    instanceId: instance.id,
    channelKey: payload.channelKey,
    noticeCount: normalizationNotices.length
  });
  const runtime = await refreshChannelPluginsNow(instance);
  const notices = mergeNotices(normalizationNotices, runtime.notices);
  const status = runtime.plugins.find((item) => item.channelKey === payload.channelKey);
  if (!status) {
    logChannelStep("error", "plugin.install.reject", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      reason: "missing_status"
    });
    throw new Error("Unsupported channel plugin");
  }
  logChannelStep("info", "plugin.install.status", {
    instanceId: instance.id,
    channelKey: payload.channelKey,
    pluginId: status.pluginId,
    action: status.action,
    source: status.source,
    installed: status.installed,
    packageSpec: status.packageSpec
  });
  pluginsCache.delete(instance.id);
  let stdout = "";
  let stderr = "";
  const descriptor = pluginDescriptor(payload.channelKey);
  let responseAction = status.action;
  let responseActionLabel = status.actionLabel;
  let responseRequiresRestart = status.requiresRestart;
  if (descriptor.managementMode === "bundled_first") {
    logChannelStep("info", "plugin.install.skip", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      reason: "bundled_first"
    });
    stdout = `${status.label} \u5DF2\u7531 OpenClaw \u5185\u7F6E\u63D0\u4F9B\uFF0Cmonitor \u4E0D\u518D\u6267\u884C\u5355\u72EC\u5B89\u88C5\u3002`;
    responseAction = "none";
    responseActionLabel = "\u5185\u7F6E";
    responseRequiresRestart = false;
  } else if (status.action === "none") {
    logChannelStep("info", "plugin.install.skip", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      reason: "already_available"
    });
    stdout = `${status.label} \u63D2\u4EF6\u5DF2\u7531 OpenClaw \u5185\u7F6E\uFF0C\u65E0\u9700\u91CD\u590D\u5B89\u88C5\u3002`;
    responseRequiresRestart = false;
  } else if (status.action === "reinstall") {
    logChannelStep("info", "plugin.install.reinstall", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      packageSpec: descriptor.packageSpec
    });
    const result = await replaceChannelPlugin(instance, descriptor);
    stdout = result.stdout;
    stderr = result.stderr;
  } else {
    logChannelStep("info", "plugin.install.install", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      packageSpec: status.packageSpec
    });
    const result = await runPluginLifecycleCommand(instance, ["plugins", "install", status.packageSpec, "--force", "--accept-capabilities"], `\u5B89\u88C5 ${status.packageSpec} \u5931\u8D25`);
    stdout = result.stdout;
    stderr = result.stderr;
  }
  if (descriptor.channelKey === "weixin") {
    logChannelStep("info", "plugin.install.weixin_compat", {
      instanceId: instance.id,
      channelKey: payload.channelKey
    });
    const compat = applyWeixinRuntimeCompatPatch(instance);
    if (compat.changed && compat.message) {
      stdout = [stdout, compat.message].filter(Boolean).join(`
`);
    }
  }
  await refreshChannelPluginsNow(instance).catch((error) => {
    logChannelStep("warn", "plugin.install.refresh_failed", {
      instanceId: instance.id,
      channelKey: payload.channelKey,
      error: errorMessage2(error)
    });
  });
  logChannelStep("info", "plugin.install.done", {
    instanceId: instance.id,
    channelKey: payload.channelKey,
    action: responseAction,
    requiresRestart: responseRequiresRestart,
    noticeCount: noticeCount(notices)
  });
  return {
    channelKey: status.channelKey,
    pluginId: status.pluginId,
    label: status.label,
    packageSpec: status.packageSpec,
    action: responseAction,
    actionLabel: responseActionLabel,
    requiresRestart: responseRequiresRestart,
    stdout,
    stderr,
    notices
  };
}
async function saveChannelsConfig(instance, payload) {
  if (!await tryResolveOpenclawBinary(instance)) {
    throw new Error("OpenClaw \u5C1A\u672A\u5B89\u88C5\uFF0C\u65E0\u6CD5\u4FDD\u5B58\u6D88\u606F\u6E20\u9053\u914D\u7F6E\u3002");
  }
  const normalizationNotices = await ensureChannelsConfigNormalized(instance);
  if (payload.qqbot && typeof payload.qqbot === "object") {
    const normalized2 = normalizeQQBotInput(payload.qqbot);
    const configPath2 = await getActiveConfigPath(instance);
    const currentConfig2 = await readConfigFile2(configPath2);
    const channelsRaw2 = asObject(currentConfig2.channels);
    const currentQQBot = asObject(channelsRaw2.qqbot);
    const { defaultAccount: currentDefaultAccount, accounts: currentAccounts2 } = splitQQBotSection(currentQQBot);
    const targetAccount = normalized2.accountId === DEFAULT_QQBOT_ACCOUNT_ID ? currentDefaultAccount : asObject(currentAccounts2[normalized2.accountId]);
    const currentClientSecret = asString(targetAccount.clientSecret);
    const currentClientSecretFile = asString(targetAccount.clientSecretFile);
    const nextClientSecret = normalized2.clientSecret || currentClientSecret;
    if (!nextClientSecret && !currentClientSecretFile) {
      throw new Error("QQ Bot Client Secret \u6216 Client Secret File \u4E0D\u80FD\u4E3A\u7A7A");
    }
    const nextAccount = { ...targetAccount };
    nextAccount.appId = normalized2.appId;
    nextAccount.enabled = true;
    assignOrDelete(nextAccount, "name", normalized2.name);
    assignOrDelete(nextAccount, "imageServerBaseUrl", normalized2.imageServerBaseUrl);
    assignOrDelete(nextAccount, "clientSecret", nextClientSecret);
    if (normalized2.clientSecret) {
      delete nextAccount.clientSecretFile;
    }
    if (!Array.isArray(nextAccount.allowFrom) || nextAccount.allowFrom.length === 0) {
      // qqbot 的 allowFrom 是必填, 且 2026.9.x 只接受常量 "openclaw:approval-disabled" 或合法用户 ID;
      // 旧的 "*" 会被配置校验拒绝(must not be valid)。
      nextAccount.allowFrom = ["openclaw:approval-disabled"];
    }
    const result2 = await saveConfigSection(instance, configPath2, async () => {
      if (normalized2.accountId === DEFAULT_QQBOT_ACCOUNT_ID) {
        const nextAccounts = { ...currentAccounts2 };
        const hasExistingDefault = Object.keys(currentDefaultAccount).length > 0;
        const editingExistingDefault = normalized2.existingAccountId === DEFAULT_QQBOT_ACCOUNT_ID;
        if (hasExistingDefault && !editingExistingDefault) {
          const migratedAccountId = allocateQQBotAccountId(nextAccounts, currentDefaultAccount);
          nextAccounts[migratedAccountId] = currentDefaultAccount;
        }
        await setConfigValue(instance, "channels.qqbot", {
          ...nextAccount,
          ...Object.keys(nextAccounts).length > 0 ? { accounts: nextAccounts } : {}
        });
        return;
      }
      if (normalized2.existingAccountId && normalized2.existingAccountId !== DEFAULT_QQBOT_ACCOUNT_ID && normalized2.existingAccountId !== normalized2.accountId) {
        await rewriteChannelsConfig(instance, configPath2, (currentChannels) => {
          const currentSection = asObject(currentChannels.qqbot);
          const { defaultAccount, accounts } = splitQQBotSection(currentSection);
          if (!(normalized2.existingAccountId in accounts)) {
            return null;
          }
          const nextAccounts = { ...accounts };
          delete nextAccounts[normalized2.existingAccountId];
          return {
            ...currentChannels,
            qqbot: {
              ...defaultAccount,
              ...Object.keys(nextAccounts).length > 0 ? { accounts: nextAccounts } : {}
            }
          };
        });
      }
      await setConfigValue(instance, `channels.qqbot.accounts.${normalized2.accountId}`, nextAccount);
    });
    return {
      ...result2,
      notices: mergeNotices(normalizationNotices, result2.notices)
    };
  }
  if (payload.wecom && typeof payload.wecom === "object") {
    const normalized2 = normalizeWecomInput(payload.wecom);
    const configPath2 = await getActiveConfigPath(instance);
    const currentConfig2 = await readConfigFile2(configPath2);
    const channelsRaw2 = asObject(currentConfig2.channels);
    const currentWecom = asObject(channelsRaw2.wecom);
    const currentSecret = asString(currentWecom.secret);
    const nextSecret = normalized2.secret || currentSecret;
    if (!nextSecret) {
      throw new Error("\u4F01\u4E1A\u5FAE\u4FE1 Secret \u4E0D\u80FD\u4E3A\u7A7A");
    }
    const nextWecom = { ...currentWecom };
    nextWecom.botId = normalized2.botId;
    nextWecom.secret = nextSecret;
    nextWecom.enabled = true;
    const result2 = await saveConfigSection(instance, configPath2, async () => {
      await setConfigValue(instance, "channels.wecom", nextWecom);
    });
    return {
      ...result2,
      notices: mergeNotices(normalizationNotices, result2.notices)
    };
  }
  if (payload.dingtalk && typeof payload.dingtalk === "object") {
    const normalized2 = normalizeDingtalkInput(payload.dingtalk);
    const configPath2 = await getActiveConfigPath(instance);
    const currentConfig2 = await readConfigFile2(configPath2);
    const channelsRaw2 = asObject(currentConfig2.channels);
    const currentDingtalk = readDingtalkChannelConfig(channelsRaw2);
    const gatewayRaw = asObject(currentConfig2.gateway);
    const currentHttp = asObject(gatewayRaw.http);
    const currentEndpoints = asObject(currentHttp.endpoints);
    const currentChatCompletions = asObject(currentEndpoints.chatCompletions);
    const currentAccounts2 = asObject(currentDingtalk.accounts);
    if (hasNamedAccounts(currentAccounts2)) {
      throw new Error(readonlyReasonForNamedAccounts("\u9489\u9489"));
    }
    const currentClientSecret = asDingtalkClientSecret(currentDingtalk.clientSecret);
    const nextClientSecret = normalized2.clientSecret || currentClientSecret;
    if (!nextClientSecret) {
      throw new Error("\u9489\u9489 Client Secret \u4E0D\u80FD\u4E3A\u7A7A");
    }
    const nextDingtalk = sanitizeDingtalkSingleAccountConfig(currentDingtalk);
    nextDingtalk.clientId = normalized2.clientId;
    nextDingtalk.clientSecret = nextClientSecret;
    nextDingtalk.enabled = true;
    const nextGatewayHttp = {
      ...currentHttp,
      endpoints: {
        ...currentEndpoints,
        chatCompletions: {
          ...currentChatCompletions,
          enabled: true
        }
      }
    };
    const result2 = await saveConfigSection(instance, configPath2, async () => {
      await setConfigValue(instance, `channels.${DINGTALK_CHANNEL_CONFIG_KEY}`, nextDingtalk);
      await setConfigValue(instance, "gateway.http", nextGatewayHttp);
    });
    return {
      ...result2,
      notices: mergeNotices(normalizationNotices, result2.notices)
    };
  }
  if (!payload.feishu || typeof payload.feishu !== "object") {
    throw new Error("\u7F3A\u5C11\u53EF\u4FDD\u5B58\u7684\u6E20\u9053\u914D\u7F6E");
  }
  const normalized = normalizeFeishuInput(payload.feishu);
  const configPath = await getActiveConfigPath(instance);
  const currentConfig = await readConfigFile2(configPath);
  const channelsRaw = asObject(currentConfig.channels);
  const currentFeishu = asObject(channelsRaw.feishu);
  const currentAccounts = asObject(currentFeishu.accounts);
  if (hasNamedAccounts(currentAccounts)) {
    throw new Error(readonlyReasonForNamedAccounts("\u98DE\u4E66"));
  }
  const nextFeishu = { ...currentFeishu };
  const currentAppSecret = asString(currentFeishu.appSecret);
  const nextAppSecret = normalized.appSecret || currentAppSecret;
  if (!nextAppSecret) {
    throw new Error("\u98DE\u4E66 App Secret \u4E0D\u80FD\u4E3A\u7A7A");
  }
  nextFeishu.appId = normalized.appId;
  nextFeishu.appSecret = nextAppSecret;
  nextFeishu.enabled = true;
  const result = await saveConfigSection(instance, configPath, async () => {
    await setConfigValue(instance, "channels.feishu", nextFeishu);
  });
  return {
    ...result,
    notices: mergeNotices(normalizationNotices, result.notices)
  };
}
async function disconnectQQBotAccount(instance, accountId) {
  const normalizedAccountId = normalizeQQBotAccountId(accountId);
  const removed = await removeQQBotAccountConfig(instance, normalizedAccountId);
  const status = (await getChannelsConfig(instance)).qqbot;
  return {
    ok: true,
    accountId: normalizedAccountId,
    message: removed ? `\u5DF2\u65AD\u5F00 QQ Bot \u8D26\u53F7 ${normalizedAccountId}\u3002` : `QQ Bot \u8D26\u53F7 ${normalizedAccountId} \u4E0D\u5B58\u5728\u6216\u5DF2\u65AD\u5F00\u3002`,
    status
  };
}

// src/lib/openclaw-environment-preflight.ts
import { randomUUID } from "crypto";
import {
  chmodSync,
  existsSync as existsSync5,
  readdirSync as readdirSync4,
  readFileSync as readFileSync6,
  renameSync,
  rmSync as rmSync2,
  statSync as statSync3,
  writeFileSync as writeFileSync3
} from "fs";
import { readFile } from "fs/promises";
import { createRequire } from "module";
import { basename as basename2, join as join6 } from "path";
var LEGACY_PATCHED_OVERRIDE_NAMES = ["@whiskeysockets/baileys", "libsignal"];
var BUNDLED_EXTENSION_ARTIFACT_PREFIX = "dist/extensions/";
var BUNDLED_EXTENSION_ARTIFACT_SUFFIX = ".js";
var BUNDLED_PUBLIC_SURFACE_REPAIR_SAMPLE_SIZE = 5;
var MANAGED_PLUGIN_RUNTIME_SCAN_MAX_FILES = 200;
var MANAGED_PLUGIN_RUNTIME_SCAN_ROOTS = ["dist", "src"];
var OPENCLAW_RUNTIME_IMPORT_RE = /(?:from\s*["']openclaw(?:\/[^"']*)?["']|import\s*\(\s*["']openclaw(?:\/[^"']*)?["']\s*\)|require\s*\(\s*["']openclaw(?:\/[^"']*)?["']\s*\))/u;
var OPENCLAW_VERSION_RE = /^(\d{4})\.(\d+)\.(\d+)(?:[-+].*)?$/u;
function openclawPackageJsonPath(instance) {
  return join6(instance.installDir, "node_modules", "openclaw", "package.json");
}
function openclawPackageRoot(instance) {
  return join6(instance.installDir, "node_modules", "openclaw");
}
function openclawPostinstallInventoryPath(instance) {
  return join6(openclawPackageRoot(instance), "dist", "postinstall-inventory.json");
}
function openclawDistExtensionsRoot(instance) {
  return join6(openclawPackageRoot(instance), "dist", "extensions");
}
function managedInstallPackageJsonPath(instance) {
  return join6(instance.installDir, "package.json");
}
async function readPackageJson(path) {
  if (!existsSync5(path)) {
    return null;
  }
  try {
    const parsed = JSON.parse(await readFile(path, "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function extractPinnedPackageVersion2(packageSpec) {
  const match2 = packageSpec.match(/@([^@]+)$/);
  return match2?.[1]?.trim() || null;
}
function isFileOverride(value) {
  return typeof value === "string" && value.startsWith("file:");
}
function formatIssue(issue) {
  const suffix = issue.path ? ` (${issue.path})` : "";
  return `${issue.message}${suffix}`;
}
function safeTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}
function isolationPathForPlugin(pluginPath) {
  return `${pluginPath}.disabled-by-openclaw-${OPENCLAW_VERSION}-${safeTimestamp()}`;
}
function isDirectory(path) {
  try {
    return statSync3(path).isDirectory();
  } catch {
    return false;
  }
}
function isSafePackageRelativePath(path) {
  return !path.startsWith("/") && !path.includes("\\") && !path.split("/").includes("..");
}
function parseOpenClawVersion(value) {
  const match2 = value.trim().match(OPENCLAW_VERSION_RE);
  if (!match2) {
    return null;
  }
  return [Number(match2[1]), Number(match2[2]), Number(match2[3])];
}
function compareOpenClawVersions(left, right) {
  const parsedLeft = parseOpenClawVersion(left);
  const parsedRight = parseOpenClawVersion(right);
  if (!parsedLeft || !parsedRight) {
    return null;
  }
  for (let index = 0;index < parsedLeft.length; index += 1) {
    const delta = parsedLeft[index] - parsedRight[index];
    if (delta !== 0) {
      return delta;
    }
  }
  return 0;
}
function isBundledExtensionArtifactPath(path) {
  return isSafePackageRelativePath(path) && path.startsWith(BUNDLED_EXTENSION_ARTIFACT_PREFIX) && path.endsWith(BUNDLED_EXTENSION_ARTIFACT_SUFFIX);
}
function packageRelativePath(instance, relativePath) {
  return join6(openclawPackageRoot(instance), ...relativePath.split("/"));
}
async function readBundledPostinstallInventory(instance) {
  const inventoryPath = openclawPostinstallInventoryPath(instance);
  if (!existsSync5(inventoryPath)) {
    return { missing: true };
  }
  try {
    const parsed = JSON.parse(await readFile(inventoryPath, "utf8"));
    if (!Array.isArray(parsed) || !parsed.every((entry) => typeof entry === "string")) {
      return { invalid: true, path: inventoryPath };
    }
    return { paths: parsed, path: inventoryPath };
  } catch {
    return { invalid: true, path: inventoryPath };
  }
}
function rewriteFileAsIndependentInode(path) {
  const stat = statSync3(path);
  const tempPath = `${path}.openclaw-preflight-${process.pid}-${randomUUID()}.tmp`;
  try {
    writeFileSync3(tempPath, readFileSync6(path));
    chmodSync(tempPath, stat.mode & 511);
    renameSync(tempPath, path);
  } catch (error) {
    try {
      rmSync2(tempPath, { force: true });
    } catch {}
    throw error;
  }
}
async function preflightBundledPublicSurfaces(instance) {
  if (usesSystemOpenclaw(instance)) {
    return [];
  }
  const inventory = await readBundledPostinstallInventory(instance);
  if ("missing" in inventory) {
    if (!existsSync5(openclawDistExtensionsRoot(instance))) {
      return [];
    }
    return [{
      level: "error",
      code: "bundled-postinstall-inventory-missing",
      message: "OpenClaw bundled plugin inventory \u7F3A\u5931\uFF1B\u8BF7\u6267\u884C\u201C\u68C0\u67E5\u66F4\u65B0\u201D\u91CD\u5EFA\u53D7\u7BA1\u5B89\u88C5\u3002",
      action: "none",
      path: openclawPostinstallInventoryPath(instance)
    }];
  }
  if ("invalid" in inventory) {
    return [{
      level: "error",
      code: "bundled-postinstall-inventory-invalid",
      message: "OpenClaw bundled plugin inventory \u65E0\u6CD5\u89E3\u6790\uFF1B\u8BF7\u6267\u884C\u201C\u68C0\u67E5\u66F4\u65B0\u201D\u91CD\u5EFA\u53D7\u7BA1\u5B89\u88C5\u3002",
      action: "none",
      path: inventory.path
    }];
  }
  const issues = [];
  const repairedRelativePaths = [];
  const relativePaths = Array.from(new Set(inventory.paths.filter(isBundledExtensionArtifactPath))).sort((left, right) => left.localeCompare(right));
  for (const relativePath of relativePaths) {
    const artifactPath = packageRelativePath(instance, relativePath);
    let stat;
    try {
      stat = statSync3(artifactPath);
    } catch {
      issues.push({
        level: "error",
        code: "bundled-public-surface-missing",
        message: `OpenClaw bundled extension artifact \u7F3A\u5931\uFF1A${relativePath}\uFF1B\u8BF7\u6267\u884C\u201C\u68C0\u67E5\u66F4\u65B0\u201D\u91CD\u5EFA\u53D7\u7BA1\u5B89\u88C5\u3002`,
        action: "none",
        path: artifactPath
      });
      continue;
    }
    if (!stat.isFile()) {
      issues.push({
        level: "error",
        code: "bundled-public-surface-not-file",
        message: `OpenClaw bundled extension artifact \u4E0D\u662F\u666E\u901A\u6587\u4EF6\uFF1A${relativePath}\uFF1B\u8BF7\u6267\u884C\u201C\u68C0\u67E5\u66F4\u65B0\u201D\u91CD\u5EFA\u53D7\u7BA1\u5B89\u88C5\u3002`,
        action: "none",
        path: artifactPath
      });
      continue;
    }
    if (stat.nlink <= 1) {
      continue;
    }
    try {
      rewriteFileAsIndependentInode(artifactPath);
      const repairedStat = statSync3(artifactPath);
      if (!repairedStat.isFile() || repairedStat.nlink > 1) {
        throw new Error(`hardlink count remained ${repairedStat.nlink}`);
      }
      repairedRelativePaths.push(relativePath);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      issues.push({
        level: "error",
        code: "bundled-public-surface-hardlink-repair-failed",
        message: `OpenClaw bundled extension artifact \u662F\u786C\u94FE\u63A5\uFF0C\u4E14\u542F\u52A8\u524D\u4FEE\u590D\u5931\u8D25\uFF1A${relativePath} (${message})\u3002`,
        action: "none",
        path: artifactPath
      });
    }
  }
  if (repairedRelativePaths.length > 0) {
    const sample = repairedRelativePaths.slice(0, BUNDLED_PUBLIC_SURFACE_REPAIR_SAMPLE_SIZE).join(", ");
    const extra = repairedRelativePaths.length > BUNDLED_PUBLIC_SURFACE_REPAIR_SAMPLE_SIZE ? ` \u7B49 ${repairedRelativePaths.length} \u4E2A\u6587\u4EF6` : "";
    issues.push({
      level: "warning",
      code: "bundled-public-surface-hardlink-repaired",
      message: `\u68C0\u6D4B\u5230 OpenClaw bundled extension JS \u6587\u4EF6\u4E3A\u786C\u94FE\u63A5\uFF1B\u5DF2\u91CD\u5199\u4E3A\u72EC\u7ACB\u6587\u4EF6\uFF0C\u907F\u514D public surface \u5B89\u5168\u52A0\u8F7D\u5668\u62D2\u7EDD\u6253\u5F00\uFF1A${sample}${extra}\u3002`,
      action: "repaired",
      path: openclawPackageRoot(instance)
    });
  }
  return issues;
}
function packageNameLooksManaged(name) {
  return MANAGED_CHANNEL_KEYS.some((channelKey) => {
    const descriptor = pluginDescriptor(channelKey);
    return channelPluginCandidateIds(descriptor).includes(name);
  });
}
function pluginCandidateIds(descriptor) {
  return channelPluginCandidateIds(descriptor);
}
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function hasPackageDependency(packageJson, field, name) {
  const value = packageJson?.[field]?.[name];
  return typeof value === "string" && value.trim().length > 0;
}
function isPluginRuntimeFile(path) {
  return path.endsWith(".js") || path.endsWith(".mjs") || path.endsWith(".cjs") || path.endsWith(".ts");
}
function pluginPackageImportsOpenClaw(pluginPath) {
  const stack = MANAGED_PLUGIN_RUNTIME_SCAN_ROOTS.map((root) => join6(pluginPath, root)).filter(isDirectory);
  let scannedFiles = 0;
  while (stack.length > 0 && scannedFiles < MANAGED_PLUGIN_RUNTIME_SCAN_MAX_FILES) {
    const current = stack.pop();
    let entries;
    try {
      entries = readdirSync4(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        continue;
      }
      const entryPath = join6(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (!entry.isFile() || !isPluginRuntimeFile(entryPath)) {
        continue;
      }
      scannedFiles += 1;
      try {
        const source = readFileSync6(entryPath, "utf8");
        if (source.includes("openclaw") && OPENCLAW_RUNTIME_IMPORT_RE.test(source)) {
          return true;
        }
      } catch {}
      if (scannedFiles >= MANAGED_PLUGIN_RUNTIME_SCAN_MAX_FILES) {
        break;
      }
    }
  }
  return false;
}
function canResolveOpenClawRuntimeFromPlugin(pluginPath) {
  const requireFromPlugin = createRequire(join6(pluginPath, "package.json"));
  for (const specifier of ["openclaw/plugin-sdk/runtime-store", "openclaw/plugin-sdk", "openclaw"]) {
    try {
      requireFromPlugin.resolve(specifier);
      return true;
    } catch {}
  }
  return false;
}
function preflightManagedPluginOpenClawRuntime(descriptor, candidate, packageJson) {
  if (descriptor.managementMode !== "install_managed" || candidate.location !== "npm") {
    return [];
  }
  const declaresOpenClawPeer = hasPackageDependency(packageJson, "peerDependencies", "openclaw");
  const bundlesOpenClawDependency = hasPackageDependency(packageJson, "dependencies", "openclaw");
  const importsOpenClaw = declaresOpenClawPeer || bundlesOpenClawDependency || pluginPackageImportsOpenClaw(candidate.path);
  if (!importsOpenClaw) {
    return [];
  }
  const expectedVersion = extractPinnedPackageVersion2(descriptor.packageSpec);
  const reinstallHint = expectedVersion ? `\u8BF7\u5230\u6E20\u9053\u9875\u91CD\u88C5\u8BE5\u63D2\u4EF6\u5230 ${expectedVersion} \u540E\u518D\u542F\u52A8\u3002` : "\u8BF7\u5230\u6E20\u9053\u9875\u91CD\u88C5\u8BE5\u63D2\u4EF6\u540E\u518D\u542F\u52A8\u3002";
  const canResolveOpenClawRuntime = canResolveOpenClawRuntimeFromPlugin(candidate.path);
  if (canResolveOpenClawRuntime) {
    return [];
  }
  if (!declaresOpenClawPeer && !bundlesOpenClawDependency) {
    return [{
      level: "error",
      code: "managed-plugin-openclaw-peer-missing",
      message: `${descriptor.label} \u63D2\u4EF6\u8FD0\u884C\u65F6\u4EE3\u7801\u5F15\u7528 openclaw/*\uFF0C\u4F46 package.json \u672A\u58F0\u660E openclaw \u4F9D\u8D56\uFF0C\u4E14\u65E0\u6CD5\u4ECE\u63D2\u4EF6\u5B89\u88C5\u76EE\u5F55\u89E3\u6790 openclaw/plugin-sdk\uFF1BOpenClaw ${OPENCLAW_VERSION} \u7684\u53D7\u7BA1 npm \u5B89\u88C5\u5668\u4E0D\u4F1A\u4E3A\u5B83\u94FE\u63A5\u5BBF\u4E3B openclaw\u3002${reinstallHint}`,
      action: "none",
      path: candidate.path
    }];
  }
  return [{
    level: "error",
    code: "managed-plugin-openclaw-runtime-unresolved",
    message: `${descriptor.label} \u63D2\u4EF6\u58F0\u660E\u4E86 openclaw \u8FD0\u884C\u65F6\u4F9D\u8D56\uFF0C\u4F46\u65E0\u6CD5\u4ECE\u63D2\u4EF6\u5B89\u88C5\u76EE\u5F55\u89E3\u6790 openclaw/plugin-sdk\uFF1B\u8FD9\u901A\u5E38\u8868\u793A\u53D7\u7BA1 npm \u5B89\u88C5\u7F3A\u5C11\u5BBF\u4E3B openclaw peer link\u3002${reinstallHint}`,
    action: "none",
    path: candidate.path
  }];
}
function readPersistedPluginInstallRecords2(instance) {
  if (usesSystemOpenclaw(instance)) {
    return {};
  }
  const recordsPath = join6(instance.homeDir, ".openclaw", "plugins", "installs.json");
  if (!existsSync5(recordsPath)) {
    return {};
  }
  try {
    const payload = JSON.parse(readFileSync6(recordsPath, "utf8"));
    return asRecord(asRecord(payload).installRecords);
  } catch {
    return {};
  }
}
function persistedPluginInstallRecordCandidates(instance, descriptor) {
  const records = readPersistedPluginInstallRecords2(instance);
  return pluginCandidateIds(descriptor).flatMap((pluginId) => {
    const record = asRecord(records[pluginId]);
    const installPath = typeof record.installPath === "string" && record.installPath.trim() ? record.installPath.trim() : typeof record.sourcePath === "string" && record.sourcePath.trim() ? record.sourcePath.trim() : null;
    return installPath && existsSync5(installPath) ? [{ pluginId, path: installPath, location: "npm" }] : [];
  });
}
function pluginPackageVersion(packageJson) {
  return typeof packageJson?.version === "string" ? packageJson.version.trim() || null : null;
}
async function preflightOpenclawVersion(instance) {
  if (usesSystemOpenclaw(instance)) {
    return [];
  }
  const packageJson = await readPackageJson(openclawPackageJsonPath(instance));
  const installedVersion = typeof packageJson?.version === "string" ? packageJson.version.trim() : "";
  const versionCompare = installedVersion ? compareOpenClawVersions(installedVersion, OPENCLAW_VERSION) : null;
  if (!installedVersion || versionCompare === null || versionCompare >= 0) {
    return [];
  }
  return [{
    level: "error",
    code: "openclaw-version-mismatch",
    message: `\u5F53\u524D\u53D7\u7BA1 OpenClaw \u7248\u672C\u662F ${installedVersion}\uFF0C\u4F4E\u4E8E monitor \u652F\u6301\u7684\u6700\u4F4E\u7248\u672C ${OPENCLAW_VERSION}\uFF1B\u8BF7\u5148\u6267\u884C\u201C\u68C0\u67E5\u66F4\u65B0\u201D\u3002`,
    action: "none",
    path: openclawPackageJsonPath(instance)
  }];
}
async function preflightLegacyOverrides(instance) {
  if (usesSystemOpenclaw(instance) || OPENCLAW_HAS_PATCHED_DEPS || OPENCLAW_PATCHES_APPLY_TO_VERSION) {
    return [];
  }
  const packageJsonPath = managedInstallPackageJsonPath(instance);
  const packageJson = await readPackageJson(packageJsonPath);
  const overrides = packageJson?.overrides;
  if (!overrides || typeof overrides !== "object") {
    return [];
  }
  const staleOverrides = LEGACY_PATCHED_OVERRIDE_NAMES.filter((name) => isFileOverride(overrides[name]));
  if (staleOverrides.length === 0) {
    return [];
  }
  return [{
    level: "error",
    code: "legacy-patched-overrides",
    message: `\u68C0\u6D4B\u5230\u65E7\u672C\u5730\u4F9D\u8D56 override\uFF1A${staleOverrides.join(", ")}\uFF1B${OPENCLAW_VERSION} \u4E0D\u518D\u9700\u8981\u8FD9\u4E9B tarball\uFF0C\u8BF7\u5148\u6267\u884C\u201C\u68C0\u67E5\u66F4\u65B0\u201D\u6E05\u7406\u5B89\u88C5\u6E05\u5355\u3002`,
    action: "none",
    path: packageJsonPath
  }];
}
async function checkKnownPlugin(instance, descriptor) {
  const extensionCandidatePaths = pluginCandidateIds(descriptor).map((pluginId) => ({
    pluginId,
    path: pluginId === descriptor.pluginId ? pluginInstallDirectory(instance, descriptor) : join6(pluginExtensionsRoot(instance), pluginId),
    location: "extensions"
  })).filter((candidate) => existsSync5(candidate.path));
  const persistedCandidatePaths = persistedPluginInstallRecordCandidates(instance, descriptor);
  const candidatePaths = [...extensionCandidatePaths, ...persistedCandidatePaths];
  if (candidatePaths.length === 0) {
    return [];
  }
  const aliasPaths = extensionCandidatePaths.filter((candidate) => candidate.pluginId !== descriptor.pluginId);
  const primaryCandidate = candidatePaths.find((candidate) => candidate.pluginId === descriptor.pluginId) ?? null;
  const primaryPath = primaryCandidate?.path ?? null;
  const issues = [];
  for (const candidate of aliasPaths) {
    const disabledPath = isolationPathForPlugin(candidate.path);
    renameSync(candidate.path, disabledPath);
    issues.push({
      level: "warning",
      code: "legacy-channel-plugin-isolated",
      message: `${descriptor.label} \u68C0\u6D4B\u5230\u65E7\u6E20\u9053\u522B\u540D\u63D2\u4EF6\u76EE\u5F55 ${candidate.pluginId}\uFF1B\u5DF2\u9694\u79BB\uFF0C\u907F\u514D\u542F\u52A8\u65F6\u52A0\u8F7D\u65E7\u4EE3\u7801\u3002`,
      action: "isolated",
      path: disabledPath
    });
  }
  if (!primaryPath) {
    return issues;
  }
  if (descriptor.managementMode === "bundled_first") {
    const disabledPath = isolationPathForPlugin(primaryPath);
    renameSync(primaryPath, disabledPath);
    issues.push({
      level: "warning",
      code: "legacy-bundled-plugin-isolated",
      message: `${descriptor.label} \u5DF2\u7531 OpenClaw ${OPENCLAW_VERSION} \u5185\u7F6E\u63D0\u4F9B\uFF1B\u5DF2\u9694\u79BB\u65E7\u672C\u5730\u63D2\u4EF6\u526F\u672C\uFF0C\u907F\u514D\u542F\u52A8\u65F6\u52A0\u8F7D\u65E7\u4EE3\u7801\u3002`,
      action: "isolated",
      path: disabledPath
    });
    return issues;
  }
  const packageJson = await readPackageJson(join6(primaryPath, "package.json"));
  const installedVersion = pluginPackageVersion(packageJson);
  const expectedVersion = extractPinnedPackageVersion2(descriptor.packageSpec);
  if (expectedVersion && !installedVersion) {
    issues.push({
      level: "warning",
      code: "managed-plugin-version-unknown",
      message: `${descriptor.label} \u63D2\u4EF6\u5DF2\u5B58\u5728\uFF0C\u4F46\u65E0\u6CD5\u786E\u8BA4\u7248\u672C\uFF1B\u6309\u7528\u6237\u5B89\u88C5\u63D2\u4EF6\u5904\u7406\uFF0C\u542F\u52A8\u4E0D\u56E0\u7248\u672C\u4FE1\u606F\u7F3A\u5931\u800C\u963B\u65AD\u3002\u5982\u9700\u6062\u590D monitor \u7EA6\u5B9A\u7248\u672C\uFF0C\u8BF7\u5230\u6E20\u9053\u9875\u91CD\u88C5\u8BE5\u63D2\u4EF6\u5230 ${expectedVersion}\u3002`,
      action: "none",
      path: primaryPath
    });
  }
  if (installedVersion && expectedVersion && installedVersion !== expectedVersion) {
    issues.push({
      level: "warning",
      code: "managed-plugin-version-mismatch",
      message: `${descriptor.label} \u63D2\u4EF6\u7248\u672C\u662F ${installedVersion}\uFF0Cmonitor \u7EA6\u5B9A\u7248\u672C\u662F ${expectedVersion}\uFF1B\u6309\u7528\u6237\u5B89\u88C5\u63D2\u4EF6\u5904\u7406\uFF0C\u542F\u52A8\u4E0D\u56E0\u7248\u672C\u4E0D\u4E00\u81F4\u800C\u963B\u65AD\u3002\u5982\u9700\u6062\u590D monitor \u7EA6\u5B9A\u7248\u672C\uFF0C\u8BF7\u5230\u6E20\u9053\u9875\u91CD\u88C5\u8BE5\u63D2\u4EF6\u3002`,
      action: "none",
      path: primaryPath
    });
  }
  if (primaryCandidate) {
    issues.push(...preflightManagedPluginOpenClawRuntime(descriptor, primaryCandidate, packageJson));
  }
  return issues;
}
async function preflightKnownPlugins(instance) {
  const issues = [];
  for (const channelKey of MANAGED_CHANNEL_KEYS) {
    issues.push(...await checkKnownPlugin(instance, pluginDescriptor(channelKey)));
  }
  return issues;
}
function preflightWeixinRuntimeCompat(instance) {
  let result;
  try {
    result = applyWeixinRuntimeCompatPatch(instance);
  } catch (error) {
    return [{
      level: "error",
      code: "weixin-runtime-compat-patch-failed",
      message: `Weixin \u63D2\u4EF6\u517C\u5BB9\u6027\u4FEE\u590D\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}\uFF1B\u8BF7\u5230\u6E20\u9053\u9875\u91CD\u88C5 Weixin \u63D2\u4EF6\u540E\u518D\u542F\u52A8\u3002`,
      action: "none"
    }];
  }
  if (!result.changed) {
    return [];
  }
  return [{
    level: "warning",
    code: "weixin-runtime-channel-runtime-compat-patched",
    message: result.message || "\u5DF2\u4FEE\u590D\u5FAE\u4FE1\u63D2\u4EF6\u517C\u5BB9\u6027\u3002",
    action: "repaired",
    path: result.patchedFiles[0]
  }];
}
async function preflightUnknownPlugins(instance) {
  const root = pluginExtensionsRoot(instance);
  if (!existsSync5(root)) {
    return [];
  }
  const knownPluginNames = new Set(MANAGED_CHANNEL_KEYS.flatMap((channelKey) => {
    const descriptor = pluginDescriptor(channelKey);
    return channelPluginCandidateIds(descriptor);
  }));
  return readdirSync4(root).filter((entry) => !entry.includes(".disabled-by-openclaw-")).map((entry) => join6(root, entry)).filter((path) => isDirectory(path)).filter((path) => !knownPluginNames.has(basename2(path))).filter((path) => !packageNameLooksManaged(basename2(path))).map((path) => ({
    level: "warning",
    code: "unknown-local-plugin",
    message: `\u68C0\u6D4B\u5230\u672A\u77E5\u672C\u5730\u63D2\u4EF6 ${basename2(path)}\uFF1B\u5982\u679C OpenClaw ${OPENCLAW_VERSION} \u542F\u52A8\u5931\u8D25\uFF0C\u8BF7\u5148\u624B\u52A8\u7981\u7528\u8BE5\u63D2\u4EF6\u518D\u91CD\u8BD5\u3002`,
    action: "none",
    path
  }));
}
async function preflightConfigValidate(instance) {
  if (!await resolveOpenclawBinary(instance)) {
    return [{
      level: "error",
      code: "openclaw-binary-missing",
      message: "OpenClaw binary \u4E0D\u5B58\u5728\uFF0C\u8BF7\u5148\u5B8C\u6210\u5B89\u88C5\u3002",
      action: "none"
    }];
  }
  const result = await runOpenclawCli(instance, {
    args: ["config", "validate", "--json"],
    policyKey: "channels.config.validate",
    tag: "environment.preflight.config.validate"
  });
  if (result.exitCode === 0 && !result.failureKind) {
    return [];
  }
  const details = [result.stderr, result.stdout].map((value) => value.trim()).find(Boolean);
  return [{
    level: "error",
    code: "config-validate-failed",
    message: details || "OpenClaw \u914D\u7F6E\u6821\u9A8C\u5931\u8D25\uFF0C\u8BF7\u5148\u4FEE\u590D\u914D\u7F6E\u540E\u518D\u542F\u52A8\u3002",
    action: "none"
  }];
}
async function preflightOpenclawEnvironment(instance) {
  const issues = [];
  issues.push(...await preflightOpenclawVersion(instance));
  issues.push(...await preflightLegacyOverrides(instance));
  issues.push(...await preflightBundledPublicSurfaces(instance));
  issues.push(...await preflightKnownPlugins(instance));
  issues.push(...preflightWeixinRuntimeCompat(instance));
  issues.push(...await preflightUnknownPlugins(instance));
  issues.push(...await preflightConfigValidate(instance));
  return {
    ok: issues.every((issue) => issue.level !== "error"),
    issues
  };
}
function formatOpenclawEnvironmentPreflightIssue(issue) {
  return formatIssue(issue);
}

// src/lib/openclaw-version.ts
import { readFileSync as readFileSync7 } from "fs";
import { join as join7 } from "path";
function formatOpenClawDisplayVersion(value) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }
  return /^openclaw\b/iu.test(trimmed) ? trimmed.replace(/^openclaw/iu, "OpenClaw") : `OpenClaw ${trimmed}`;
}
function managedOpenclawPackageJsonPath(instance) {
  return join7(instance.installDir, "node_modules", "openclaw", "package.json");
}
function readManagedOpenClawPackageDisplayVersion(instance) {
  if (usesSystemOpenclaw(instance)) {
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync7(managedOpenclawPackageJsonPath(instance), "utf8"));
    return formatOpenClawDisplayVersion(typeof parsed.version === "string" ? parsed.version : null);
  } catch {
    return null;
  }
}
async function resolveStoredOpenClawVersion(instance) {
  return formatOpenClawDisplayVersion(instance.openclawVersion) || formatOpenClawDisplayVersion(await readInstanceRuntimeVersion(instance)) || readManagedOpenClawPackageDisplayVersion(instance);
}
async function resolveCurrentOpenClawVersion(instance) {
  return readManagedOpenClawPackageDisplayVersion(instance) || formatOpenClawDisplayVersion(await readInstanceRuntimeVersion(instance)) || formatOpenClawDisplayVersion(instance.openclawVersion);
}
async function persistOpenClawVersion(instance, version) {
  const displayVersion = formatOpenClawDisplayVersion(version);
  updateInstance(instance.id, { openclawVersion: displayVersion });
  await writeInstanceRuntimeVersion(instance, displayVersion);
  return displayVersion;
}
async function refreshOpenClawVersionMetadata(instance) {
  return persistOpenClawVersion(instance, await resolveCurrentOpenClawVersion(instance));
}

// src/lib/models.ts
import { existsSync as existsSync6, mkdirSync as mkdirSync6 } from "fs";
import { rm as rm2 } from "fs/promises";
var MODELS_CATALOG_CACHE_MAX = 16;
var MODELS_CATALOG_REFRESH_TASK_KEY = "models.catalog.default";
var MODELS_CATALOG_FRESH_MS = 15 * 60 * 1000;
var MODELS_CATALOG_COOLDOWN_MS = 15 * 60 * 1000;
var catalogCache = new L({
  max: MODELS_CATALOG_CACHE_MAX
});
function modelsCatalogSnapshotPath(instance) {
  return `${instance.stateDir}/models-catalog.snapshot.json`;
}
function modelsCatalogMetaPath(instance) {
  return `${instance.stateDir}/models-catalog.snapshot.meta.json`;
}
function resolveOllamaApiBase(baseUrl) {
  const trimmed = baseUrl.trim();
  if (!trimmed) {
    throw new Error("Ollama \u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A");
  }
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("Ollama \u5730\u5740\u65E0\u6548\uFF0C\u8BF7\u8F93\u5165\u5B8C\u6574\u7684 http:// \u6216 https:// \u5730\u5740");
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Ollama \u5730\u5740\u4EC5\u652F\u6301 http \u6216 https \u534F\u8BAE");
  }
  if (parsed.username || parsed.password) {
    throw new Error("Ollama \u5730\u5740\u4E0D\u652F\u6301\u5305\u542B\u7528\u6237\u540D\u6216\u5BC6\u7801");
  }
  parsed.hash = "";
  parsed.search = "";
  parsed.pathname = parsed.pathname.replace(/\/+$/, "").replace(/\/v1$/i, "") || "";
  return parsed.toString().replace(/\/$/, "");
}
function asRecord2(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
async function discoverOllamaModels(baseUrl) {
  const requestedBaseUrl = baseUrl.trim();
  const resolvedApiBaseUrl = resolveOllamaApiBase(requestedBaseUrl);
  const response = await fetch(`${resolvedApiBaseUrl}/api/tags`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5000)
  });
  if (!response.ok) {
    const detail = (await response.text()).trim();
    throw new Error(detail ? `Ollama \u6A21\u578B\u53D1\u73B0\u5931\u8D25\uFF0CHTTP ${response.status}: ${detail}` : `Ollama \u6A21\u578B\u53D1\u73B0\u5931\u8D25\uFF0CHTTP ${response.status}`);
  }
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("Ollama \u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684 JSON");
  }
  const root = asRecord2(payload);
  const models = Array.isArray(root?.models) ? root.models : [];
  const normalizedModels = models.map((item) => {
    const record = asRecord2(item);
    const details = asRecord2(record?.details);
    const modelId = typeof record?.name === "string" && record.name.trim() ? record.name.trim() : typeof record?.model === "string" && record.model.trim() ? record.model.trim() : "";
    if (!modelId) {
      return null;
    }
    return {
      modelId,
      name: typeof record?.name === "string" && record.name.trim() ? record.name.trim() : modelId,
      modifiedAt: typeof record?.modified_at === "string" ? record.modified_at : null,
      size: typeof record?.size === "number" && Number.isFinite(record.size) ? record.size : null,
      digest: typeof record?.digest === "string" ? record.digest : null,
      family: typeof details?.family === "string" ? details.family : null,
      parameterSize: typeof details?.parameter_size === "string" ? details.parameter_size : null,
      quantizationLevel: typeof details?.quantization_level === "string" ? details.quantization_level : null
    };
  }).filter((item) => item !== null);
  return {
    requestedBaseUrl,
    resolvedApiBaseUrl,
    count: normalizedModels.length,
    models: normalizedModels
  };
}
function emptyCatalogResponse() {
  return {
    count: 0,
    models: [],
    providerPresets: listBuiltinProviderPresets(),
    providerCapabilities: buildProviderCapabilities([])
  };
}
function isModelsCatalogStale(fetchedAt) {
  if (!fetchedAt) {
    return true;
  }
  return Date.now() - fetchedAt > MODELS_CATALOG_FRESH_MS;
}
function emptyModelsCatalogEnvelope(source, overrides) {
  return {
    data: emptyCatalogResponse(),
    fetchedAt: null,
    refreshing: false,
    stale: true,
    source,
    lastError: null,
    ...overrides || {}
  };
}
var BUILTIN_PROVIDER_PRESETS = {
  "bailian-coding": {
    baseUrl: "https://coding.dashscope.aliyuncs.com/v1",
    api: "openai-completions"
  },
  bailian: {
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    api: "openai-completions"
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com"
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta"
  },
  "minimax-cn": {
    baseUrl: "https://api.minimaxi.com/anthropic",
    api: "anthropic-messages",
    authHeader: true
  },
  minimax: {
    baseUrl: "https://api.minimax.io/anthropic",
    api: "anthropic-messages",
    authHeader: true
  },
  "kimi-coding": {
    baseUrl: "https://api.kimi.com/coding/",
    api: "anthropic-messages"
  },
  mistral: {
    baseUrl: "https://api.mistral.ai/v1",
    api: "openai-completions"
  },
  moonshot: {
    baseUrl: "https://api.moonshot.ai/v1",
    api: "openai-completions"
  },
  openai: {
    baseUrl: "https://api.openai.com/v1"
  },
  ollama: {
    baseUrl: "http://127.0.0.1:11434",
    api: "ollama"
  },
  openrouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    api: "openai-completions"
  },
  together: {
    baseUrl: "https://api.together.xyz/v1",
    api: "openai-completions"
  },
  xai: {
    baseUrl: "https://api.x.ai/v1",
    api: "openai-completions"
  },
  zai: {
    baseUrl: "https://api.z.ai/api/paas/v4",
    api: "openai-completions"
  },
};
var PROVIDER_LABELS = {
  "bailian-coding": "Bailian Coding",
  bailian: "Bailian",
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
  google: "Google",
  "kimi-coding": "Kimi Coding",
  minimax: "MiniMax",
  "minimax-cn": "MiniMax CN",
  mistral: "Mistral",
  moonshot: "Moonshot",
  ollama: "Ollama",
  "opencode-go": "OpenCode Go",
  openai: "OpenAI",
  openrouter: "OpenRouter",
  together: "Together",
  xai: "xAI",
  zai: "Z.AI"
};
function humanizeProviderId(providerId) {
  return providerId.split(/[-_]/).filter(Boolean).map((segment) => {
    const lower = segment.toLowerCase();
    if (lower === "ai") {
      return "AI";
    }
    if (lower === "cn") {
      return "CN";
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join(" ");
}
function providerDisplayName(providerId) {
  return PROVIDER_LABELS[providerId] || humanizeProviderId(providerId);
}
function providerSortOrder(providerId) {
  switch (providerId) {
    case "bailian-coding":
      return 1;
    case "bailian":
      return 2;
    default:
      return 100;
  }
}
function editorSupportForProvider(providerId, providerType) {
  if (providerType === "custom-openai" || providerType === "ollama") {
    return { editorSupport: "full" };
  }
  if (getBuiltinProviderPreset(providerId)) {
    return { editorSupport: "full" };
  }
  return {
    editorSupport: "cli-only",
    editorReason: "\u8FD9\u4E2A\u5185\u5EFA provider \u6765\u81EA\u8F83\u65B0\u7684 OpenClaw \u80FD\u529B\u6216\u4E13\u7528 onboarding\uFF0Cmonitor \u6682\u672A\u786E\u8BA4\u5B83\u7684\u5B8C\u6574\u53EF\u89C6\u5316 schema\u3002"
  };
}
function getBuiltinProviderPreset(providerId) {
  const preset = BUILTIN_PROVIDER_PRESETS[providerId];
  if (!preset) {
    return null;
  }
  return {
    providerId,
    ...preset
  };
}
function listBuiltinProviderPresets() {
  return Object.entries(BUILTIN_PROVIDER_PRESETS).sort((a, b) => {
    const orderDiff = providerSortOrder(a[0]) - providerSortOrder(b[0]);
    if (orderDiff !== 0) {
      return orderDiff;
    }
    return providerDisplayName(a[0]).localeCompare(providerDisplayName(b[0]));
  }).map(([providerId, preset]) => ({
    providerId,
    ...preset
  }));
}
function asObject2(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function asString2(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}
function asFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function normalizeModelInputCapability(value) {
  if (Array.isArray(value)) {
    const parts = new Set(value.map((entry) => asString2(entry)?.toLowerCase()).filter((entry) => Boolean(entry)));
    if (parts.has("image")) {
      return "text+image";
    }
    if (parts.has("text")) {
      return "text";
    }
    return null;
  }
  const normalized = asString2(value)?.toLowerCase();
  if (!normalized) {
    return null;
  }
  if (normalized.includes("image")) {
    return "text+image";
  }
  if (normalized.includes("text")) {
    return "text";
  }
  return null;
}
function serializeModelInputCapability(value) {
  if (value === "text+image") {
    return ["text", "image"];
  }
  if (value === "text") {
    return ["text"];
  }
  return;
}
async function readConfigFile3(path) {
  return readLooseConfigFile(path);
}
function splitModelRef(modelRef) {
  const [providerId, ...rest] = modelRef.split("/");
  return {
    providerId,
    modelId: rest.join("/")
  };
}
function normalizeRawCatalogSnapshot(raw2) {
  if (Array.isArray(raw2)) {
    return {
      count: raw2.length,
      models: raw2.filter((entry) => Boolean(asRecord2(entry)))
    };
  }
  const object = asRecord2(raw2);
  const nestedData = asRecord2(object?.data);
  const candidateModels = [
    object?.models,
    object?.items,
    nestedData?.models,
    nestedData?.items
  ].find(Array.isArray);
  const models = Array.isArray(candidateModels) ? candidateModels.filter((entry) => Boolean(asRecord2(entry))) : [];
  const count = typeof object?.count === "number" ? object.count : typeof nestedData?.count === "number" ? nestedData.count : models.length;
  return {
    count,
    models
  };
}
function normalizeCatalogModel(model) {
  const explicitKey = asString2(model.key);
  const explicitProviderId = asString2(model.providerId) || asString2(model.provider) || asString2(asObject2(model.providerMeta).id);
  const explicitModelId = asString2(model.modelId) || asString2(model.id) || asString2(model.model) || asString2(model.ref);
  const key = explicitKey && explicitKey.includes("/") ? explicitKey : explicitProviderId && explicitModelId ? `${explicitProviderId}/${explicitModelId}` : null;
  if (!key || !key.includes("/")) {
    return null;
  }
  const { providerId, modelId } = splitModelRef(key);
  const item = {
    key,
    name: asString2(model.name) || modelId,
    local: Boolean(model.local),
    available: model.available === undefined ? true : Boolean(model.available),
    missing: Boolean(model.missing),
    providerId,
    providerType: inferredProviderType(providerId, null),
    modelId
  };
  const input = normalizeModelInputCapability(model.input) || normalizeModelInputCapability(model.inputType);
  const contextWindow = asFiniteNumber(model.contextWindow) ?? asFiniteNumber(model.context_length);
  if (input) {
    item.input = input;
  }
  if (contextWindow !== null) {
    item.contextWindow = contextWindow;
  }
  return item;
}
function inferredProviderType(providerId, providerConfig) {
  if (getBuiltinProviderPreset(providerId)) {
    return providerId === "ollama" ? "ollama" : "builtin";
  }
  if (providerId === "ollama" || providerConfig?.api === "ollama") {
    return "ollama";
  }
  if (providerConfig?.baseUrl) {
    return "custom-openai";
  }
  return "builtin";
}
async function tryResolveOpenclawBinary2(instance) {
  return resolveOpenclawBinary(instance);
}
async function runOpenclawCommand2(instance, args, options) {
  return runOpenclawCli(instance, {
    args,
    policyKey: options?.policyKey,
    tag: options?.tag
  });
}
function formatOpenclawCommandError2(args, result) {
  const command = `openclaw ${args.join(" ")}`;
  const details = [result.stderr, result.stdout].map((value) => value.trim()).find(Boolean);
  if (details) {
    return details;
  }
  if (result.failureKind === "timeout") {
    return `${command} failed (timeout after ${result.durationMs}ms)`;
  }
  if (result.failureKind) {
    return `${command} failed (${result.failureKind})`;
  }
  return `${command} failed`;
}
async function runOpenclawJsonCommand(instance, args, options) {
  const result = await runOpenclawCommand2(instance, args, options);
  if (result.exitCode !== 0) {
    throw new Error(formatOpenclawCommandError2(args, result));
  }
  try {
    return parseJsonFromCommandOutput([result.stdout, result.stderr].filter(Boolean).join(`
`));
  } catch {
    throw new Error(`Invalid JSON from openclaw ${args.join(" ")}`);
  }
}
async function getActiveConfigPath2(instance) {
  return activeConfigPath(instance);
}
function makeJsonArg2(value) {
  return JSON.stringify(value);
}
async function setConfigValue2(instance, path, value) {
  const result = await runOpenclawCommand2(instance, ["config", "set", path, makeJsonArg2(value), "--strict-json"], {
    policyKey: "models.config.set"
  });
  if (result.exitCode !== 0) {
    throw new Error(result.stderr || result.stdout || `Failed to set ${path}`);
  }
}
async function unsetConfigValue(instance, path) {
  const result = await runOpenclawCommand2(instance, ["config", "unset", path], {
    policyKey: "models.config.unset"
  });
  if (result.exitCode !== 0) {
    throw new Error(result.stderr || result.stdout || `Failed to unset ${path}`);
  }
}
function providerModelConfig(providerConfig, modelId) {
  const models = Array.isArray(providerConfig?.models) ? providerConfig.models : [];
  return models.find((model) => typeof model?.id === "string" && model.id === modelId) || null;
}
function buildConfiguredProviderEntry(providerId, providerConfig, catalogMap) {
  const providerType = inferredProviderType(providerId, providerConfig);
  const editorSupport = editorSupportForProvider(providerId, providerType);
  const providerApiKey = typeof providerConfig.apiKey === "string" ? providerConfig.apiKey : null;
  const models = Array.isArray(providerConfig.models) ? providerConfig.models : [];
  return {
    id: providerId,
    displayName: providerDisplayName(providerId),
    providerType,
    api: typeof providerConfig.api === "string" ? providerConfig.api : null,
    baseUrl: typeof providerConfig.baseUrl === "string" ? providerConfig.baseUrl : null,
    apiKeyConfigured: Boolean(providerApiKey),
    apiKeySource: providerApiKey ? "provider" : null,
    editorSupport: editorSupport.editorSupport,
    editorReason: editorSupport.editorReason,
    models: models.filter((model) => typeof model?.id === "string" && model.id.length > 0).map((model) => {
      const modelRef = `${providerId}/${model.id}`;
      const catalogItem = catalogMap.get(modelRef);
      const input = normalizeModelInputCapability(model.input) || normalizeModelInputCapability(catalogItem?.input);
      const entry = {
        modelRef,
        modelId: model.id,
        displayName: typeof model.name === "string" && model.name.trim() ? model.name.trim() : catalogItem?.name || model.id,
        available: Boolean(catalogItem?.available),
        local: Boolean(catalogItem?.local)
      };
      if (input) {
        entry.input = input;
      }
      return entry;
    })
  };
}
function buildProviderCapabilities(models) {
  const providerTypeMap = new Map;
  for (const preset of listBuiltinProviderPresets()) {
    providerTypeMap.set(preset.providerId, preset.providerId === "ollama" ? "ollama" : "builtin");
  }
  for (const model of models) {
    if (!providerTypeMap.has(model.providerId)) {
      providerTypeMap.set(model.providerId, model.providerType);
    }
  }
  return Array.from(providerTypeMap.entries()).sort((a, b) => {
    const orderDiff = providerSortOrder(a[0]) - providerSortOrder(b[0]);
    if (orderDiff !== 0) {
      return orderDiff;
    }
    return providerDisplayName(a[0]).localeCompare(providerDisplayName(b[0]));
  }).map(([providerId, providerType]) => {
    const preset = getBuiltinProviderPreset(providerId);
    const editorSupport = editorSupportForProvider(providerId, providerType);
    return {
      providerId,
      displayName: providerDisplayName(providerId),
      providerType,
      editorSupport: editorSupport.editorSupport,
      editorReason: editorSupport.editorReason,
      baseUrl: preset?.baseUrl,
      api: preset?.api,
      authHeader: preset?.authHeader
    };
  });
}
function normalizeCatalogResponse(raw2) {
  const normalizedRaw = normalizeRawCatalogSnapshot(raw2);
  const value = {
    count: normalizedRaw.count,
    models: normalizedRaw.models.flatMap((model) => {
      const item = normalizeCatalogModel(model);
      return item ? [item] : [];
    }),
    providerPresets: listBuiltinProviderPresets(),
    providerCapabilities: []
  };
  value.providerCapabilities = buildProviderCapabilities(value.models);
  return value;
}
async function readCatalogSnapshot(instance) {
  const snapshotPath = modelsCatalogSnapshotPath(instance);
  if (!existsSync6(snapshotPath)) {
    return null;
  }
  try {
    const raw2 = await readLooseConfigFile(snapshotPath);
    return normalizeCatalogResponse(normalizeRawCatalogSnapshot(raw2));
  } catch (error) {
    console.warn("[models] failed to read catalog snapshot:", error);
    return null;
  }
}
async function readCatalogMeta(instance) {
  const metaPath = modelsCatalogMetaPath(instance);
  if (!existsSync6(metaPath)) {
    return {
      fetchedAt: null,
      lastError: null
    };
  }
  try {
    const raw2 = await readLooseConfigFile(metaPath);
    return {
      fetchedAt: typeof raw2.fetchedAt === "number" && Number.isFinite(raw2.fetchedAt) ? raw2.fetchedAt : null,
      lastError: typeof raw2.lastError === "string" && raw2.lastError.trim() ? raw2.lastError.trim() : null
    };
  } catch (error) {
    console.warn("[models] failed to read catalog meta snapshot:", error);
    return {
      fetchedAt: null,
      lastError: null
    };
  }
}
async function writeCatalogMeta(instance, meta) {
  mkdirSync6(instance.stateDir, { recursive: true });
  await Bun.write(modelsCatalogMetaPath(instance), `${JSON.stringify({
    fetchedAt: meta.fetchedAt,
    lastError: meta.lastError
  }, null, 2)}
`);
}
async function writeCatalogSnapshot(instance, raw2) {
  const normalizedRaw = normalizeRawCatalogSnapshot(raw2);
  mkdirSync6(instance.stateDir, { recursive: true });
  await Bun.write(modelsCatalogSnapshotPath(instance), `${JSON.stringify({
    count: normalizedRaw.count,
    models: normalizedRaw.models
  }, null, 2)}
`);
}
function mergeCatalogEnvelope(data, meta, source) {
  return {
    data: data || emptyCatalogResponse(),
    fetchedAt: meta.fetchedAt,
    refreshing: getRefreshState(MODELS_CATALOG_REFRESH_TASK_KEY).refreshing,
    stale: isModelsCatalogStale(meta.fetchedAt),
    source,
    lastError: meta.lastError
  };
}
async function loadModelsCatalogEnvelope(instance) {
  const cached = catalogCache.get(instance.id);
  if (cached) {
    return {
      ...cached,
      source: "cache",
      refreshing: getRefreshState(MODELS_CATALOG_REFRESH_TASK_KEY).refreshing
    };
  }
  const [snapshot, meta] = await Promise.all([
    readCatalogSnapshot(instance),
    readCatalogMeta(instance)
  ]);
  if (snapshot) {
    const envelope = mergeCatalogEnvelope(snapshot, meta, "snapshot");
    catalogCache.set(instance.id, envelope);
    return envelope;
  }
  return emptyModelsCatalogEnvelope("none", {
    refreshing: getRefreshState(MODELS_CATALOG_REFRESH_TASK_KEY).refreshing,
    lastError: meta.lastError
  });
}
async function refreshModelsCatalogSnapshotNow(instance) {
  if (!await tryResolveOpenclawBinary2(instance)) {
    throw new Error("OpenClaw is not installed yet. Install it before refreshing the models catalog.");
  }
  const raw2 = normalizeRawCatalogSnapshot(await runOpenclawJsonCommand(instance, ["models", "list", "--all", "--json"], {
    policyKey: "models.catalog.refresh"
  }));
  await writeCatalogSnapshot(instance, raw2);
  const fetchedAt = Date.now();
  await writeCatalogMeta(instance, {
    fetchedAt,
    lastError: null
  });
  const value = normalizeCatalogResponse(raw2);
  const envelope = {
    data: value,
    fetchedAt,
    refreshing: getRefreshState(MODELS_CATALOG_REFRESH_TASK_KEY).refreshing,
    stale: false,
    source: "cache",
    lastError: null
  };
  catalogCache.set(instance.id, envelope);
  return envelope;
}
function scheduleModelsCatalogRefresh(instance, options) {
  const queued = enqueueRefreshTask({
    taskKey: MODELS_CATALOG_REFRESH_TASK_KEY,
    cooldownMs: options?.cooldownMs ?? MODELS_CATALOG_COOLDOWN_MS,
    force: options?.force,
    task: async () => {
      console.info(`[models] refreshing catalog snapshot reason=${JSON.stringify(options?.reason || "unspecified")}`);
      try {
        await refreshModelsCatalogSnapshotNow(instance);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const fallback = await loadModelsCatalogEnvelope(instance);
        await writeCatalogMeta(instance, {
          fetchedAt: fallback.fetchedAt,
          lastError: message
        });
        const envelope = {
          ...fallback,
          lastError: message,
          refreshing: getRefreshState(MODELS_CATALOG_REFRESH_TASK_KEY).refreshing
        };
        catalogCache.set(instance.id, envelope);
        throw error;
      }
    }
  });
  observeBackgroundTask({
    label: "models.catalog.refresh",
    instanceId: instance.id,
    taskKey: queued.taskKey,
    reason: options?.reason,
    metadata: {
      accepted: queued.accepted,
      deduplicated: queued.deduplicated,
      refreshing: queued.refreshing
    }
  }, queued.promise);
  return {
    accepted: queued.accepted,
    deduplicated: queued.deduplicated,
    taskKey: queued.taskKey,
    refreshing: queued.refreshing
  };
}
function refreshModelsCatalogSnapshot(instance, options) {
  return scheduleModelsCatalogRefresh(instance, options);
}
async function getModelsCatalog(instance) {
  const envelope = await loadModelsCatalogEnvelope(instance);
  const binaryPath = await tryResolveOpenclawBinary2(instance);
  if (binaryPath && (envelope.source === "none" || envelope.stale)) {
    const refresh = scheduleModelsCatalogRefresh(instance, {
      reason: envelope.source === "none" ? "read_miss" : "stale_read"
    });
    return {
      ...envelope,
      refreshing: refresh.refreshing
    };
  }
  return envelope;
}
async function getModelsConfig(instance) {
  const activeConfigPath3 = await getActiveConfigPath2(instance);
  const configExists = existsSync6(activeConfigPath3);
  const config = await readConfigFile3(activeConfigPath3);
  const catalogMap = new Map;
  const providerConfig = asObject2(asObject2(config.models).providers);
  const providers = {};
  for (const [providerId, value] of Object.entries(providerConfig)) {
    providers[providerId] = asObject2(value);
  }
  const configuredProviders = Object.entries(providers).map(([providerId, provider]) => buildConfiguredProviderEntry(providerId, provider, catalogMap));
  return {
    configPath: activeConfigPath3,
    configExists,
    validation: {
      valid: true
    },
    configuredProviders
  };
}
function normalizeProviderInput(provider) {
  const providerId = provider.providerId.trim();
  const api = typeof provider.api === "string" ? provider.api.trim() : undefined;
  const apiKey = typeof provider.apiKey === "string" ? provider.apiKey.trim() : provider.apiKey;
  const baseUrl = provider.baseUrl?.trim();
  const normalizedModels = new Map;
  if (Array.isArray(provider.models)) {
    for (const item of provider.models) {
      const modelId = typeof item?.modelId === "string" ? item.modelId.trim() : "";
      if (!modelId) {
        continue;
      }
      normalizedModels.set(modelId, {
        modelId,
        input: normalizeModelInputCapability(item.input) || undefined
      });
    }
  }
  if (Array.isArray(provider.modelIds)) {
    for (const rawModelId of provider.modelIds) {
      const modelId = rawModelId.trim();
      if (!modelId || normalizedModels.has(modelId)) {
        continue;
      }
      normalizedModels.set(modelId, { modelId });
    }
  }
  const models = Array.from(normalizedModels.values());
  if (!providerId) {
    throw new Error("providerId is required");
  }
  if (!["builtin", "custom-openai", "ollama"].includes(provider.providerType)) {
    throw new Error("providerType is invalid");
  }
  if (provider.providerType === "builtin" && !getBuiltinProviderPreset(providerId)) {
    throw new Error(`\u5185\u5EFA provider ${providerId} \u5F53\u524D\u4E0D\u5728 monitor \u5DF2\u786E\u8BA4\u652F\u6301\u7684\u53EF\u89C6\u5316\u8303\u56F4\u5185\uFF0C\u8BF7\u6539\u7528 OpenClaw \u5B98\u65B9 onboarding \u6216 CLI \u7BA1\u7406`);
  }
  if (models.length === 0) {
    throw new Error(`provider ${providerId} must include at least one model`);
  }
  return {
    providerId,
    providerType: provider.providerType,
    api,
    apiKey,
    baseUrl: baseUrl || "",
    models
  };
}
function catalogLookupMap(catalog) {
  return new Map(catalog.models.map((model) => [model.key, model]));
}
function providerModelRef(providerId, modelId) {
  return `${providerId}/${modelId}`;
}
function providerApiForProviderInput(provider, currentProvider, preset) {
  if (typeof provider.api === "string" && provider.api.trim()) {
    return provider.api.trim();
  }
  if (typeof currentProvider?.api === "string" && currentProvider.api.trim()) {
    return currentProvider.api;
  }
  if (typeof preset?.api === "string" && preset.api.trim()) {
    return preset.api;
  }
  if (provider.providerType === "ollama") {
    return "ollama";
  }
  if (provider.providerType === "custom-openai") {
    return "openai-completions";
  }
  return;
}
function providerBaseUrlForProviderInput(provider, currentProvider, preset) {
  if (provider.baseUrl) {
    return provider.baseUrl;
  }
  if (preset?.baseUrl) {
    return preset.baseUrl;
  }
  return typeof currentProvider?.baseUrl === "string" ? currentProvider.baseUrl.trim() : "";
}
function displayNameForProviderModel(providerId, modelId, catalogMap) {
  return catalogMap.get(providerModelRef(providerId, modelId))?.name || modelId;
}
function configuredInputForProviderModel(providerType, payloadModel, currentProvider) {
  const currentModel = providerModelConfig(currentProvider || null, payloadModel.modelId);
  const currentInput = normalizeModelInputCapability(currentModel?.input);
  if (providerType === "custom-openai") {
    return payloadModel.input || currentInput;
  }
  return payloadModel.input || currentInput;
}
function providerModelRefsFromProviders(providers) {
  const refs = new Set;
  for (const [providerId, provider] of Object.entries(providers)) {
    const models = Array.isArray(provider.models) ? provider.models : [];
    for (const model of models) {
      if (typeof model?.id === "string" && model.id.trim()) {
        refs.add(providerModelRef(providerId, model.id.trim()));
      }
    }
  }
  return refs;
}
function hasConfiguredModelSelection(value) {
  if (asString2(value)) {
    return true;
  }
  const config = asObject2(value);
  if (asString2(config.primary)) {
    return true;
  }
  const fallbacks = Array.isArray(config.fallbacks) ? config.fallbacks : [];
  return fallbacks.some((fallback) => Boolean(asString2(fallback)));
}
function findFirstImageCapableProviderModelRef(providers) {
  for (const [providerId, providerValue] of Object.entries(providers)) {
    const provider = asObject2(providerValue);
    const models = Array.isArray(provider.models) ? provider.models : [];
    for (const modelValue of models) {
      const model = asObject2(modelValue);
      const modelId = asString2(model.id);
      if (!modelId) {
        continue;
      }
      if (normalizeModelInputCapability(model.input) === "text+image") {
        return providerModelRef(providerId, modelId);
      }
    }
  }
  return null;
}
function resolveImageModelDefaultForProviders(currentDefaults, providers) {
  if (hasConfiguredModelSelection(currentDefaults.imageModel)) {
    return null;
  }
  return findFirstImageCapableProviderModelRef(providers);
}
function buildSyncedAllowlist(currentAllowlist, currentProviders, nextProviders) {
  const previousProviderModelRefs = providerModelRefsFromProviders(currentProviders);
  const nextProviderModelRefs = providerModelRefsFromProviders(nextProviders);
  const nextAllowlist = {};
  for (const [modelRef, value] of Object.entries(currentAllowlist)) {
    if (previousProviderModelRefs.has(modelRef) && !nextProviderModelRefs.has(modelRef)) {
      continue;
    }
    nextAllowlist[modelRef] = asObject2(value);
  }
  for (const modelRef of nextProviderModelRefs) {
    nextAllowlist[modelRef] = asObject2(nextAllowlist[modelRef]);
  }
  return nextAllowlist;
}
async function saveModelsConfig(instance, payload) {
  console.log(`[models] saveModelsConfig start for instance=${instance.id}`);
  if (!await tryResolveOpenclawBinary2(instance)) {
    throw new Error("OpenClaw is not installed yet. Install it before configuring models.");
  }
  if (!Array.isArray(payload.providers)) {
    throw new Error("providers must be an array");
  }
  const normalizedProviders = payload.providers.map(normalizeProviderInput);
  console.log(`[models] normalized providers=${normalizedProviders.length}`);
  const uniqueProviderIds = new Set;
  for (const provider of normalizedProviders) {
    if (uniqueProviderIds.has(provider.providerId)) {
      throw new Error(`Provider\u300C${provider.providerId}\u300D\u5DF2\u5B58\u5728\uFF0C\u8BF7\u76F4\u63A5\u7F16\u8F91\u73B0\u6709\u914D\u7F6E\u3002`);
    }
    uniqueProviderIds.add(provider.providerId);
  }
  const configPath = await getActiveConfigPath2(instance);
  console.log(`[models] target config path=${configPath}`);
  const currentConfig = await readConfigFile3(configPath);
  const currentProvidersRaw = asObject2(asObject2(currentConfig.models).providers);
  const currentDefaultsRaw = asObject2(asObject2(currentConfig.agents).defaults);
  const currentAllowlist = asObject2(currentDefaultsRaw.models);
  const currentProviders = {};
  for (const [providerId, value] of Object.entries(currentProvidersRaw)) {
    currentProviders[providerId] = asObject2(value);
  }
  const catalogMap = catalogLookupMap((await getModelsCatalog(instance)).data);
  const nextProviders = {};
  for (const provider of normalizedProviders) {
    const currentProvider = currentProviders[provider.providerId];
    const preset = getBuiltinProviderPreset(provider.providerId);
    const nextProvider = currentProvider ? { ...currentProvider } : {};
    const api = providerApiForProviderInput(provider, currentProvider, preset);
    const effectiveBaseUrl = providerBaseUrlForProviderInput(provider, currentProvider, preset);
    if (!effectiveBaseUrl) {
      throw new Error(`provider ${provider.providerId} \u7F3A\u5C11 baseUrl\uFF1B\u8BF7\u624B\u52A8\u586B\u5199\uFF0C\u6216\u5148\u5728 monitor \u5185\u5EFA\u9884\u8BBE\u4E2D\u8865\u5145\u5B83`);
    }
    if (api) {
      nextProvider.api = api;
    }
    nextProvider.baseUrl = effectiveBaseUrl;
    if (typeof currentProvider?.authHeader === "boolean") {
      nextProvider.authHeader = currentProvider.authHeader;
    } else if (typeof preset?.authHeader === "boolean") {
      nextProvider.authHeader = preset.authHeader;
    }
    if (typeof provider.apiKey === "string") {
      if (provider.providerType === "ollama") {
        nextProvider.apiKey = provider.apiKey || "ollama-local";
      } else if (provider.apiKey) {
        nextProvider.apiKey = provider.apiKey;
      }
    } else if (typeof currentProvider?.apiKey === "string") {
      nextProvider.apiKey = currentProvider.apiKey;
    }
    nextProvider.models = provider.models?.map((model) => {
      const persistedModel = {
        id: model.modelId,
        name: displayNameForProviderModel(provider.providerId, model.modelId, catalogMap)
      };
      const input = configuredInputForProviderModel(provider.providerType, model, currentProvider);
      const serializedInput = serializeModelInputCapability(input);
      if (serializedInput) {
        persistedModel.input = serializedInput;
      }
      return persistedModel;
    }) || [];
    nextProviders[provider.providerId] = nextProvider;
  }
  const nextAllowlist = buildSyncedAllowlist(currentAllowlist, currentProviders, nextProviders);
  const nextImageModelRef = resolveImageModelDefaultForProviders(currentDefaultsRaw, nextProviders);
  console.log("[models] next providers summary");
  console.log(JSON.stringify(Object.fromEntries(Object.entries(nextProviders).map(([providerId, provider]) => [
    providerId,
    {
      api: provider.api ?? null,
      baseUrl: provider.baseUrl ?? null,
      authHeader: typeof provider.authHeader === "boolean" ? provider.authHeader : null,
      apiKeyConfigured: typeof provider.apiKey === "string" && provider.apiKey.length > 0,
      modelIds: Array.isArray(provider.models) ? provider.models.filter((model) => typeof model?.id === "string").map((model) => model.id) : []
    }
  ])), null, 2));
  const originalSnapshot = {
    exists: await Bun.file(configPath).exists(),
    text: await Bun.file(configPath).text().catch(() => "")
  };
  try {
    console.log("[models] writing models.providers");
    if (Object.keys(nextProviders).length > 0) {
      await setConfigValue2(instance, "models.providers", nextProviders);
    } else {
      await unsetConfigValue(instance, "models.providers").catch(() => {
        return;
      });
    }
    if (Object.keys(nextAllowlist).length > 0) {
      console.log("[models] writing agents.defaults.models");
      await setConfigValue2(instance, "agents.defaults.models", nextAllowlist);
    } else {
      console.log("[models] clearing agents.defaults.models");
      await unsetConfigValue(instance, "agents.defaults.models").catch(() => {
        return;
      });
    }
    if (nextImageModelRef) {
      console.log(`[models] writing agents.defaults.imageModel=${nextImageModelRef}`);
      await setConfigValue2(instance, "agents.defaults.imageModel", nextImageModelRef);
    }
    console.log("[models] validating config");
    const validation = await runOpenclawJsonCommand(instance, ["config", "validate", "--json"], {
      policyKey: "models.config.validate"
    });
    if (!validation.valid) {
      throw new Error(Array.isArray(validation.errors) && validation.errors.length > 0 ? validation.errors.join("; ") : "Config validation failed");
    }
  } catch (error) {
    console.error("[models:error] saveModelsConfig failed, rolling back config file");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    if (originalSnapshot.exists) {
      await Bun.write(configPath, originalSnapshot.text);
    } else if (await Bun.file(configPath).exists()) {
      await rm2(configPath, { force: true });
    }
    throw error;
  }
  console.log("[models] saveModelsConfig completed");
  refreshModelsCatalogSnapshot(instance, {
    force: true,
    reason: "models_config_saved",
    cooldownMs: 0
  });
  return getModelsConfig(instance);
}
async function saveModelsConfigFast(instance, payload) {
  if (!Array.isArray(payload.providers)) {
    throw new Error("providers must be an array");
  }
  const normalizedProviders = payload.providers.map(normalizeProviderInput);
  const uniqueProviderIds = new Set;
  for (const provider of normalizedProviders) {
    if (uniqueProviderIds.has(provider.providerId)) {
      throw new Error(`Provider\u300C${provider.providerId}\u300D\u5DF2\u5B58\u5728\uFF0C\u8BF7\u76F4\u63A5\u7F16\u8F91\u73B0\u6709\u914D\u7F6E\u3002`);
    }
    uniqueProviderIds.add(provider.providerId);
  }
  const configPath = await getActiveConfigPath2(instance);
  const currentConfig = await readConfigFile3(configPath);
  const currentProvidersRaw = asObject2(asObject2(currentConfig.models).providers);
  const currentDefaultsRaw = asObject2(asObject2(currentConfig.agents).defaults);
  const currentAllowlist = asObject2(currentDefaultsRaw.models);
  const currentProviders = {};
  for (const [providerId, value] of Object.entries(currentProvidersRaw)) {
    currentProviders[providerId] = asObject2(value);
  }
  const catalogMap = catalogLookupMap((await getModelsCatalog(instance)).data);
  const nextProviders = {};
  for (const provider of normalizedProviders) {
    const currentProvider = currentProviders[provider.providerId];
    const preset = getBuiltinProviderPreset(provider.providerId);
    const nextProvider = currentProvider ? { ...currentProvider } : {};
    const api = providerApiForProviderInput(provider, currentProvider, preset);
    const effectiveBaseUrl = providerBaseUrlForProviderInput(provider, currentProvider, preset);
    if (!effectiveBaseUrl) {
      throw new Error(`provider ${provider.providerId} \u7F3A\u5C11 baseUrl\uFF1B\u8BF7\u624B\u52A8\u586B\u5199\uFF0C\u6216\u5148\u5728 monitor \u5185\u5EFA\u9884\u8BBE\u4E2D\u8865\u5145\u5B83`);
    }
    if (api) {
      nextProvider.api = api;
    } else {
      delete nextProvider.api;
    }
    nextProvider.baseUrl = effectiveBaseUrl;
    if (typeof currentProvider?.authHeader === "boolean") {
      nextProvider.authHeader = currentProvider.authHeader;
    } else if (typeof preset?.authHeader === "boolean") {
      nextProvider.authHeader = preset.authHeader;
    }
    if (typeof provider.apiKey === "string") {
      if (provider.providerType === "ollama") {
        nextProvider.apiKey = provider.apiKey || "ollama-local";
      } else if (provider.apiKey) {
        nextProvider.apiKey = provider.apiKey;
      } else {
        delete nextProvider.apiKey;
      }
    } else if (typeof currentProvider?.apiKey === "string") {
      nextProvider.apiKey = currentProvider.apiKey;
    }
    nextProvider.models = provider.models?.map((model) => {
      const persistedModel = {
        id: model.modelId,
        name: displayNameForProviderModel(provider.providerId, model.modelId, catalogMap)
      };
      const input = configuredInputForProviderModel(provider.providerType, model, currentProvider);
      const serializedInput = serializeModelInputCapability(input);
      if (serializedInput) {
        persistedModel.input = serializedInput;
      }
      return persistedModel;
    }) || [];
    nextProviders[provider.providerId] = nextProvider;
  }
  const nextAllowlist = buildSyncedAllowlist(currentAllowlist, currentProviders, nextProviders);
  const nextImageModelRef = resolveImageModelDefaultForProviders(currentDefaultsRaw, nextProviders);
  const nextConfig = { ...currentConfig };
  const nextModelsRoot = { ...asObject2(nextConfig.models) };
  if (Object.keys(nextProviders).length > 0) {
    nextModelsRoot.providers = nextProviders;
  } else {
    delete nextModelsRoot.providers;
  }
  if (Object.keys(nextModelsRoot).length > 0) {
    nextConfig.models = nextModelsRoot;
  } else {
    delete nextConfig.models;
  }
  const nextAgentsRoot = { ...asObject2(nextConfig.agents) };
  const nextDefaultsRoot = { ...asObject2(nextAgentsRoot.defaults) };
  if (Object.keys(nextAllowlist).length > 0) {
    nextDefaultsRoot.models = nextAllowlist;
  } else {
    delete nextDefaultsRoot.models;
  }
  if (nextImageModelRef) {
    nextDefaultsRoot.imageModel = nextImageModelRef;
  }
  if (Object.keys(nextDefaultsRoot).length > 0) {
    nextAgentsRoot.defaults = nextDefaultsRoot;
  } else {
    delete nextAgentsRoot.defaults;
  }
  if (Object.keys(nextAgentsRoot).length > 0) {
    nextConfig.agents = nextAgentsRoot;
  } else {
    delete nextConfig.agents;
  }
  await writeInstanceConfig(instance, nextConfig);
  refreshModelsCatalogSnapshot(instance, {
    force: true,
    reason: "models_config_fast_saved",
    cooldownMs: 0
  });
  return getModelsConfig(instance);
}

// src/routes/install.ts
var app2 = new Hono2;
var SHUTDOWN_GRACE_PERIOD_MS = 15000;
var FORCE_KILL_WAIT_MS = 5000;
var STARTUP_WAIT_MS = 30000;
var STARTUP_READY_CONFIRMATION_MS = 3000;
var COUNTDOWN_TICK_MS = 1000;
var MAX_INSTALL_QUEUE_SIZE = 1000;
var GATEWAY_STARTUP_FAILURE_PATTERNS = [
  /\[shutdown\] started: gateway startup failed\b/u,
  /Gateway failed to start:/u
];
// 解析「本机 Node 兼容的最新 openclaw 稳定版」: openclaw@latest 可能要求比本机更高的 Node
// (如 2026.9.3 需 Node>=24.16, 而 fnOS nodejs_v24 常为 24.15), 直接装 latest 会导致网关无法启动。
async function resolveCompatibleOpenclawVersion() {
  const localNode = await resolveSystemNodeVersion();
  if (!localNode) {
    return null;
  }
  const registry = (OPENCLAW_NPM_REGISTRY || "https://registry.npmmirror.com/").replace(/\/+$/u, "") + "/";
  try {
    const res = await fetch(registry + "openclaw", { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    const all = (data && data.versions) || {};
    const stable = Object.keys(all).filter((v) => /^\d{4}\.\d+\.\d+$/u.test(v));
    stable.sort((a, b) => Bun.semver.order(b, a));
    for (const v of stable) {
      const engines = all[v] && all[v].engines ? all[v].engines.node : undefined;
      if (!engines || Bun.semver.satisfies(localNode, engines)) {
        return v;
      }
    }
  } catch {}
  return null;
}
async function resolveManagedOpenClawPackageSpec(action) {
  const compatible = await resolveCompatibleOpenclawVersion().catch(() => null);
  if (compatible) {
    return {
      packageSpec: `openclaw@${compatible}`,
      label: action === "update" ? "latest-compatible" : "compatible"
    };
  }
  return action === "update" ? { packageSpec: OPENCLAW_UPDATE_PACKAGE_SPEC, label: "latest" } : { packageSpec: OPENCLAW_PACKAGE_SPEC, label: "pinned" };
}
function sseData(event, payload) {
  return JSON.stringify({ event, ...payload });
}
function sleep(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
function emitLog(enqueue, type, line) {
  enqueue(sseData("log", { type, line }));
}
function emitState(enqueue, phase, label, extra) {
  enqueue(sseData("state", { phase, label, ...extra || {} }));
}
function detectGatewayStartupFailureLog(content) {
  const lines = content.split(/\r?\n/u);
  for (let index = lines.length - 1;index >= 0; index -= 1) {
    const line = lines[index]?.trim();
    if (!line) {
      continue;
    }
    if (GATEWAY_STARTUP_FAILURE_PATTERNS.some((pattern) => pattern.test(line))) {
      return line;
    }
  }
  return null;
}
async function readGatewayStartupFailure(instance) {
  const logFile = Bun.file(instance.logPath);
  if (!await logFile.exists()) {
    return null;
  }
  return detectGatewayStartupFailureLog(await logFile.text());
}
async function emitGatewayLogTail(instance, enqueue, maxLines = 15) {
  const logFile = Bun.file(instance.logPath);
  if (!await logFile.exists()) {
    return;
  }
  const content = await logFile.text();
  for (const line of content.split(/\r?\n/u).slice(-maxLines)) {
    if (line.trim()) {
      emitLog(enqueue, "stderr", line);
    }
  }
}
async function readLines(stream2, type, onLine) {
  const reader = stream2.getReader();
  const decoder = new TextDecoder;
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done)
        break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(`
`);
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (line.length > 0) {
          onLine(sseData("log", { type, line }));
        }
      }
    }
    if (buffer.length > 0) {
      onLine(sseData("log", { type, line: buffer }));
    }
  } finally {
    reader.releaseLock();
  }
}
function randomPort() {
  return Math.floor(Math.random() * 40000) + 1e4;
}
async function deploySoulMd(instance, enqueue) {
  if (!SOUL_MD_SRC) {
    return;
  }
  try {
    const src = Bun.file(SOUL_MD_SRC);
    if (!await src.exists()) {
      return;
    }
    const workspaceDest = `${instance.workspaceDir}/SOUL.md`;
    mkdirSync7(instance.workspaceDir, { recursive: true });
    await Bun.write(workspaceDest, src);
    emitLog(enqueue, "info", `Deployed SOUL.md to workspace ${workspaceDest}`);
    const legacyDest = `${instance.homeDir}/.openclaw/SOUL.md`;
    try {
      mkdirSync7(`${instance.homeDir}/.openclaw`, { recursive: true });
      await Bun.write(legacyDest, src);
      emitLog(enqueue, "info", `Mirrored SOUL.md to legacy path ${legacyDest}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      emitLog(enqueue, "stderr", `Failed to mirror SOUL.md to legacy path: ${msg}`);
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    emitLog(enqueue, "stderr", `Failed to deploy SOUL.md: ${msg}`);
  }
}
async function ensureManagedInstallPackageJson(packageJsonPath, enqueue) {
  let packageJson = {
    name: "managed-openclaw",
    private: true
  };
  const packageJsonFile = Bun.file(packageJsonPath);
  if (await packageJsonFile.exists()) {
    try {
      packageJson = JSON.parse(await packageJsonFile.text());
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      emitLog(enqueue, "stderr", `Failed to parse existing package.json, resetting overrides: ${msg}`);
    }
  }
  if (!packageJson.name) {
    packageJson.name = "managed-openclaw";
  }
  packageJson.private = true;
  const overrides = {
    ...typeof packageJson.overrides === "object" && packageJson.overrides && !Array.isArray(packageJson.overrides) ? packageJson.overrides : {}
  };
  if (OPENCLAW_HAS_PATCHED_DEPS && OPENCLAW_PATCHED_BAILEYS_TARBALL && OPENCLAW_PATCHED_LIBSIGNAL_TARBALL) {
    overrides["@whiskeysockets/baileys"] = `file:${OPENCLAW_PATCHED_BAILEYS_TARBALL}`;
    overrides.libsignal = `file:${OPENCLAW_PATCHED_LIBSIGNAL_TARBALL}`;
    emitLog(enqueue, "info", `Applying local dependency overrides from ${OPENCLAW_PATCHES_DIR}`);
  } else {
    if (String(overrides["@whiskeysockets/baileys"] || "").startsWith("file:")) {
      delete overrides["@whiskeysockets/baileys"];
    }
    if (String(overrides.libsignal || "").startsWith("file:")) {
      delete overrides.libsignal;
    }
  }
  if (Object.keys(overrides).length > 0) {
    packageJson.overrides = overrides;
  } else {
    delete packageJson.overrides;
  }
  await Bun.write(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
function managedBundledPluginRuntimeEnv(instance) {
  const managedInstallHome = `${instance.installDir}/.bun-home`;
  mkdirSync7(managedInstallHome, { recursive: true });
  return {
    ...openclawEnv(instance),
    HOME: managedInstallHome,
    OPENCLAW_STATE_DIR: instance.stateDir,
    OPENCLAW_HOME: instance.homeDir,
    BUN_INSTALL_CACHE_DIR: `${managedInstallHome}/.cache`,
    SHARP_IGNORE_GLOBAL_LIBVIPS: "1",
    NPM_CONFIG_REGISTRY: OPENCLAW_NPM_REGISTRY,
    npm_config_registry: OPENCLAW_NPM_REGISTRY,
    NPM_CONFIG_CACHE: `${managedInstallHome}/.npm`,
    npm_config_cache: `${managedInstallHome}/.npm`
  };
}
async function runBundledPluginPostinstallForManagedInstance(instance, enqueue) {
  if (usesSystemOpenclaw(instance)) {
    return;
  }
  const packageRoot = `${instance.installDir}/node_modules/openclaw`;
  const stageScriptPath = `${packageRoot}/scripts/postinstall-bundled-plugins.mjs`;
  const stageScript = Bun.file(stageScriptPath);
  if (!await stageScript.exists()) {
    emitLog(enqueue, "info", `Bundled plugin postinstall script not found at ${stageScriptPath}; skipping explicit postinstall.`);
    return;
  }
  emitLog(enqueue, "info", `Running OpenClaw bundled plugin postinstall script ${stageScriptPath}`);
  const nodeExecPath = Bun.which("node");
  if (!nodeExecPath) {
    throw new Error("Node.js executable not found in PATH; cannot run bundled plugin postinstall.");
  }
  const env = managedBundledPluginRuntimeEnv(instance);
  const proc = Bun.spawn([nodeExecPath, stageScriptPath], {
    cwd: packageRoot,
    env,
    stdout: "pipe",
    stderr: "pipe"
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited
  ]);
  for (const line of stdout.split(/\r?\n/u).filter(Boolean)) {
    emitLog(enqueue, "info", line);
  }
  for (const line of stderr.split(/\r?\n/u).filter(Boolean)) {
    emitLog(enqueue, "stderr", line);
  }
  if (exitCode !== 0) {
    const details = [stderr, stdout].map((value) => value.trim()).find(Boolean);
    throw new Error(details || "Bundled plugin postinstall failed.");
  }
  emitLog(enqueue, "success", "Bundled plugin postinstall completed successfully.");
}
async function ensureOpenclawConfig(instance, port, enqueue, c3) {
  await ensureInstanceDirectories(instance);
  const config = await readInstanceConfig(instance);
  const gateway = config.gateway || {};
  gateway.mode = "local";
  gateway.port = port;
  // 方案A: 网关直接 TLS 对外(浏览器直连 https://NAS:18990/control), 看到真实客户端 IP,
  // 绕开 2026.9.1 对反向代理的 proxy_attribution_required 归属校验(FNOS 门户不转发客户端 IP, 回环代理必被拒)。
  gateway.bind = "lan";
  const tls = gateway.tls || {};
  if (!tls.enabled) { tls.enabled = true; }
  const portalCert = "/usr/trim/nginx/conf/server.crt";
  const portalKey = "/usr/trim/nginx/conf/server.key";
  if (existsSync(portalCert) && existsSync(portalKey)) {
    if (tls.certPath !== portalCert) { tls.certPath = portalCert; }
    if (tls.keyPath !== portalKey) { tls.keyPath = portalKey; }
  } else if (!tls.autoGenerate) { tls.autoGenerate = true; }
  gateway.tls = tls;
  delete gateway.trustedProxies;
  const auth = gateway.auth || {};
  if (typeof auth.token !== "string" || auth.token.length === 0) {
    auth.token = crypto.randomUUID().replace(/-/g, "");
  }
  delete auth.trustedProxy;
  gateway.auth = auth;
  const controlUi = gateway.controlUi || {};
  controlUi.enabled = true;
  controlUi.basePath = "/";
  controlUi.dangerouslyDisableDeviceAuth = true;
  controlUi.allowedOrigins = ["*"];
  gateway.controlUi = controlUi;
  // 新版适配: 放行 fake-IP 特殊用途地址(RFC 2544 / IPv6 ULA / allowCidrs), 兼容 Clash/sing-box 等 fake-IP DNS 环境,
  // 使最新版 OpenClaw 的 web_fetch / 浏览器 / 目录抓取可解析 (catalog.openclaw.ai/clawhub.ai 解析为 198.18.x.x)。
  // 注: 2026.9.1 无 gateway.ssrfPolicy 键(配置校验会拒绝), fake-IP 放行只能落在 tools.web.fetch / browser 层。
  const makeSsr = (o) => ({
    ...(o || {}),
    allowRfc2544BenchmarkRange: true,
    allowIpv6UniqueLocalRange: true
  });
  let browser = config.browser;
  if (!browser) { browser = config.browser = {}; }
  if (JSON.stringify(browser.ssrfPolicy || {}) !== JSON.stringify(makeSsr(browser.ssrfPolicy))) { browser.ssrfPolicy = makeSsr(browser.ssrfPolicy); }
  let tools = config.tools;
  if (!tools) { tools = config.tools = {}; }
  let web = tools.web;
  if (!web) { web = tools.web = {}; }
  let fetchCfg = web.fetch;
  if (!fetchCfg) { fetchCfg = web.fetch = {}; }
  if (JSON.stringify(fetchCfg.ssrfPolicy || {}) !== JSON.stringify(makeSsr(fetchCfg.ssrfPolicy))) { fetchCfg.ssrfPolicy = makeSsr(fetchCfg.ssrfPolicy); }
  // fake-IP 环境: 显式声明 model catalog URL, 使网关走 allowedOrigins 放行路径, 避免远程模型目录被 SSRF 守卫拦截
  // (官方默认即此 URL; 显式设置仅改变 SSRF 判定, 不改变抓取目标)
  const modelsCfg = config.models || {};
  const catalogRefresh = modelsCfg.catalogRefresh || {};
  if (!catalogRefresh.url) {
    catalogRefresh.url = "https://catalog.openclaw.ai/models/v1/catalog.json";
    modelsCfg.catalogRefresh = catalogRefresh;
    config.models = modelsCfg;
  }
  const agents = config.agents || {};
  const defaults = agents.defaults || {};
  defaults.workspace = instance.workspaceDir;
  agents.defaults = defaults;
  const update = config.update || {};
  update.checkOnStart = false;
  // 剥离旧版本遗留/新版本不识别的键, 避免配置校验失败 (2026.9.1 不再认可: controlUi.allowInsecureAuth / gateway.ssrfPolicy / 顶层 cli / ssrfPolicy.allowCidrs)
  if (gateway.controlUi) { delete gateway.controlUi.allowInsecureAuth; }
  delete gateway.ssrfPolicy;
  delete config.cli;
  if (config.browser && config.browser.ssrfPolicy) { delete config.browser.ssrfPolicy.allowCidrs; }
  if (config.tools && config.tools.web && config.tools.web.fetch && config.tools.web.fetch.ssrfPolicy) { delete config.tools.web.fetch.ssrfPolicy.allowCidrs; }
  // 清理频道配置里的 allowFrom/groupAllowFrom 非法项(数字0/空串/非字符串), 避免启动时配置校验失败(用户未重新保存频道时同样生效)
  if (config.channels && typeof config.channels === "object") {
    for (const channelKey of Object.keys(config.channels)) {
      const channelSection = config.channels[channelKey];
      if (channelSection && typeof channelSection === "object") {
        if (channelKey === "qqbot") {
          fixQQBotAllowFrom(channelSection);
        } else {
          sanitizeAllowFromDeep(channelSection, false);
        }
      }
    }
  }
  // 自动修复: 确保模型配置中标注了图片支持的模型(名称含 vision/vl/多模态/gpt-4o/gpt-5 等)实际配置为 input: ["text+image"]
  // (模型 schema 的 input 字段是数组; 旧配置可能写了字符串 "text" 或数组缺少 text+image)
  if (config.models && config.models.providers) {
    for (const [, provider] of Object.entries(config.models.providers)) {
      if (!provider || !provider.models || !Array.isArray(provider.models)) continue;
      for (const m of provider.models) {
        const modelName = m.id || m.modelId || "";
        const isVision = /vision|vl|多模态|4o|4v|gpt-5/i.test(modelName);
        if (isVision) {
          const hasImage = Array.isArray(m.input) ? m.input.includes("text+image") : m.input === "text+image";
          if (!hasImage) {
            m.input = ["text+image"];
          }
        }
      }
    }
  }
  config.gateway = gateway;
  config.agents = agents;
  config.update = update;
  await writeInstanceConfig(instance, config);
  enqueue(sseData("log", {
    type: "info",
    line: `Config written: ${activeConfigPath(instance)}`
  }));
  enqueue(sseData("log", {
    type: "info",
    line: `[gateway] seeded gateway.controlUi.allowedOrigins ${JSON.stringify(controlUi.allowedOrigins)}`
  }));
}
async function listGatewayPids(instance, port) {
  const pids = new Set;
  if (port) {
    for (const pid of await findListeningPids(port)) {
      if (pid) {
        pids.add(pid);
      }
    }
  }
  try {
    const pidFromFile = readFileSync8(instance.pidPath, "utf8").trim();
    if (pidFromFile) {
      pids.add(pidFromFile);
    }
  } catch {}
  return pids;
}
async function filterValidatedGatewayPids(pids, enqueue, warnedPids) {
  const validated = new Set;
  for (const pid of pids) {
    if (!isPidAlive(pid)) {
      continue;
    }
    const snapshot = await describeProcess(pid);
    if (isLikelyOpenclawProcess(snapshot)) {
      validated.add(pid);
      continue;
    }
    const detail = snapshot?.commandLine || snapshot?.executablePath || "unknown process";
    if (!warnedPids || !warnedPids.has(pid)) {
      warnedPids?.add(pid);
      emitLog(enqueue, "error", `Refusing to signal PID ${pid} because it is not recognized as an OpenClaw process: ${detail}`);
    }
  }
  return validated;
}
async function collectGatewayBootstrapCandidates(instance, port, rootPid, watchPids) {
  const candidates = await listGatewayPids(instance, port);
  candidates.add(rootPid);
  for (const watchedPid of watchPids) {
    if (!isPidAlive(watchedPid)) {
      continue;
    }
    for (const relatedPid of await listProcessTreePids(watchedPid)) {
      if (relatedPid) {
        candidates.add(relatedPid);
      }
    }
  }
  return candidates;
}
async function probeGatewayStartup(instance, port, rootPid, watchPids, enqueue, warnedPids) {
  const candidatePids = await collectGatewayBootstrapCandidates(instance, port, rootPid, watchPids);
  const validatedPids = await filterValidatedGatewayPids(candidatePids, enqueue, warnedPids);
  const validatedAlivePids = Array.from(validatedPids).filter((pid) => isPidAlive(pid));
  for (const pid of validatedAlivePids) {
    watchPids.add(pid);
  }
  const trackedAlive = Array.from(watchPids).filter((pid) => isPidAlive(pid));
  const portListening = await isPortListening(port);
  return {
    ready: portListening && validatedAlivePids.length > 0,
    portListening,
    bootstrapAlive: trackedAlive.length > 0,
    validatedAlivePids
  };
}
async function confirmGatewayStartupReady(instance, port, rootPid, watchPids, enqueue, warnedPids) {
  const deadline = Date.now() + STARTUP_READY_CONFIRMATION_MS;
  let startupState = await probeGatewayStartup(instance, port, rootPid, watchPids, enqueue, warnedPids);
  while (true) {
    const failureLine = await readGatewayStartupFailure(instance);
    if (failureLine) {
      return { ready: false, failureLine, startupState };
    }
    if (!startupState.ready) {
      return { ready: false, failureLine: null, startupState };
    }
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      return { ready: true, failureLine: null, startupState };
    }
    await sleep(Math.min(500, remainingMs));
    startupState = await probeGatewayStartup(instance, port, rootPid, watchPids, enqueue, warnedPids);
  }
}
function fallbackGatewayPids(pids, enqueue, context) {
  const fallback = new Set;
  for (const pid of pids) {
    if (pid === String(process.pid)) {
      emitLog(enqueue, "error", `Refusing fallback stop for PID ${pid} because it matches the monitor process itself.`);
      continue;
    }
    fallback.add(pid);
  }
  if (fallback.size > 0) {
    emitLog(enqueue, "info", `Falling back to configured-port PID ownership for ${context}: ${Array.from(fallback).join(", ")}`);
  }
  return fallback;
}
async function waitForGatewayState(predicate, options) {
  const deadline = Date.now() + options.timeoutMs;
  let lastCountdown = null;
  while (true) {
    if (await predicate()) {
      emitState(options.enqueue, options.phase, options.label, {
        countdownSeconds: 0,
        countdownTotalSeconds: Math.ceil(options.timeoutMs / 1000)
      });
      return true;
    }
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      return false;
    }
    const countdownSeconds = Math.ceil(remainingMs / 1000);
    if (countdownSeconds !== lastCountdown) {
      lastCountdown = countdownSeconds;
      emitState(options.enqueue, options.phase, options.label, {
        countdownSeconds,
        countdownTotalSeconds: Math.ceil(options.timeoutMs / 1000)
      });
    }
    await sleep(Math.min(COUNTDOWN_TICK_MS, remainingMs));
  }
}
async function gracefulStopGateway(instance, enqueue, reason) {
  const existingPort = await readInstancePort(instance);
  const warnedPids = new Set;
  const initialPidCandidates = await listGatewayPids(instance, existingPort);
  let initialPids = await filterValidatedGatewayPids(initialPidCandidates, enqueue, warnedPids);
  const initiallyListening = existingPort ? await isPortListening(existingPort) : false;
  if (initialPidCandidates.size === 0 && !initiallyListening) {
    updateInstance(instance.id, { status: "stopped" });
    try {
      rmSync3(instance.pidPath, { force: true });
    } catch {}
    emitState(enqueue, "stopped", `${instance.displayName} \u5DF2\u505C\u6B62`, {
      countdownSeconds: 0,
      countdownTotalSeconds: Math.ceil(SHUTDOWN_GRACE_PERIOD_MS / 1000)
    });
    emitLog(enqueue, "info", existingPort ? `No running gateway process found on port ${existingPort}. Marked instance as stopped.` : "No running gateway process found. Marked instance as stopped.");
    return false;
  }
  if (initialPids.size === 0) {
    initialPids = fallbackGatewayPids(initialPidCandidates, enqueue, existingPort ? `${instance.displayName} on configured port ${existingPort}` : instance.displayName);
  }
  if (initialPids.size === 0) {
    throw new Error(existingPort ? `Refusing to stop ${instance.displayName}: no validated OpenClaw process found for configured port ${existingPort}, and no safe fallback PID was available.` : `Refusing to stop ${instance.displayName}: no validated OpenClaw process found.`);
  }
  const verb = reason === "stop" ? "\u5173\u95ED" : "\u91CD\u542F\u524D\u5173\u95ED";
  emitState(enqueue, "stopping", `\u6B63\u5728\u4F18\u96C5${verb} ${instance.displayName}`, {
    countdownSeconds: Math.ceil(SHUTDOWN_GRACE_PERIOD_MS / 1000),
    countdownTotalSeconds: Math.ceil(SHUTDOWN_GRACE_PERIOD_MS / 1000)
  });
  emitLog(enqueue, "info", `Sending SIGTERM to gateway (PID: ${Array.from(initialPids).join(", ") || "unknown"}${existingPort ? `, port: ${existingPort}` : ""})`);
  for (const pid of initialPids) {
    const pidNumber = Number(pid);
    if (Number.isInteger(pidNumber) && pidNumber > 0) {
      try {
        process.kill(pidNumber, "SIGTERM");
      } catch {}
    }
  }
  const stoppedGracefully = await waitForGatewayState(async () => {
    const activePids = await filterValidatedGatewayPids(await listGatewayPids(instance, existingPort), enqueue, warnedPids);
    const pidAlive = Array.from(activePids).some((pid) => isPidAlive(pid));
    const portBusy = existingPort ? await isPortListening(existingPort) : false;
    return !pidAlive && !portBusy;
  }, {
    timeoutMs: SHUTDOWN_GRACE_PERIOD_MS,
    phase: "stopping",
    label: `\u7B49\u5F85 ${instance.displayName} \u5B8C\u6210\u4F18\u96C5\u5173\u95ED`,
    enqueue
  });
  if (!stoppedGracefully) {
    const forceKillCandidates = await listGatewayPids(instance, existingPort);
    let forceKillPids = await filterValidatedGatewayPids(forceKillCandidates, enqueue, warnedPids);
    if (forceKillPids.size === 0) {
      forceKillPids = fallbackGatewayPids(forceKillCandidates, enqueue, existingPort ? `${instance.displayName} on configured port ${existingPort} during forced stop` : `${instance.displayName} during forced stop`);
    }
    emitState(enqueue, "forcing-stop", `${instance.displayName} \u4F18\u96C5\u5173\u95ED\u8D85\u65F6\uFF0C\u5F00\u59CB\u5F3A\u5236\u7ED3\u675F`, {
      countdownSeconds: Math.ceil(FORCE_KILL_WAIT_MS / 1000),
      countdownTotalSeconds: Math.ceil(FORCE_KILL_WAIT_MS / 1000)
    });
    emitLog(enqueue, "error", `Graceful shutdown timed out after ${Math.ceil(SHUTDOWN_GRACE_PERIOD_MS / 1000)}s. Forcing termination.`);
    for (const pid of forceKillPids) {
      const pidNumber = Number(pid);
      if (Number.isInteger(pidNumber) && pidNumber > 0) {
        try {
          process.kill(pidNumber, "SIGKILL");
        } catch {}
      }
    }
    const killed = await waitForGatewayState(async () => {
      const activePids = await filterValidatedGatewayPids(await listGatewayPids(instance, existingPort), enqueue, warnedPids);
      const pidAlive = Array.from(activePids).some((pid) => isPidAlive(pid));
      const portBusy = existingPort ? await isPortListening(existingPort) : false;
      return !pidAlive && !portBusy;
    }, {
      timeoutMs: FORCE_KILL_WAIT_MS,
      phase: "forcing-stop",
      label: `\u7B49\u5F85 ${instance.displayName} \u5B8C\u6210\u5F3A\u5236\u5173\u95ED`,
      enqueue
    });
    if (!killed) {
      updateInstance(instance.id, { status: "error" });
      throw new Error(`${instance.displayName} did not exit after graceful shutdown timeout and forced termination.`);
    }
  }
  updateInstance(instance.id, { status: "stopped" });
  try {
    rmSync3(instance.pidPath, { force: true });
  } catch {}
  emitState(enqueue, "stopped", `${instance.displayName} \u5DF2\u505C\u6B62`, {
    countdownSeconds: 0,
    countdownTotalSeconds: Math.ceil(SHUTDOWN_GRACE_PERIOD_MS / 1000)
  });
  emitLog(enqueue, "success", `Gateway stopped cleanly${existingPort ? ` on port ${existingPort}` : ""}.`);
  return true;
}
async function startOpenclaw(instance, port, enqueue, c3) {
  await ensureOpenclawConfig(instance, port, enqueue, c3);
  const compatResult = await ensureManagedOpenclawPluginSdkCompat(instance);
  if (compatResult.patched) {
    const patchedSummary = compatResult.patchedPaths.length === 1 ? compatResult.patchedPaths[0] : `${compatResult.patchedPaths.length} files`;
    emitLog(enqueue, "info", `Patched OpenClaw compatibility artifacts: ${patchedSummary}`);
  }
  await runBundledPluginPostinstallForManagedInstance(instance, enqueue);
  emitLog(enqueue, "info", "Running OpenClaw environment preflight checks...");
  const preflight = await preflightOpenclawEnvironment(instance);
  for (const issue of preflight.issues) {
    emitLog(enqueue, issue.level === "error" ? "error" : issue.level === "warning" ? "stderr" : "info", `[preflight:${issue.code}] ${formatOpenclawEnvironmentPreflightIssue(issue)}`);
  }
  if (!preflight.ok) {
    updateInstance(instance.id, { status: "error" });
    throw new Error("OpenClaw environment preflight failed. Please resolve the reported issues before starting Gateway.");
  }
  emitLog(enqueue, "success", "OpenClaw environment preflight passed.");
  const openclawBinary = await requireOpenclawBinary(instance);
  const cmd = [
    openclawBinary,
    "gateway",
    "run",
    "--port",
    String(port),
    "--bind",
    "lan"
  ];
  emitState(enqueue, "starting", `\u6B63\u5728\u542F\u52A8 ${instance.displayName}`, {
    countdownSeconds: Math.ceil(STARTUP_WAIT_MS / 1000),
    countdownTotalSeconds: Math.ceil(STARTUP_WAIT_MS / 1000)
  });
  emitLog(enqueue, "info", `Starting gateway: ${cmd.join(" ")}`);
  try {
    rmSync3(instance.logPath, { force: true });
  } catch {}
  const proc = spawnDetachedToLog(cmd, {
    env: openclawEnv(instance),
    cwd: openclawSpawnCwd(instance),
    logPath: instance.logPath
  });
  const rootPid = String(proc.pid);
  await Bun.write(instance.pidPath, `${rootPid}
`);
  updateInstance(instance.id, { gatewayPort: port, status: "starting" });
  const warnedPids = new Set;
  const watchPids = new Set([rootPid]);
  const startupDeadline = Date.now() + STARTUP_WAIT_MS;
  let lastCountdown = null;
  let bootstrapNoticeEmitted = false;
  let confirmationNoticeEmitted = false;
  while (true) {
    const startupState = await probeGatewayStartup(instance, port, rootPid, watchPids, enqueue, warnedPids);
    const failureLine = await readGatewayStartupFailure(instance);
    if (failureLine) {
      await emitGatewayLogTail(instance, enqueue);
      updateInstance(instance.id, { status: "error" });
      throw new Error(`Gateway startup failed: ${failureLine}`);
    }
    if (startupState.ready) {
      if (!confirmationNoticeEmitted) {
        confirmationNoticeEmitted = true;
        emitLog(enqueue, "info", `Gateway port ${port} is listening; confirming startup completed cleanly.`);
      }
      const confirmed = await confirmGatewayStartupReady(instance, port, rootPid, watchPids, enqueue, warnedPids);
      if (confirmed.failureLine) {
        await emitGatewayLogTail(instance, enqueue);
        updateInstance(instance.id, { status: "error" });
        throw new Error(`Gateway startup failed: ${confirmed.failureLine}`);
      }
      if (!confirmed.ready) {
        await sleep(Math.min(COUNTDOWN_TICK_MS, Math.max(0, startupDeadline - Date.now())));
        continue;
      }
      const listenerPid = (await findListeningPids(port))[0] || confirmed.startupState.validatedAlivePids[0] || rootPid;
      if (listenerPid && isPidAlive(listenerPid)) {
        await Bun.write(instance.pidPath, `${listenerPid}
`);
      }
      updateInstance(instance.id, { gatewayPort: port, status: "running" });
      emitState(enqueue, "running", `${instance.displayName} \u5DF2\u5C31\u7EEA`, {
        countdownSeconds: 0,
        countdownTotalSeconds: Math.ceil(STARTUP_WAIT_MS / 1000)
      });
      emitLog(enqueue, "success", `openclaw gateway is running on port ${port} (pids: ${confirmed.startupState.validatedAlivePids.join(", ")})`);
      return;
    }
    const remainingMs = startupDeadline - Date.now();
    if (remainingMs > 0) {
      const countdownSeconds = Math.ceil(remainingMs / 1000);
      if (countdownSeconds !== lastCountdown) {
        lastCountdown = countdownSeconds;
        emitState(enqueue, "starting", `\u7B49\u5F85 ${instance.displayName} \u5C31\u7EEA`, {
          countdownSeconds,
          countdownTotalSeconds: Math.ceil(STARTUP_WAIT_MS / 1000)
        });
      }
      await sleep(Math.min(COUNTDOWN_TICK_MS, remainingMs));
      continue;
    }
    if (startupState.bootstrapAlive) {
      if (!bootstrapNoticeEmitted) {
        bootstrapNoticeEmitted = true;
        emitLog(enqueue, "info", `OpenClaw CLI \u5DF2\u542F\u52A8\uFF0C\u4F46 Gateway \u4ECD\u5728\u9884\u70ED\u9636\u6BB5\uFF1B\u7EE7\u7EED\u7B49\u5F85\u76D1\u542C\u7AEF\u53E3 ${port}\u3002`);
      }
      emitState(enqueue, "starting", `\u7B49\u5F85 ${instance.displayName} \u5B8C\u6210\u9884\u70ED`, {
        countdownSeconds: null,
        countdownTotalSeconds: Math.ceil(STARTUP_WAIT_MS / 1000)
      });
      await sleep(COUNTDOWN_TICK_MS);
      continue;
    }
    await emitGatewayLogTail(instance, enqueue);
    updateInstance(instance.id, { status: "error" });
    throw new Error(`Gateway exited before listening on port ${port}. See gateway logs for details.`);
  }
}
async function hasOpenclawBinary(instance) {
  return await resolveOpenclawBinary(instance) !== null;
}
function resolveInstance2(instanceId) {
  if (!instanceId) {
    return ensureDefaultInstance();
  }
  return getInstance(instanceId);
}
app2.post("/", async (c3) => {
  const body = await c3.req.json().catch(() => ({}));
  const requestedMethod = body.method || "bun";
  const method = requestedMethod === "npm" ? "bun" : requestedMethod;
  const action = body.action || "install";
  const instance = resolveInstance2(body.instanceId);
  if (!instance) {
    return c3.json({ message: "Instance not found" }, 404);
  }
  return streamSSE(c3, async (stream2) => {
    const queue = [];
    let streamClosed = false;
    let writeChain = Promise.resolve();
    function enqueue(data) {
      if (queue.length >= MAX_INSTALL_QUEUE_SIZE) {
        console.warn(`[install] Queue size limit reached (${MAX_INSTALL_QUEUE_SIZE}), dropping message`);
        return;
      }
      queue.push(data);
      scheduleFlush();
    }
    function scheduleFlush() {
      writeChain = writeChain.then(async () => {
        if (streamClosed) {
          return;
        }
        await flushQueue();
      }).catch((error) => {
        streamClosed = true;
        console.error("[install] Failed to flush SSE queue:", error);
      });
    }
    async function flushQueue() {
      while (queue.length > 0) {
        const data = queue.shift();
        try {
          await stream2.writeSSE({ data, event: "message" });
        } catch (error) {
          streamClosed = true;
          console.error("[install] Failed to write SSE:", error);
          break;
        }
      }
    }
    const heartbeat = setInterval(() => {
      if (streamClosed || queue.length > 0) {
        return;
      }
      writeChain = writeChain.then(async () => {
        if (!streamClosed) {
          await stream2.writeSSE({ data: "", event: "heartbeat" });
        }
      }).catch((error) => {
        streamClosed = true;
        console.error("[install] SSE heartbeat failed:", error);
      });
    }, 5000);
    try {
      if (action === "start" || action === "restart") {
        emitLog(enqueue, "info", action === "restart" ? `Restarting ${instance.displayName}...` : `Starting ${instance.displayName}...`);
        if (!await hasOpenclawBinary(instance)) {
          enqueue(sseData("error", {
            message: "openclaw binary not found. Please install first."
          }));
          await writeChain;
          return;
        }
        if (action === "restart") {
          await gracefulStopGateway(instance, enqueue, "restart");
        }
        let port = await readInstancePort(instance);
        if (!port) {
          port = randomPort();
          await writeInstancePort(instance, port);
        }
        await startOpenclaw(instance, port, enqueue, c3);
        const version = await refreshOpenClawVersionMetadata(instance);
        enqueue(sseData("complete", { success: true, version, port, instanceId: instance.id }));
        await writeChain;
        return;
      }
      if (action === "stop") {
        if (usesSystemOpenclaw(instance)) {
          enqueue(sseData("error", {
            message: "System OpenClaw mode is attached to your existing gateway. Stop is disabled in monitor to avoid terminating the shared transparent gateway. Stop it manually if you really intend to shut it down."
          }));
          await writeChain;
          return;
        }
        emitLog(enqueue, "info", `Stopping ${instance.displayName}...`);
        await gracefulStopGateway(instance, enqueue, "stop");
        enqueue(sseData("complete", { success: true, stopped: true, instanceId: instance.id }));
        await writeChain;
        return;
      }
      if (action === "reinstall" || action === "update") {
        if (usesSystemOpenclaw(instance)) {
          enqueue(sseData("log", {
            type: "info",
            line: action === "update" ? `System OpenClaw mode detected. Skipping local update and restarting the system gateway instead.` : `System OpenClaw mode detected. Skipping local reinstall and restarting the system gateway instead.`
          }));
          await gracefulStopGateway(instance, enqueue, action);
          let port = await readInstancePort(instance);
          if (!port) {
            port = randomPort();
            await writeInstancePort(instance, port);
          }
          await startOpenclaw(instance, port, enqueue, c3);
          const version = await refreshOpenClawVersionMetadata(instance);
          enqueue(sseData("complete", { success: true, version, port, instanceId: instance.id }));
          await writeChain;
          return;
        }
        enqueue(sseData("log", {
          type: "info",
          line: action === "update" ? `Checking updates for ${instance.displayName} and upgrading managed installation to the latest OpenClaw release...` : `Reinstalling ${instance.displayName} from the pinned OpenClaw package...`
        }));
        await gracefulStopGateway(instance, enqueue, action);
      }
      enqueue(sseData("log", {
        type: "info",
        line: `Starting installation with method: ${method}`
      }));
      if (usesSystemOpenclaw(instance)) {
        enqueue(sseData("log", {
          type: "info",
          line: `System OpenClaw mode detected. Monitor will use the existing OpenClaw installation and ~/.openclaw config instead of creating a managed local install.`
        }));
        if (!await hasOpenclawBinary(instance)) {
          enqueue(sseData("error", {
            message: "System OpenClaw binary not found. Install OpenClaw globally first, then use Start/Restart from monitor."
          }));
          await writeChain;
          return;
        }
        let port = await readInstancePort(instance);
        if (!port) {
          port = randomPort();
          await writeInstancePort(instance, port);
        }
        await startOpenclaw(instance, port, enqueue, c3);
        const version = await refreshOpenClawVersionMetadata(instance);
        enqueue(sseData("complete", { success: true, version, port, instanceId: instance.id }));
        await writeChain;
        return;
      }
      const bunHome = `${instance.installDir}/.bun-home`;
      const env = {
        ...process.env,
        SHARP_IGNORE_GLOBAL_LIBVIPS: "1",
        HOME: bunHome,
        BUN_INSTALL_CACHE_DIR: `${bunHome}/.cache`,
        NPM_CONFIG_REGISTRY: OPENCLAW_NPM_REGISTRY,
        npm_config_registry: OPENCLAW_NPM_REGISTRY,
        NPM_CONFIG_CACHE: `${bunHome}/.npm`,
        npm_config_cache: `${bunHome}/.npm`
      };
      await ensureInstanceDirectories(instance);
      mkdirSync7(bunHome, { recursive: true });
      const packageJsonPath = `${instance.installDir}/package.json`;
      await ensureManagedInstallPackageJson(packageJsonPath, enqueue);
      const packageSelection = await resolveManagedOpenClawPackageSpec(action);
      let cmd;
      if (method === "bun") {
        cmd = [
          "bun",
          "add",
          "--cwd",
          instance.installDir,
          "--registry",
          OPENCLAW_NPM_REGISTRY,
          packageSelection.packageSpec
        ];
        enqueue(sseData("log", {
          type: "info",
          line: `Install target: ${instance.installDir}`
        }));
        enqueue(sseData("log", {
          type: "info",
          line: `Using package registry: ${OPENCLAW_NPM_REGISTRY}`
        }));
        enqueue(sseData("log", {
          type: "info",
          line: packageSelection.label === "latest" ? `Update OpenClaw package: ${packageSelection.packageSpec}` : `Pinned OpenClaw package: ${packageSelection.packageSpec}`
        }));
        if (OPENCLAW_HAS_PATCHED_DEPS && OPENCLAW_PATCHES_DIR) {
          enqueue(sseData("log", {
            type: "info",
            line: `Patched dependency overrides directory: ${OPENCLAW_PATCHES_DIR}`
          }));
        }
      } else {
        cmd = [
          "bash",
          "-c",
          "curl -fsSL https://openclaw.ai/install.sh | bash"
        ];
      }
      enqueue(sseData("log", { type: "info", line: `Running: ${cmd.join(" ")}` }));
      const proc = Bun.spawn(cmd, {
        stdout: "pipe",
        stderr: "pipe",
        env
      });
      const stdoutDone = readLines(proc.stdout, "stdout", enqueue);
      const stderrDone = readLines(proc.stderr, "stderr", enqueue);
      await Promise.all([stdoutDone, stderrDone]);
      const exitCode = await proc.exited;
      await writeChain;
      if (exitCode === 0) {
        enqueue(sseData("log", {
          type: "success",
          line: "bun add completed successfully!"
        }));
        const installedVersion = await refreshOpenClawVersionMetadata(instance);
        await deploySoulMd(instance, enqueue);
        let port = await readInstancePort(instance);
        if (!port) {
          port = randomPort();
          await writeInstancePort(instance, port);
          enqueue(sseData("log", {
            type: "info",
            line: `Assigned openclaw port: ${port}`
          }));
        } else {
          enqueue(sseData("log", {
            type: "info",
            line: `Reusing configured openclaw port: ${port}`
          }));
        }
        await startOpenclaw(instance, port, enqueue, c3);
        const version = await refreshOpenClawVersionMetadata(instance) || installedVersion;
        const channelRefresh = refreshChannelPlugins(instance, {
          force: true,
          reason: `install_${action}_completed`,
          cooldownMs: 0
        });
        const modelsRefresh = refreshModelsCatalogSnapshot(instance, {
          force: true,
          reason: `install_${action}_completed`,
          cooldownMs: 0
        });
        enqueue(sseData("log", {
          type: "info",
          line: `Scheduled background refreshes: channels(${channelRefresh.deduplicated ? "deduplicated" : "accepted"}), models(${modelsRefresh.deduplicated ? "deduplicated" : "accepted"})`
        }));
        enqueue(sseData("complete", { success: true, version, port, instanceId: instance.id }));
      } else {
        updateInstance(instance.id, { status: "install_failed" });
        enqueue(sseData("error", {
          message: `Installation failed with exit code ${exitCode}`,
          exitCode
        }));
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      enqueue(sseData("error", { message }));
    } finally {
      clearInterval(heartbeat);
      await writeChain;
      await flushQueue();
      streamClosed = true;
    }
  });
});
var install_default = app2;

// src/lib/status.ts
function buildBootstrapUrl(pageUrl, token) {
  const bootstrapUrl = new URL(pageUrl);
  bootstrapUrl.searchParams.set("token", token);
  return bootstrapUrl.toString();
}
async function getInstanceStatus(instance, c3) {
  let installed = false;
  let running = false;
  let bootstrapping = false;
  let version = null;
  let binaryPath = null;
  let port = null;
  let startedAt = null;
  let dashboardUrl = null;
  let dashboardTokenizedUrl = null;
  let proxyDashboardUrl = null;
  let proxyDashboardTokenizedUrl = null;
  let gatewayTokenPresent = false;
  const runtime = await probeInstanceRuntime(instance);
  installed = runtime.installed;
  binaryPath = runtime.binaryPath;
  port = runtime.port;
  running = runtime.running;
  bootstrapping = runtime.bootstrapping;
  startedAt = runtime.startedAt;
  if (installed) {
    version = await resolveStoredOpenClawVersion(instance);
  }
  await reconcileInstanceRuntime(instance, runtime);
  if (installed) {
    const requestTarget = resolveRequestOrigin(c3.req.raw);
    await ensureControlUiAllowedOrigins(instance, {
      url: c3.req.url,
      getHeader: (name) => c3.req.header(name)
    });
    const config = await readInstanceConfig(instance);
    const gateway = config.gateway || {};
    const controlUi = gateway.controlUi || {};
    const auth = gateway.auth || {};
    const configuredUiBasePath = normalizePublicBasePath(typeof controlUi.basePath === "string" && controlUi.basePath.length > 0 ? controlUi.basePath : "/");
    // 方案A: 不再下发代理 URL, 前端改用网关直连 https://host:port/control (浏览器直连网关看到真实客户端IP, 绕开代理归属校验)
    const gatewayTls = !!(gateway && gateway.tls && gateway.tls.enabled);
    proxyDashboardUrl = null;
    if (port) {
      const directProto = gatewayTls ? "https" : "http";
      const directOrigin = `${directProto}://${requestTarget.hostname || "127.0.0.1"}:${port}`;
      dashboardUrl = new URL("/control", `${directOrigin}/`).toString();
    }
    const token = typeof process.env.OPENCLAW_GATEWAY_TOKEN === "string" && process.env.OPENCLAW_GATEWAY_TOKEN.length > 0 ? process.env.OPENCLAW_GATEWAY_TOKEN : typeof auth.token === "string" ? auth.token : null;
    gatewayTokenPresent = Boolean(token);
    if (token) {
      if (dashboardUrl) {
        dashboardTokenizedUrl = buildBootstrapUrl(dashboardUrl, token);
      }
      if (proxyDashboardUrl) {
        proxyDashboardTokenizedUrl = buildBootstrapUrl(proxyDashboardUrl, token);
      }
    }
  }
  return {
    instanceId: instance.id,
    ownerId: instance.ownerId,
    displayName: instance.displayName,
    proxyBasePath: null,
    systemMode: usesSystemOpenclaw(instance),
    installed,
    running,
    bootstrapping,
    version,
    binaryPath,
    port,
    startedAt,
    dashboardUrl,
    dashboardTokenizedUrl,
    proxyDashboardUrl,
    proxyDashboardTokenizedUrl,
    gatewayTokenPresent
  };
}

// src/routes/instances.ts
var app3 = new Hono2;
app3.get("/", async (c3) => {
  const instances = await Promise.all(listInstances().map(async (instance) => getInstanceStatus(instance, c3)));
  return c3.json({ instances });
});
app3.get("/:instanceId", async (c3) => {
  const instance = getInstance(c3.req.param("instanceId"));
  if (!instance) {
    return c3.json({ message: "Instance not found" }, 404);
  }
  return c3.json(await getInstanceStatus(instance, c3));
});
app3.post("/", async (c3) => {
  const body = await c3.req.json().catch(() => ({}));
  const ownerId = body.ownerId?.trim();
  if (!ownerId) {
    return c3.json({ message: "ownerId is required" }, 400);
  }
  const instance = createInstance({
    ownerId,
    displayName: body.displayName
  });
  return c3.json(instance, 201);
});
var instances_default = app3;

// src/lib/weixin-bridge.ts
import { chmodSync as chmodSync2, existsSync as existsSync8, mkdirSync as mkdirSync8, readFileSync as readFileSync9, unlinkSync, writeFileSync as writeFileSync4 } from "fs";
import { homedir as homedir4 } from "os";
import { dirname as dirname5, join as join8 } from "path";
var WEIXIN_DEFAULT_BASE_URL = "https://ilinkai.weixin.qq.com";
var ACTIVE_LOGIN_TTL_MS = 5 * 60000;
var QR_LONG_POLL_TIMEOUT_MS = 35000;
var MAX_QR_REFRESH_COUNT = 3;
var DEFAULT_ILINK_BOT_TYPE = "3";
var DEFAULT_ACCOUNT_ID = "default";
var VALID_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
var INVALID_CHARS_RE = /[^a-z0-9_-]+/g;
var LEADING_DASH_RE = /^-+/;
var TRAILING_DASH_RE = /-+$/;
var BLOCKED_OBJECT_KEYS = new Set(["__proto__", "prototype", "constructor"]);
var activeLogins = new Map;
var REQUIRED_WEIXIN_DM_SCOPE = "per-account-channel-peer";
function asObject3(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function asString3(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}
function asBoolean2(value, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}
function isBlockedObjectKey(key) {
  return BLOCKED_OBJECT_KEYS.has(key);
}
function normalizeAccountId(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return DEFAULT_ACCOUNT_ID;
  }
  if (VALID_ID_RE.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  const normalized = trimmed.toLowerCase().replace(INVALID_CHARS_RE, "-").replace(LEADING_DASH_RE, "").replace(TRAILING_DASH_RE, "").slice(0, 64);
  if (!normalized || isBlockedObjectKey(normalized)) {
    return DEFAULT_ACCOUNT_ID;
  }
  return normalized;
}
function resolveOpenclawStateDir(instance) {
  if (usesSystemOpenclaw(instance)) {
    return join8(process.env.HOME || homedir4(), ".openclaw");
  }
  return join8(instance.homeDir, ".openclaw");
}
function resolveWeixinStateDir(instance) {
  return join8(resolveOpenclawStateDir(instance), "openclaw-weixin");
}
function resolveWeixinAccountsDir(instance) {
  return join8(resolveWeixinStateDir(instance), "accounts");
}
function resolveWeixinAccountsIndexPath(instance) {
  return join8(resolveWeixinStateDir(instance), "accounts.json");
}
function resolveWeixinAccountPath(instance, accountId) {
  return join8(resolveWeixinAccountsDir(instance), `${accountId}.json`);
}
function resolveWeixinAccountSyncPath(instance, accountId) {
  return join8(resolveWeixinAccountsDir(instance), `${accountId}.sync.json`);
}
function resolveWeixinAccountContextTokensPath(instance, accountId) {
  return join8(resolveWeixinAccountsDir(instance), `${accountId}.context-tokens.json`);
}
function safeCredentialKey(raw2) {
  const trimmed = raw2.trim().toLowerCase();
  if (!trimmed) {
    throw new Error("invalid key for allowFrom path");
  }
  const safe = trimmed.replace(/[\\/:*?"<>|]/g, "_").replace(/\.\./g, "_");
  if (!safe || safe === "_") {
    throw new Error("invalid key for allowFrom path");
  }
  return safe;
}
function resolveWeixinCredentialsDir(instance) {
  const override = process.env.OPENCLAW_OAUTH_DIR?.trim();
  if (override) {
    return override;
  }
  return join8(resolveOpenclawStateDir(instance), "credentials");
}
function resolveWeixinAllowFromPath(instance, accountId) {
  return join8(resolveWeixinCredentialsDir(instance), `${safeCredentialKey("openclaw-weixin")}-${safeCredentialKey(accountId)}-allowFrom.json`);
}
function readCurrentConfig(instance) {
  try {
    const filePath = activeConfigPath(instance);
    if (!existsSync8(filePath)) {
      return {};
    }
    return parseLooseConfig(readFileSync9(filePath, "utf8"));
  } catch {
    return {};
  }
}
function readMutableConfig(instance) {
  const filePath = activeConfigPath(instance);
  if (!existsSync8(filePath)) {
    return {};
  }
  return parseLooseConfig(readFileSync9(filePath, "utf8"));
}
function summarizeValidationMessage2(validation) {
  if (Array.isArray(validation.issues) && validation.issues.length > 0) {
    return validation.issues.map((issue) => {
      const path = typeof issue?.path === "string" && issue.path.trim() ? `${issue.path}: ` : "";
      const message = typeof issue?.message === "string" && issue.message.trim() ? issue.message.trim() : "unknown config issue";
      return `${path}${message}`;
    }).join("; ");
  }
  if (Array.isArray(validation.errors) && validation.errors.length > 0) {
    return validation.errors.join("; ");
  }
  return validation.error || undefined;
}
async function validateConfigFile2(instance, configPath) {
  const binaryPath = await resolveOpenclawBinary(instance);
  if (!binaryPath || !existsSync8(configPath)) {
    return;
  }
  const result = await runOpenclawCli(instance, {
    args: ["config", "validate", "--json"],
    policyKey: "channels.config.validate",
    tag: "weixin.config.validate",
    description: "Validate OpenClaw config after Weixin session scope update"
  });
  const payload = [result.stdout, result.stderr].filter(Boolean).join(`
`);
  let validation;
  try {
    validation = parseJsonFromCommandOutput(payload);
  } catch {
    throw new Error("Invalid JSON from openclaw config validate --json");
  }
  if (!validation.valid) {
    throw new Error(summarizeValidationMessage2(validation) || "OpenClaw \u914D\u7F6E\u6821\u9A8C\u5931\u8D25");
  }
}
async function ensureWeixinDmScope(instance) {
  const configPath = activeConfigPath(instance);
  const currentConfig = readMutableConfig(instance);
  const currentSession = asObject3(currentConfig.session);
  if (asString3(currentSession.dmScope) === REQUIRED_WEIXIN_DM_SCOPE) {
    return false;
  }
  const nextConfig = {
    ...currentConfig,
    session: {
      ...currentSession,
      dmScope: REQUIRED_WEIXIN_DM_SCOPE
    }
  };
  const configFile = Bun.file(configPath);
  const existed = await configFile.exists();
  const previousText = existed ? await configFile.text().catch(() => "") : "";
  mkdirSync8(dirname5(configPath), { recursive: true });
  try {
    await Bun.write(configPath, `${JSON.stringify(nextConfig, null, 2)}
`);
    await validateConfigFile2(instance, configPath);
    return true;
  } catch (error) {
    if (existed) {
      await Bun.write(configPath, previousText);
    } else {
      removeFileIfPresent(configPath);
    }
    throw error;
  }
}
async function touchWeixinChannelConfigUpdatedAt(instance) {
  const configPath = activeConfigPath(instance);
  const currentConfig = readMutableConfig(instance);
  const currentChannels = asObject3(currentConfig.channels);
  const currentSection = asObject3(currentChannels["openclaw-weixin"]);
  const nextValue = new Date().toISOString();
  if (asString3(currentSection.channelConfigUpdatedAt) === nextValue) {
    return false;
  }
  const nextConfig = {
    ...currentConfig,
    channels: {
      ...currentChannels,
      "openclaw-weixin": {
        ...currentSection,
        channelConfigUpdatedAt: nextValue
      }
    }
  };
  const configFile = Bun.file(configPath);
  const existed = await configFile.exists();
  const previousText = existed ? await configFile.text().catch(() => "") : "";
  mkdirSync8(dirname5(configPath), { recursive: true });
  try {
    await Bun.write(configPath, `${JSON.stringify(nextConfig, null, 2)}
`);
    await validateConfigFile2(instance, configPath);
    return true;
  } catch (error) {
    if (existed) {
      await Bun.write(configPath, previousText);
    } else {
      removeFileIfPresent(configPath);
    }
    throw error;
  }
}
function readWeixinChannelSection(instance) {
  const config = readCurrentConfig(instance);
  return asObject3(asObject3(config.channels)["openclaw-weixin"]);
}
function parseChannelsStatusEntries(raw2) {
  if (Array.isArray(raw2)) {
    return raw2.filter((entry) => Boolean(entry && typeof entry === "object"));
  }
  const payload = asObject3(raw2);
  if (Array.isArray(payload.channels)) {
    return payload.channels.filter((entry) => Boolean(entry && typeof entry === "object"));
  }
  if (Array.isArray(payload.items)) {
    return payload.items.filter((entry) => Boolean(entry && typeof entry === "object"));
  }
  return [];
}
function matchesWeixinStatusEntry(entry) {
  const ids = [
    asString3(entry.channelId),
    asString3(asObject3(entry.channel).id)
  ].filter((value) => Boolean(value));
  return ids.includes("weixin") || ids.includes("openclaw-weixin");
}
async function readWeixinRuntimeStatus(instance) {
  const binaryPath = await resolveOpenclawBinary(instance);
  if (!binaryPath) {
    return {
      source: "unavailable",
      checkedAt: null,
      error: "OpenClaw \u5C1A\u672A\u5B89\u88C5\uFF0C\u65E0\u6CD5\u68C0\u67E5\u5FAE\u4FE1\u8FD0\u884C\u65F6\u72B6\u6001\u3002",
      accounts: new Map
    };
  }
  const result = await runOpenclawCli(instance, {
    args: ["channels", "status", "--probe", "--json"],
    policyKey: "channels.plugins.list",
    tag: "weixin.channels.status",
    description: "Read OpenClaw channel runtime status for Weixin"
  });
  if (result.exitCode !== 0) {
    return {
      source: "unavailable",
      checkedAt: Date.now(),
      error: `openclaw channels status --probe --json failed`,
      accounts: new Map
    };
  }
  try {
    const payload = parseJsonFromCommandOutput([result.stdout, result.stderr].filter(Boolean).join(`
`));
    const entries = parseChannelsStatusEntries(payload).filter(matchesWeixinStatusEntry);
    const accounts = new Map;
    for (const entry of entries) {
      const accountId = asString3(entry.accountId) || DEFAULT_ACCOUNT_ID;
      accounts.set(normalizeAccountId(accountId), {
        accountId: normalizeAccountId(accountId),
        configured: asBoolean2(entry.configured, false),
        available: asBoolean2(entry.available, false),
        healthy: typeof entry.healthy === "boolean" ? entry.healthy : asBoolean2(entry.available, false),
        status: asString3(entry.status),
        message: asString3(entry.message),
        error: asString3(entry.error)
      });
    }
    return {
      source: "probe",
      checkedAt: Date.now(),
      error: null,
      accounts
    };
  } catch {
    return {
      source: "config_only",
      checkedAt: Date.now(),
      error: "Invalid JSON from openclaw channels status --probe --json",
      accounts: new Map
    };
  }
}
function readStoredWeixinAccount(instance, accountId) {
  try {
    const filePath = resolveWeixinAccountPath(instance, accountId);
    if (!existsSync8(filePath)) {
      return null;
    }
    return JSON.parse(readFileSync9(filePath, "utf8"));
  } catch {
    return null;
  }
}
function listStoredWeixinAccountIds(instance) {
  try {
    const filePath = resolveWeixinAccountsIndexPath(instance);
    if (!existsSync8(filePath)) {
      return [];
    }
    const payload = JSON.parse(readFileSync9(filePath, "utf8"));
    if (!Array.isArray(payload)) {
      return [];
    }
    return payload.filter((item) => typeof item === "string" && item.trim().length > 0).map((item) => normalizeAccountId(item));
  } catch {
    return [];
  }
}
function writeStoredWeixinAccount(instance, accountId, payload) {
  const normalizedAccountId = normalizeAccountId(accountId);
  const dir = resolveWeixinAccountsDir(instance);
  mkdirSync8(dir, { recursive: true });
  const existing = readStoredWeixinAccount(instance, normalizedAccountId) || {};
  const token = payload.token?.trim() || existing.token?.trim();
  const baseUrl = payload.baseUrl?.trim() || existing.baseUrl?.trim();
  const userId = payload.userId?.trim() || existing.userId?.trim();
  const nextPayload = {
    ...token ? { token, savedAt: new Date().toISOString() } : {},
    ...baseUrl ? { baseUrl } : {},
    ...userId ? { userId } : {}
  };
  const filePath = resolveWeixinAccountPath(instance, normalizedAccountId);
  writeFileSync4(filePath, JSON.stringify(nextPayload, null, 2), "utf8");
  try {
    chmodSync2(filePath, 384);
  } catch {}
}
function registerStoredWeixinAccountId(instance, accountId) {
  const normalizedAccountId = normalizeAccountId(accountId);
  const dir = resolveWeixinStateDir(instance);
  mkdirSync8(dir, { recursive: true });
  const existing = listStoredWeixinAccountIds(instance);
  if (existing.includes(normalizedAccountId)) {
    return;
  }
  writeFileSync4(resolveWeixinAccountsIndexPath(instance), `${JSON.stringify([...existing, normalizedAccountId], null, 2)}
`, "utf8");
}
function unregisterStoredWeixinAccountId(instance, accountId) {
  const normalizedAccountId = normalizeAccountId(accountId);
  const existing = listStoredWeixinAccountIds(instance);
  const nextAccountIds = existing.filter((item) => item !== normalizedAccountId);
  if (nextAccountIds.length === existing.length) {
    return false;
  }
  writeFileSync4(resolveWeixinAccountsIndexPath(instance), `${JSON.stringify(nextAccountIds, null, 2)}
`, "utf8");
  return true;
}
function removeFileIfPresent(filePath) {
  try {
    unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
}
function clearStoredWeixinAccount(instance, accountId) {
  const normalizedAccountId = normalizeAccountId(accountId);
  const removedFiles = [
    removeFileIfPresent(resolveWeixinAccountPath(instance, normalizedAccountId)),
    removeFileIfPresent(resolveWeixinAccountSyncPath(instance, normalizedAccountId)),
    removeFileIfPresent(resolveWeixinAccountContextTokensPath(instance, normalizedAccountId)),
    removeFileIfPresent(resolveWeixinAllowFromPath(instance, normalizedAccountId))
  ];
  const removedIndex = unregisterStoredWeixinAccountId(instance, normalizedAccountId);
  activeLogins.delete(normalizedAccountId);
  return removedIndex || removedFiles.some(Boolean);
}
function resolveConfiguredRouteTag(instance, accountId) {
  const section = readWeixinChannelSection(instance);
  const normalizedAccountId = accountId ? normalizeAccountId(accountId) : null;
  const accounts = asObject3(section.accounts);
  const accountConfig = normalizedAccountId ? asObject3(accounts[normalizedAccountId]) : {};
  const accountRouteTag = accountConfig.routeTag;
  if (typeof accountRouteTag === "number" && Number.isFinite(accountRouteTag)) {
    return String(accountRouteTag);
  }
  if (typeof accountRouteTag === "string" && accountRouteTag.trim().length > 0) {
    return accountRouteTag.trim();
  }
  const routeTag = section.routeTag;
  if (typeof routeTag === "number" && Number.isFinite(routeTag)) {
    return String(routeTag);
  }
  if (typeof routeTag === "string" && routeTag.trim().length > 0) {
    return routeTag.trim();
  }
  return;
}
function isLoginFresh(login) {
  return Date.now() < login.deadlineAt;
}
function purgeExpiredLogins() {
  for (const [sessionKey, login] of activeLogins.entries()) {
    if (!isLoginFresh(login)) {
      activeLogins.delete(sessionKey);
    }
  }
}
async function fetchWeixinQRCode(apiBaseUrl, routeTag) {
  const base = apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`;
  const url = new URL(`ilink/bot/get_bot_qrcode?bot_type=${encodeURIComponent(DEFAULT_ILINK_BOT_TYPE)}`, base);
  const headers = {};
  if (routeTag) {
    headers.SKRouteTag = routeTag;
  }
  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u83B7\u53D6\u5931\u8D25: ${response.status} ${response.statusText}${text ? ` - ${text}` : ""}`);
  }
  return await response.json();
}
async function pollWeixinQRCodeStatus(apiBaseUrl, qrcode, routeTag, timeoutMs = QR_LONG_POLL_TIMEOUT_MS) {
  const base = apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`;
  const url = new URL(`ilink/bot/get_qrcode_status?qrcode=${encodeURIComponent(qrcode)}`, base);
  const controller = new AbortController;
  const headers = {
    "iLink-App-ClientVersion": "1"
  };
  if (routeTag) {
    headers.SKRouteTag = routeTag;
  }
  const effectiveTimeoutMs = Math.max(1000, Math.min(QR_LONG_POLL_TIMEOUT_MS, timeoutMs));
  const timer = setTimeout(() => controller.abort(), effectiveTimeoutMs);
  try {
    const response = await fetch(url.toString(), {
      headers,
      signal: controller.signal
    });
    const rawText = await response.text();
    if (!response.ok) {
      throw new Error(`\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u72B6\u6001\u68C0\u67E5\u5931\u8D25: ${response.status} ${response.statusText}${rawText ? ` - ${rawText}` : ""}`);
    }
    return JSON.parse(rawText);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { status: "wait" };
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
function buildExpiresAt(login) {
  return login.deadlineAt;
}
function buildLoginExpiredResponse(sessionKey) {
  return {
    connected: false,
    status: "expired",
    message: "\u626B\u7801\u7B49\u5F85\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801\u3002",
    sessionKey,
    qrUrl: null,
    expiresAt: null
  };
}
async function getWeixinBridgeStatus(instance) {
  const runtimeStatus = await readWeixinRuntimeStatus(instance);
  const accounts = listStoredWeixinAccountIds(instance).map((accountId) => {
    const stored = readStoredWeixinAccount(instance, accountId);
    return {
      accountId,
      savedAt: asString3(stored?.savedAt),
      baseUrl: asString3(stored?.baseUrl),
      userId: asString3(stored?.userId),
      runtime: runtimeStatus.accounts.get(accountId) || null
    };
  }).sort((left, right) => (right.savedAt || "").localeCompare(left.savedAt || ""));
  const runtimeAccounts = [...runtimeStatus.accounts.values()];
  const configured = runtimeAccounts.some((account) => account.configured) || accounts.length > 0;
  const available = runtimeAccounts.some((account) => account.available);
  const healthy = runtimeAccounts.length > 0 ? runtimeAccounts.every((account) => account.healthy) : false;
  return {
    accountCount: accounts.length,
    accounts,
    runtimeSource: runtimeStatus.source,
    runtimeCheckedAt: runtimeStatus.checkedAt,
    runtimeError: runtimeStatus.error,
    configured,
    available,
    healthy
  };
}
async function disconnectWeixinAccount(instance, accountId) {
  const normalizedAccountId = normalizeAccountId(accountId);
  if (!normalizedAccountId) {
    throw new Error("\u7F3A\u5C11\u8981\u65AD\u5F00\u7684\u5FAE\u4FE1\u8D26\u53F7 ID\u3002");
  }
  const removedStoredAccount = clearStoredWeixinAccount(instance, normalizedAccountId);
  const removedConfigAccount = await removeWeixinAccountConfig(instance, normalizedAccountId);
  const status = await getWeixinBridgeStatus(instance);
  return {
    ok: true,
    accountId: normalizedAccountId,
    message: removedStoredAccount || removedConfigAccount ? `\u5DF2\u65AD\u5F00\u5FAE\u4FE1\u8D26\u53F7 ${normalizedAccountId}\u3002` : `\u5FAE\u4FE1\u8D26\u53F7 ${normalizedAccountId} \u4E0D\u5B58\u5728\u6216\u5DF2\u65AD\u5F00\u3002`,
    removedStoredAccount,
    removedConfigAccount,
    status
  };
}
async function startWeixinQrLogin(instance, options) {
  purgeExpiredLogins();
  const normalizedAccountId = options?.accountId ? normalizeAccountId(options.accountId) : null;
  const sessionKey = normalizedAccountId || crypto.randomUUID();
  const existing = activeLogins.get(sessionKey);
  if (existing && !options?.force && isLoginFresh(existing)) {
    return {
      sessionKey,
      qrUrl: existing.qrcodeUrl,
      message: "\u4E8C\u7EF4\u7801\u5DF2\u5C31\u7EEA\uFF0C\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u3002",
      expiresAt: buildExpiresAt(existing)
    };
  }
  const baseUrl = WEIXIN_DEFAULT_BASE_URL;
  const routeTag = resolveConfiguredRouteTag(instance, normalizedAccountId);
  const qrResponse = await fetchWeixinQRCode(baseUrl, routeTag);
  const nextLogin = {
    sessionKey,
    qrcode: qrResponse.qrcode,
    qrcodeUrl: qrResponse.qrcode_img_content,
    startedAt: Date.now(),
    deadlineAt: Date.now() + ACTIVE_LOGIN_TTL_MS,
    baseUrl,
    currentApiBaseUrl: baseUrl,
    routeTag,
    status: "wait",
    refreshCount: 1
  };
  activeLogins.set(sessionKey, nextLogin);
  return {
    sessionKey,
    qrUrl: nextLogin.qrcodeUrl,
    message: "\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u5E76\u5728\u624B\u673A\u4E0A\u786E\u8BA4\u6388\u6743\u3002",
    expiresAt: buildExpiresAt(nextLogin)
  };
}
async function waitForWeixinQrLogin(instance, params) {
  const sessionKey = params.sessionKey.trim();
  if (!sessionKey) {
    return {
      connected: false,
      status: "error",
      message: "\u7F3A\u5C11\u4E8C\u7EF4\u7801\u4F1A\u8BDD\u6807\u8BC6\u3002",
      sessionKey,
      qrUrl: null,
      expiresAt: null
    };
  }
  const login = activeLogins.get(sessionKey);
  if (!login) {
    return {
      connected: false,
      status: "error",
      message: "\u5F53\u524D\u6CA1\u6709\u8FDB\u884C\u4E2D\u7684\u5FAE\u4FE1\u767B\u5F55\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801\u3002",
      sessionKey,
      qrUrl: null,
      expiresAt: null
    };
  }
  const timeoutMs = Math.max(params.timeoutMs ?? 45000, 1000);
  const requestDeadline = Date.now() + timeoutMs;
  while (Date.now() < requestDeadline) {
    if (!isLoginFresh(login)) {
      activeLogins.delete(sessionKey);
      return buildLoginExpiredResponse(sessionKey);
    }
    const remainingMs = Math.min(requestDeadline - Date.now(), login.deadlineAt - Date.now());
    if (remainingMs <= 0) {
      break;
    }
    const statusResponse = await pollWeixinQRCodeStatus(login.currentApiBaseUrl, login.qrcode, login.routeTag, remainingMs);
    login.status = statusResponse.status;
    if (statusResponse.status === "wait") {
      continue;
    }
    if (statusResponse.status === "scaned") {
      return {
        connected: false,
        status: "scaned",
        message: "\u5DF2\u626B\u7801\uFF0C\u8BF7\u5728\u5FAE\u4FE1\u4E2D\u786E\u8BA4\u6388\u6743\u3002",
        sessionKey,
        qrUrl: login.qrcodeUrl,
        expiresAt: buildExpiresAt(login)
      };
    }
    if (statusResponse.status === "scaned_but_redirect") {
      const redirectHost = asString3(statusResponse.redirect_host);
      if (redirectHost) {
        login.currentApiBaseUrl = `https://${redirectHost}`;
      }
      return {
        connected: false,
        status: "scaned_but_redirect",
        message: "\u5DF2\u626B\u7801\uFF0C\u6B63\u5728\u5207\u6362\u5FAE\u4FE1\u63A5\u5165\u8282\u70B9\uFF0C\u8BF7\u7EE7\u7EED\u7B49\u5F85\u624B\u673A\u7AEF\u786E\u8BA4\u3002",
        sessionKey,
        qrUrl: login.qrcodeUrl,
        expiresAt: buildExpiresAt(login)
      };
    }
    if (statusResponse.status === "expired") {
      if (login.refreshCount >= MAX_QR_REFRESH_COUNT) {
        activeLogins.delete(sessionKey);
        return {
          connected: false,
          status: "expired",
          message: "\u4E8C\u7EF4\u7801\u591A\u6B21\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002",
          sessionKey,
          qrUrl: null,
          expiresAt: null
        };
      }
      const refreshed = await fetchWeixinQRCode(login.baseUrl, login.routeTag);
      login.qrcode = refreshed.qrcode;
      login.qrcodeUrl = refreshed.qrcode_img_content;
      login.startedAt = Date.now();
      login.currentApiBaseUrl = login.baseUrl;
      login.refreshCount += 1;
      return {
        connected: false,
        status: "expired",
        message: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\uFF0C\u5DF2\u81EA\u52A8\u5237\u65B0\uFF0C\u8BF7\u91CD\u65B0\u626B\u7801\u3002",
        sessionKey,
        qrUrl: login.qrcodeUrl,
        expiresAt: buildExpiresAt(login)
      };
    }
    if (statusResponse.status === "confirmed") {
      if (!statusResponse.bot_token || !statusResponse.ilink_bot_id) {
        activeLogins.delete(sessionKey);
        return {
          connected: false,
          status: "error",
          message: "\u767B\u5F55\u5DF2\u786E\u8BA4\uFF0C\u4F46\u5FAE\u4FE1\u63D2\u4EF6\u6CA1\u6709\u8FD4\u56DE\u5B8C\u6574\u8D26\u53F7\u4FE1\u606F\u3002",
          sessionKey,
          qrUrl: null,
          expiresAt: null
        };
      }
      const normalizedAccountId = normalizeAccountId(statusResponse.ilink_bot_id);
      let sessionConfigUpdated = false;
      try {
        sessionConfigUpdated = await ensureWeixinDmScope(instance);
      } catch (err) {
        console.error("[weixin:dmScope] failed to update session.dmScope, continuing with account save:", err);
      }
      writeStoredWeixinAccount(instance, normalizedAccountId, {
        token: statusResponse.bot_token,
        baseUrl: statusResponse.baseurl || login.currentApiBaseUrl || login.baseUrl,
        userId: statusResponse.ilink_user_id
      });
      registerStoredWeixinAccountId(instance, normalizedAccountId);
      try {
        await touchWeixinChannelConfigUpdatedAt(instance);
      } catch (err) {
        console.error("[weixin:configReload] failed to update channels.openclaw-weixin.channelConfigUpdatedAt:", err);
      }
      activeLogins.delete(sessionKey);
      return {
        connected: true,
        status: "confirmed",
        message: "\u5FAE\u4FE1\u8FDE\u63A5\u6210\u529F\uFF0C\u8BF7\u91CD\u542F Gateway \u8BA9\u65B0\u8D26\u53F7\u5F00\u59CB\u76D1\u542C\u3002",
        sessionKey,
        qrUrl: null,
        expiresAt: null,
        accountId: normalizedAccountId,
        restartRequired: true,
        sessionConfigUpdated
      };
    }
  }
  if (!isLoginFresh(login)) {
    activeLogins.delete(sessionKey);
    return buildLoginExpiredResponse(sessionKey);
  }
  return {
    connected: false,
    status: login.status || "wait",
    message: login.status === "scaned" ? "\u5DF2\u626B\u7801\uFF0C\u8BF7\u7EE7\u7EED\u5728\u5FAE\u4FE1\u4E2D\u786E\u8BA4\u6388\u6743\u3002" : "\u7B49\u5F85\u626B\u7801\u4E2D...",
    sessionKey,
    qrUrl: login.qrcodeUrl,
    expiresAt: buildExpiresAt(login)
  };
}

// src/routes/channels.ts
var app4 = new Hono2;
app4.get("/config", async (c3) => {
  try {
    console.log("[channels] reading config snapshot");
    return c3.json(await getChannelsConfig(ensureDefaultInstance()));
  } catch (error) {
    console.error("[channels:error] failed to read config snapshot");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app4.get("/plugins", async (c3) => {
  try {
    const payload = await getChannelPlugins(ensureDefaultInstance());
    console.log(`[channels] returning plugins source=${payload.source} stale=${payload.stale} refreshing=${payload.refreshing}`);
    return c3.json(payload);
  } catch (error) {
    console.error("[channels:error] failed to read plugin status");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app4.post("/plugins/refresh", async (c3) => {
  try {
    const payload = refreshChannelPlugins(ensureDefaultInstance(), {
      force: true,
      reason: "api_post_refresh",
      cooldownMs: 0
    });
    console.log(`[channels] refresh accepted taskKey=${payload.taskKey} deduplicated=${payload.deduplicated}`);
    return c3.json(payload);
  } catch (error) {
    console.error("[channels:error] failed to refresh plugin status");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app4.post("/config", async (c3) => {
  try {
    const body = await c3.req.json().catch(() => ({ feishu: null }));
    console.log(`[channels] saving channel config payload keys=${Object.keys(body || {}).join(",")}`);
    return c3.json(await saveChannelsConfig(ensureDefaultInstance(), body));
  } catch (error) {
    console.error("[channels:error] failed to save channel config");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
app4.post("/plugins/install", async (c3) => {
  try {
    const body = await c3.req.json().then((payload) => {
      const legacyChannelId = payload.channelId;
      if (!payload.channelKey && legacyChannelId) {
        return { channelKey: legacyChannelId };
      }
      return payload;
    }).catch(() => ({ channelKey: "feishu" }));
    console.log(`[channels] installing plugin for ${body.channelKey}`);
    return c3.json(await installChannelPlugin(ensureDefaultInstance(), body));
  } catch (error) {
    console.error("[channels:error] failed to install channel plugin");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
app4.get("/weixin/status", async (c3) => {
  try {
    console.log("[channels] reading weixin bridge status");
    return c3.json(await getWeixinBridgeStatus(ensureDefaultInstance()));
  } catch (error) {
    console.error("[channels:error] failed to read weixin bridge status");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app4.post("/weixin/login/start", async (c3) => {
  try {
    const instance = ensureDefaultInstance();
    const pluginsEnvelope = await getChannelPlugins(instance);
    if (pluginsEnvelope.source === "none" || pluginsEnvelope.stale) {
      refreshChannelPlugins(instance, {
        reason: "weixin_login_start_precheck"
      });
    }
    const pluginStatus = pluginsEnvelope.plugins.find((item) => item.channelKey === "weixin");
    if (!pluginStatus?.installed) {
      return c3.json({
        message: pluginsEnvelope.refreshing ? "\u6B63\u5728\u5237\u65B0\u5FAE\u4FE1\u63D2\u4EF6\u72B6\u6001\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002" : "\u8BF7\u5148\u5B89\u88C5\u5FAE\u4FE1\u63D2\u4EF6\u540E\u518D\u751F\u6210\u4E8C\u7EF4\u7801\u3002"
      }, 400);
    }
    const body = await c3.req.json().catch(() => ({}));
    console.log("[channels] starting weixin qr login");
    return c3.json(await startWeixinQrLogin(instance, body));
  } catch (error) {
    console.error("[channels:error] failed to start weixin qr login");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
app4.post("/weixin/login/wait", async (c3) => {
  try {
    const instance = ensureDefaultInstance();
    const pluginsEnvelope = await getChannelPlugins(instance);
    if (pluginsEnvelope.source === "none" || pluginsEnvelope.stale) {
      refreshChannelPlugins(instance, {
        reason: "weixin_login_wait_precheck"
      });
    }
    const pluginStatus = pluginsEnvelope.plugins.find((item) => item.channelKey === "weixin");
    if (!pluginStatus?.installed) {
      return c3.json({
        message: pluginsEnvelope.refreshing ? "\u6B63\u5728\u5237\u65B0\u5FAE\u4FE1\u63D2\u4EF6\u72B6\u6001\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002" : "\u8BF7\u5148\u5B89\u88C5\u5FAE\u4FE1\u63D2\u4EF6\u540E\u518D\u68C0\u67E5\u626B\u7801\u72B6\u6001\u3002"
      }, 400);
    }
    const body = await c3.req.json().catch(() => ({}));
    console.log("[channels] waiting for weixin qr login");
    return c3.json(await waitForWeixinQrLogin(instance, {
      sessionKey: body.sessionKey || "",
      timeoutMs: body.timeoutMs
    }));
  } catch (error) {
    console.error("[channels:error] failed to wait for weixin qr login");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
app4.post("/weixin/disconnect", async (c3) => {
  try {
    const body = await c3.req.json().catch(() => ({}));
    console.log(`[channels] disconnecting weixin account accountId=${body.accountId || ""}`);
    return c3.json(await disconnectWeixinAccount(ensureDefaultInstance(), body.accountId || ""));
  } catch (error) {
    console.error("[channels:error] failed to disconnect weixin account");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
app4.post("/qqbot/disconnect", async (c3) => {
  try {
    const body = await c3.req.json().catch(() => ({}));
    console.log(`[channels] disconnecting qqbot account accountId=${body.accountId || ""}`);
    return c3.json(await disconnectQQBotAccount(ensureDefaultInstance(), body.accountId || ""));
  } catch (error) {
    console.error("[channels:error] failed to disconnect qqbot account");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
var channels_default = app4;

// ../../node_modules/.pnpm/@fn+utils@0.3.7/node_modules/@fn/utils/dist/chunk-NWD2NX7R.mjs
var import_spark_md5 = __toESM(require_spark_md5(), 1);

// ../../node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs
/*! js-cookie v3.0.5 | MIT */
function assign(target) {
  for (var i = 1;i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 86400000);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0;i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {}
    }
    return name ? jar[name] : jar;
  }
  return Object.create({
    set,
    get,
    remove: function(name, attributes) {
      set(name, "", assign({}, attributes, {
        expires: -1
      }));
    },
    withAttributes: function(attributes) {
      return init(this.converter, assign({}, this.attributes, attributes));
    },
    withConverter: function(converter2) {
      return init(assign({}, this.converter, converter2), this.attributes);
    }
  }, {
    attributes: { value: Object.freeze(defaultAttributes) },
    converter: { value: Object.freeze(converter) }
  });
}
var api = init(defaultConverter, { path: "/" });

// ../../node_modules/.pnpm/@fn+utils@0.3.7/node_modules/@fn/utils/dist/chunk-NWD2NX7R.mjs
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_calendar = __toESM(require_calendar(), 1);
var import_relativeTime = __toESM(require_relativeTime(), 1);
var import_updateLocale = __toESM(require_updateLocale(), 1);
var import_zh_cn = __toESM(require_zh_cn(), 1);
var Ie = Object.defineProperty;
var Ke = (e, r) => {
  for (var t in r)
    Ie(e, t, { get: r[t], enumerable: true });
};
var v = typeof window < "u";
function d(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function F(e) {
  return Number.isFinite(e);
}
function K(e) {
  return d(e) === "Null";
}
function T(e) {
  return d(e) === "Undefined";
}
function ye(e = 0, r = 100, t = "round") {
  return Math[t](Math.random() * (r - e) + e);
}
var et = (e = {}) => {
  let r = new URLSearchParams;
  for (let t of Object.keys(e).sort())
    !T(e[t]) && !K(e[t]) && r.append(t, e[t]);
  return r.toString().replace(/\+/g, "%20");
};
var tt = (e) => {
  let [r, t] = e.split("?"), n = t ? t.split("&").reduce((o, i) => {
    let [s, l] = i.split("=");
    return l !== "undefined" && l !== "null" && (o[s] = l), o;
  }, {}) : {};
  return [r, n];
};
var rt = (e = "") => {
  try {
    let r = e.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"), t = decodeURIComponent(r);
    return import_spark_md5.default.hash(t);
  } catch (r) {
    return console.log(r), import_spark_md5.default.hash(e);
  }
};
var nt = (e, r = "") => {
  try {
    let t = e?.method?.toUpperCase() === "GET", [n, o] = tt(e.url ?? ""), i = t ? et({ ...e?.params, ...o }) : e?.data ? JSON.stringify(e?.data) : "", s = rt(i), c3 = ye(1e5, 1e6).toString().padStart(6, "0"), p = Date.now() + "", g = ["NDzZTVxnRKP8Z0jXg1VAMonaG8akvh", n, c3, p, s, r].join("_"), f = { nonce: c3, timestamp: p, sign: import_spark_md5.default.hash(g) };
    return Object.entries(f).map(([a, u]) => `${a}=${u}`).join("&");
  } catch (t) {
    return console.log(t), "";
  }
};
var fr = (() => {
  if (!v)
    return {};
  function e() {
    if (!v)
      return false;
    let u = navigator?.userAgent?.toLowerCase() ?? "";
    return u.indexOf("oculusbrowser") !== -1 ? false : u.indexOf("tv") !== -1 || u.indexOf("samsungbrowser") !== -1 || u.indexOf("viera") !== -1 ? true : r();
  }
  function r() {
    if (!v)
      return false;
    let u = navigator?.userAgent?.toLowerCase() ?? "";
    return u.indexOf("netcast") !== -1 || u.indexOf("web0s") !== -1;
  }
  function t(u) {
    let y2 = ["mobi", "ipad", "iphone", "ipod", "silk", "gt-p1000", "nexus 7", "kindle fire", "opera mini"], x2 = u.toLowerCase();
    for (let h = 0, w = y2.length;h < w; h++)
      if (x2.indexOf(y2[h]) !== -1)
        return true;
    return false;
  }
  function n(u) {
    return u.touch || u.xboxOne || u.ps4 || u.edgeUwp ? true : !!u.tv;
  }
  function o() {
    if (!v)
      return [];
    if (/iP(hone|od|ad)|MacIntel/.test(navigator?.platform ?? "")) {
      let u = [/OS (\d+)_(\d+)_?(\d+)?/, /Version\/(\d+)/];
      for (let y2 of u) {
        let x2 = navigator?.appVersion?.match(y2);
        if (x2)
          return [parseInt(x2[1], 10), parseInt(x2[2] || "0", 10), parseInt(x2[3] || "0", 10)];
      }
    }
    return [];
  }
  function i(u) {
    if (!v)
      return false;
    if (u.chrome) {
      if ((navigator?.userAgent?.toLowerCase() ?? "").indexOf("netcast") !== -1) {
        console.warn("Unable to detect webOS version - NetCast");
        return;
      }
      if (u.versionMajor >= 94)
        return 23;
      if (u.versionMajor >= 87)
        return 22;
      if (u.versionMajor >= 79)
        return 6;
      if (u.versionMajor >= 68)
        return 5;
      if (u.versionMajor >= 53)
        return 4;
      if (u.versionMajor >= 38)
        return 3;
      if (u.versionMajor >= 34)
        return 2;
      if (u.versionMajor >= 26)
        return 1;
    } else {
      if (u.versionMajor >= 538)
        return 2;
      if (u.versionMajor >= 537)
        return 1;
    }
    console.error("Unable to detect webOS version");
  }
  function s(u) {
    let y2 = /FNOS\/([\d.]+)|FNAppType\/(\w+)|FNAppVer\/([\d.]+)/g, x2 = {}, h;
    for (;(h = y2.exec(u)) !== null; )
      h[1] && (x2.fnOSVersion = h[1]), h[2] && (x2.fnAppType = h[2]), h[3] && (x2.fnAppVersion = h[3]);
    return x2;
  }
  let l = false, c3 = false;
  function p(u) {
    if (u && (c3 === true || c3 === false))
      return c3;
    if (l === true || l === false)
      return l;
    let y2 = false, x2 = ["Webkit", "O", "Moz"], h = document.createElement("div");
    if (h.style.animationName !== undefined && (y2 = true), y2 === false && u)
      for (let w of x2) {
        let O = w + "AnimationName";
        if (h.style[O] !== undefined) {
          y2 = true;
          break;
        }
      }
    return u ? (c3 = y2, c3) : (l = y2, l);
  }
  let M2 = function(u) {
    u = u.toLowerCase(), u = u.replace(/(motorola edge)/, "").trim();
    let y2 = /(edg)[ /]([\w.]+)/.exec(u) || /(edga)[ /]([\w.]+)/.exec(u) || /(edgios)[ /]([\w.]+)/.exec(u) || /(edge)[ /]([\w.]+)/.exec(u) || /(opera)[ /]([\w.]+)/.exec(u) || /(opr)[ /]([\w.]+)/.exec(u) || /(chrome)[ /]([\w.]+)/.exec(u) || /(safari)[ /]([\w.]+)/.exec(u) || /(firefox)[ /]([\w.]+)/.exec(u) || u.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(u) || [], x2 = /(version)[ /]([\w.]+)/.exec(u), h = /(ipad)/.exec(u) || /(iphone)/.exec(u) || /(windows)/.exec(u) || /(android)/.exec(u) || [], w = y2[1] || "";
    w === "edge" && (h = [""]), w === "opr" && (w = "opera");
    let O;
    x2 && x2.length > 2 && (O = x2[2]), O = O || y2[2] || "0";
    let de = parseInt(O.split(".")[0], 10);
    return isNaN(de) && (de = 0), { browser: w, version: O, platform: h[0] || "", versionMajor: de };
  }, g = navigator?.userAgent, f = M2(g), B = s(g), a = {};
  if (B.fnAppVersion ? (a.isFnApp = true, a.fnAppVersion = B.fnAppVersion, a.fnOSVersion = B.fnOSVersion, a.fnAppType = B.fnAppType) : a.isFnApp = false, f.browser && (a[f.browser] = true, a.version = f.version, a.versionMajor = f.versionMajor), f.platform && (a[f.platform] = true), a.edgeChromium = a.edg || a.edga || a.edgios, !a.chrome && !a.edgeChromium && !a.edge && !a.opera && g.toLowerCase().indexOf("webkit") !== -1 && (a.safari = true), a.osx = g.toLowerCase().indexOf("mac os x") !== -1, a.osx && !a.iphone && !a.ipod && !a.ipad && navigator?.maxTouchPoints > 1 && (a.ipad = true), g.toLowerCase().indexOf("playstation 4") !== -1 && (a.ps4 = true, a.tv = true), t(g) && (a.mobile = true), g.toLowerCase().indexOf("xbox") !== -1 && (a.xboxOne = true, a.tv = true), a.animate = typeof document < "u" && document.documentElement.animate != null, a.hisense = g.toLowerCase().includes("hisense"), a.tizen = g.toLowerCase().indexOf("tizen") !== -1 || window.tizen != null, a.vidaa = g.toLowerCase().includes("vidaa"), a.web0s = r(), a.edgeUwp = a.edge && (g.toLowerCase().indexOf("msapphost") !== -1 || g.toLowerCase().indexOf("webview") !== -1), a.web0s)
    a.web0sVersion = i(a);
  else if (a.tizen) {
    delete a.safari;
    let u = navigator?.appVersion.match(/Tizen (\d+).(\d+)/);
    a.tizenVersion = parseInt(u?.[1] ?? "", 10);
  } else
    a.orsay = g.toLowerCase().indexOf("smarthub") !== -1;
  return a.edgeUwp && (a.edge = true), a.tv = e(), a.operaTv = a.tv && g.toLowerCase().indexOf("opr/") !== -1, (a.mobile || a.tv) && (a.slow = true), (typeof document < "u" && ("ontouchstart" in window) || navigator?.maxTouchPoints > 0) && (a.touch = true), a.keyboard = n(a), a.supportsCssAnimation = p, a.iOS = a.ipad || a.iphone || a.ipod, a.iOS && (a.iOSVersion = o(), a.iOSVersion && a.iOSVersion.length >= 2 && (a.iOSVersion = a.iOSVersion[0] + a.iOSVersion[1] / 10)), a;
})();
var dr = { isSupported: typeof navigator > "u" ? false : !!navigator.clipboard, async copy(e) {
  if (!this.isSupported)
    return false;
  let r = e.innerText || e.value;
  return await this.write(r);
}, async cut(e) {
  return !this.isSupported || !await this.copy(e) ? false : (e.value = "", true);
}, async read() {
  return this.isSupported ? await navigator.clipboard.readText() : "";
}, async write(e) {
  return this.isSupported ? (await navigator.clipboard.writeText(e), true) : false;
} };
import_dayjs.default.locale("zh-cn");
import_dayjs.default.extend(import_relativeTime.default);
import_dayjs.default.extend(import_calendar.default);
import_dayjs.default.extend(import_updateLocale.default);
var ft = ((s) => (s.B = "B", s.KB = "KB", s.MB = "MB", s.GB = "GB", s.TB = "TB", s.PB = "PB", s))(ft || {});
var S = (e = "", r = "/") => {
  if (!e)
    return e ?? "";
  for (;e.startsWith(r); )
    e = e.slice(1);
  return e.endsWith(r) && (e = e.slice(0, e.length - 1)), e;
};
var H2 = ((i) => (i.Storage = "vol", i.External = "vol00", i.OtherShare = "vol01", i.Remote = "vol02", i.ShareLink = "vol-1", i))(H2 || {});
var z2 = ((o) => (o.Bin = ".@#local/trash", o.AppShareFiles = "@appshare", o.TimeMachine = "@timemachine", o.Team = "@team", o))(z2 || {});
var k = ((f) => (f.Storage = "\u5B58\u50A8\u7A7A\u95F4", f.External = "\u5916\u63A5\u5B58\u50A8", f.OtherShare = "\u4ED6\u4EBA\u5171\u4EAB", f.Favorites = "\u6211\u7684\u6536\u85CF", f.Remote = "\u8FDC\u7A0B\u6302\u8F7D", f.Torrent = "\u6211\u7684\u79CD\u5B50", f.Bin = "\u56DE\u6536\u7AD9", f.MyFiles = "\u6211\u7684\u6587\u4EF6", f.BaiduPan = "\u767E\u5EA6\u7F51\u76D8", f.AliPan = "\u963F\u91CC\u4E91\u76D8", f.AppShare = "\u5E94\u7528\u6587\u4EF6", f.Team = "\u56E2\u961F\u6587\u4EF6", f))(k || {});
var Re = ((s) => (s[s.External = 0] = "External", s[s.Share = 1] = "Share", s[s.Mount = 2] = "Mount", s[s.Storage = 3] = "Storage", s[s.AppShare = 4] = "AppShare", s[s.Other = 5] = "Other", s))(Re || {});
var De = ((c3) => (c3.Other = "Other", c3.External = "External", c3.Share = "Share", c3.Mount = "Mount", c3.Storage = "Storage", c3.AppShare = "AppShare", c3.Bin = "Bin", c3.Team = "Team", c3))(De || {});
var J = ((p) => (p[p.BaiduPan = 1] = "BaiduPan", p[p.AliPan = 2] = "AliPan", p[p.OneOneFivePan = 3] = "OneOneFivePan", p[p.QuarkPan = 4] = "QuarkPan", p[p.OneTwoThreePan = 5] = "OneTwoThreePan", p[p.OneDrivePan = 6] = "OneDrivePan", p[p.GoogleDrivePan = 7] = "GoogleDrivePan", p[p.DropboxPan = 8] = "DropboxPan", p[p.OneDriveBusiness = 9] = "OneDriveBusiness", p))(J || {});
var Ne = ((i) => (i[i.Smb = 0] = "Smb", i[i.Webdav = 1] = "Webdav", i[i.Ftp = 2] = "Ftp", i[i.Sftp = 3] = "Sftp", i[i.Nfs = 4] = "Nfs", i))(Ne || {});
var Ue = {};
Ke(Ue, { findDirItem: () => xt, getStorIdByPathFragments: () => C2, getUserIdByPathFragments: () => L2, isAppSharePath: () => Ae, isExternalPath: () => Q, isOtherSharePath: () => te, isRemotePath: () => ee, isStoragePath: () => re, isValidCloudStorageType: () => Z, join: () => m, separator: () => N, split: () => V });
var N = "/";
var V = (e) => e.split(N);
var m = (e) => e.join(N);
var L2 = (e) => {
  let [, r] = e, t = +r;
  return F(t) && t > 0 ? t : r;
};
var C2 = (e) => {
  let [r] = e;
  return +r.replace("vol", "") || 0;
};
var Q = (e) => e?.startsWith("vol00");
var ee = (e) => e?.startsWith("vol02");
var te = (e) => e?.startsWith("vol01");
var re = (e) => Q(e) || ee(e) || te(e) ? false : e?.startsWith("vol");
var Ae = (e) => re(e) ? e?.includes("@appshare") : false;
var Z = (e) => T(e) ? false : Object.values(J).filter((r) => F(r) && r > 0).includes(e);
var xt = (e, r) => {
  let t = S(e);
  return r?.find((n) => {
    let o = S(n.path);
    return t.startsWith(o);
  });
};
var I2 = v ? document.documentElement : undefined;
var _ = v && I2 ? I2.querySelector("head") : undefined;
var $ = v ? document.createElement("style") : undefined;
var pe = "requestFullscreen";
var fe = "exitFullscreen";
var me = "fullscreenElement";
var le = "onfullscreenchange";
v && I2 && ("webkitRequestFullScreen" in I2 ? (pe = "webkitRequestFullScreen", fe = "webkitExitFullscreen", me = "webkitFullscreenElement", le = "onwebkitfullscreenchange") : ("msRequestFullscreen" in I2) ? (pe = "msRequestFullscreen", fe = "msExitFullscreen", me = "msFullscreenElement", le = "MSFullscreenChange") : ("mozRequestFullScreen" in I2) ? (pe = "mozRequestFullScreen", fe = "mozCancelFullScreen", me = "mozFullScreenElement", le = "onmozfullscreenchange") : ("requestFullscreen" in I2) || console.log("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Fullscreen API !", le));
var Tt = ((t) => (t.Classic = "classic", t.Zfs = "zfs", t))(Tt || {});
var Te = ((c3) => (c3.Basic = "basic", c3.JBOD = "jbod", c3.Linear = "linear", c3.RAID0 = "raid0", c3.RAID1 = "raid1", c3.RAID5 = "raid5", c3.RAID6 = "raid6", c3.RAID10 = "raid10", c3))(Te || {});
var we = ((c3) => (c3.Stripe = "stripe", c3.Mirror = "mirror", c3.RAIDZ1 = "raidz1", c3.RAIDZ2 = "raidz2", c3.RAIDZ3 = "raidz3", c3.DRAID1 = "draid1", c3.DRAID2 = "draid2", c3.DRAID3 = "draid3", c3))(we || {});
var Go = { ...Te, ...we };
var wt = { classic: { basic: { level: 1, mode: "Basic" }, jbod: { level: -1, mode: "JBOD" }, linear: { level: -1, mode: "Linear" }, raid0: { level: 0, mode: "RAID 0" }, raid1: { level: 1, mode: "RAID 1" }, raid5: { level: 5, mode: "RAID 5" }, raid6: { level: 6, mode: "RAID 6" }, raid10: { level: 10, mode: "RAID 10" } }, zfs: { stripe: { level: 100, mode: "Stripe" }, mirror: { level: 101, mode: "Mirror" }, raidz1: { level: 105, mode: "RAIDZ1" }, raidz2: { level: 106, mode: "RAIDZ2" }, raidz3: { level: 107, mode: "RAIDZ3" }, draid1: { level: 115, mode: "dRAID1" }, draid2: { level: 116, mode: "dRAID2" }, draid3: { level: 117, mode: "dRAID3" } } };
var qo = Object.entries(wt).reduce((e, [, r]) => (Object.entries(r).forEach(([t, n]) => {
  e[t] = n;
}), e), {});
var di = (() => {
  let e = 2000;
  return { getNextZIndex: () => e++, resetZIndex: () => {
    e = 1000;
  } };
})();

// src/lib/cloud-config.ts
var CONFIG_SERVICE_BASE_URL = "https://cnf.fnnas.com";
var CONFIG_SERVICE_API_KEY = "E4520ECB-B3EF-44BE-82FC-86BA55141642";
var BAILIAN_BANNER_MODULE_ID = "9d919fc5-ef19-4a2f-abb6-949da3f2f425";
var BAILIAN_BANNER_LINK_KEY = "bailianBannerLink";
var CONFIG_REQUEST_TIMEOUT_MS = 5000;
var DEFAULT_BAILIAN_BANNER_LINK = "https://www.aliyun.com/benefit?userCode=pecql3mz&tid=AI";
function buildConfigPath(moduleId, key) {
  return `/api/v1/vals?mod=${encodeURIComponent(moduleId)}&keys=${encodeURIComponent(key)}`;
}
async function fetchConfigValue(moduleId, key) {
  const path = buildConfigPath(moduleId, key);
  const authx = nt({
    method: "get",
    url: path
  }, CONFIG_SERVICE_API_KEY);
  const controller = new AbortController;
  const timeout = setTimeout(() => controller.abort(), CONFIG_REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${CONFIG_SERVICE_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authx: authx
      },
      signal: controller.signal
    });
    if (!res.ok) {
      throw new Error(`config service returned HTTP ${res.status}`);
    }
    const json = await res.json();
    if (json.code !== 0) {
      throw new Error(json.msg || `config service returned code ${json.code ?? "unknown"}`);
    }
    const value = json.data?.[key];
    if (typeof value !== "string") {
      return null;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  } finally {
    clearTimeout(timeout);
  }
}
async function getBailianBannerLink() {
  try {
    const link = await fetchConfigValue(BAILIAN_BANNER_MODULE_ID, BAILIAN_BANNER_LINK_KEY);
    if (link) {
      return {
        link,
        source: "cloud"
      };
    }
  } catch (error) {
    console.warn("[cloud-config] failed to load bailianBannerLink", error);
  }
  return {
    link: DEFAULT_BAILIAN_BANNER_LINK,
    source: "fallback"
  };
}

// src/routes/cloud-config.ts
var app5 = new Hono2;
app5.get("/bailian-banner", async (c3) => {
  try {
    console.log("[cloud-config] reading bailian banner link");
    c3.header("Cache-Control", "no-store");
    return c3.json(await getBailianBannerLink());
  } catch (error) {
    console.error("[cloud-config:error] failed to read bailian banner link");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
var cloud_config_default = app5;

// src/routes/models.ts
var app6 = new Hono2;
app6.get("/config", async (c3) => {
  try {
    console.log("[models] reading config snapshot");
    return c3.json(await getModelsConfig(ensureDefaultInstance()));
  } catch (error) {
    console.error("[models:error] failed to read config snapshot");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app6.get("/catalog", async (c3) => {
  try {
    const payload = await getModelsCatalog(ensureDefaultInstance());
    console.log(`[models] returning catalog source=${payload.source} stale=${payload.stale} refreshing=${payload.refreshing}`);
    return c3.json(payload);
  } catch (error) {
    console.error("[models:error] failed to read models catalog");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app6.post("/catalog/refresh", async (c3) => {
  try {
    const payload = refreshModelsCatalogSnapshot(ensureDefaultInstance(), {
      force: true,
      reason: "api_post_refresh",
      cooldownMs: 0
    });
    console.log(`[models] refresh accepted taskKey=${payload.taskKey} deduplicated=${payload.deduplicated}`);
    return c3.json(payload);
  } catch (error) {
    console.error("[models:error] failed to refresh models catalog");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
  }
});
app6.post("/providers/ollama/discover", async (c3) => {
  try {
    const body = await c3.req.json().catch(() => ({}));
    const baseUrl = typeof body.baseUrl === "string" ? body.baseUrl : "";
    console.log(`[models] discovering ollama models for baseUrl=${baseUrl || "<empty>"}`);
    const payload = await discoverOllamaModels(baseUrl);
    console.log(`[models] discovered ${payload.count} ollama models from ${payload.resolvedApiBaseUrl}`);
    return c3.json(payload);
  } catch (error) {
    console.error("[models:error] failed to discover ollama models");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 502);
  }
});
app6.post("/config", async (c3) => {
  try {
    const body = await c3.req.json().catch(() => ({ providers: [] }));
    console.log(`[models] saving config with ${body.providers.length} providers`);
    return c3.json(await saveModelsConfig(ensureDefaultInstance(), body));
  } catch (error) {
    console.error("[models:error] failed to save models config");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
app6.post("/config/fast", async (c3) => {
  try {
    const body = await c3.req.json().catch(() => ({ providers: [] }));
    console.log(`[models] fast saving config with ${body.providers.length} providers`);
    return c3.json(await saveModelsConfigFast(ensureDefaultInstance(), body));
  } catch (error) {
    console.error("[models:error] failed to fast save models config");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    return c3.json({ message: error instanceof Error ? error.message : String(error) }, 400);
  }
});
var models_default = app6;

// src/routes/process-governor.ts
var app7 = new Hono2;
app7.get("/", (c3) => {
  return c3.json({
    governors: [
      {
        id: OPENCLAW_CLI_GOVERNOR_ID,
        label: OPENCLAW_CLI_GOVERNOR_LABEL,
        snapshot: getOpenclawCliGovernorSnapshot()
      },
      {
        id: REFRESH_GOVERNOR_ID,
        label: REFRESH_GOVERNOR_LABEL,
        snapshot: getRefreshGovernorSnapshot()
      }
    ]
  });
});
var process_governor_default = app7;

// src/routes/status.ts
var app8 = new Hono2;
app8.get("/", async (c3) => {
  return c3.json(await getInstanceStatus(ensureDefaultInstance(), c3));
});
var status_default = app8;

// src/lib/telemetry.ts
var TELEMETRY_ENDPOINT = "https://event.fnnas.com/api/v1/fe";
var TELEMETRY_SALT = "NDzZTVxnRKP8Z0jXg1VAMonaG8akvh";
var TELEMETRY_API_KEY = "51448B5E-13D2-4A91-9AC9-72C6CC22062F";
function md5(input) {
  const hasher = new Bun.CryptoHasher("md5");
  hasher.update(input);
  return hasher.digest("hex");
}
function generateNonce() {
  return Math.round(Math.random() * (1e6 - 1e5) + 1e5).toString().padStart(6, "0");
}
function generateSignature(path, body) {
  const nonce = generateNonce();
  const timestamp = String(Date.now());
  const bodyHash = md5(body);
  const signStr = [TELEMETRY_SALT, path, nonce, timestamp, bodyHash, TELEMETRY_API_KEY].join("_");
  const sign = md5(signStr);
  return { nonce, timestamp, sign };
}
async function readNasId() {
  const idPath = FN_AUTH_DEVICE_ID_PATH || "/usr/trim/etc/machine_id";
  try {
    const file = Bun.file(idPath);
    const content = await file.text();
    return content.trim();
  } catch {
    return "";
  }
}
async function collectConfigSummary() {
  const instance = ensureDefaultInstance();
  const config = await readInstanceConfig(instance);
  const providers = [];
  const agentModels = [];
  const channels = [];
  const pluginNames = [];
  const modelsSection = config.models;
  if (modelsSection && typeof modelsSection === "object") {
    const providersMap = modelsSection.providers;
    if (providersMap && typeof providersMap === "object") {
      for (const [providerName, providerConfig] of Object.entries(providersMap)) {
        providers.push(providerName);
        const pConfig = providerConfig;
        if (Array.isArray(pConfig.models)) {
          for (const model of pConfig.models) {
            if (model && typeof model === "object" && model.id) {
              agentModels.push(model.id);
            }
          }
        }
      }
    }
  }
  const channelsSection = config.channels;
  if (channelsSection && typeof channelsSection === "object") {
    channels.push(...Object.keys(channelsSection));
  }
  const pluginsSection = config.plugins;
  if (pluginsSection && typeof pluginsSection === "object") {
    const installs = pluginsSection.installs;
    if (installs && typeof installs === "object") {
      pluginNames.push(...Object.keys(installs));
    }
  }
  return {
    provider: providers,
    agent_model: agentModels,
    channel: channels,
    plugin_name: pluginNames
  };
}
async function reportTelemetry(event = "app_open") {
  try {
    const [nasId, configSummary] = await Promise.all([readNasId(), collectConfigSummary()]);
    const payload = {
      plat: "server",
      biz: "openclaw.launcher",
      event,
      deviceId: "",
      nasId,
      ts: String(Math.floor(Date.now() / 1000)),
      mdu: "openclaw",
      page: event,
      body: JSON.stringify(configSummary)
    };
    const bodyStr = JSON.stringify(payload);
    const url = new URL(TELEMETRY_ENDPOINT);
    const { nonce, timestamp, sign } = generateSignature(url.pathname, bodyStr);
    const response = await fetch(TELEMETRY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authx: `nonce=${nonce}&timestamp=${timestamp}&sign=${sign}`
      },
      body: bodyStr
    });
    console.log(`[telemetry] reported ${event}, status=${response.status}`);
  } catch (err) {
    console.warn(`[telemetry] failed to report:`, err instanceof Error ? err.message : String(err));
  }
}

// src/routes/telemetry.ts
var app9 = new Hono2;
app9.post("/", async (c3) => {
  let event = "app_open";
  try {
    const body = await c3.req.json();
    if (body?.event && typeof body.event === "string") {
      event = body.event;
    }
  } catch {}
  reportTelemetry(event);
  return c3.body(null, 204);
});
var telemetry_default = app9;

// src/index.ts
var app10 = new Hono2;
var isDev = isLikelyDevEnvironment();
var useSystemOpenclaw = shouldUseSystemOpenclaw(DEFAULT_INSTANCE_ID);
console.log(`[monitor] Environment: ${isDev ? "development" : "production"}`);
console.log(`[monitor] OpenClaw mode: ${useSystemOpenclaw ? "system (global)" : "managed (isolated)"}`);
if (useSystemOpenclaw) {
  console.log(`[monitor] System OpenClaw config: ~/.openclaw/openclaw.json`);
  console.log(`[monitor] Note: Monitor will use your global OpenClaw installation`);
} else {
  console.log(`[monitor] Managed OpenClaw config: DATA_ROOT/home/.openclaw/openclaw.json`);
}
if (isDev && useSystemOpenclaw) {
  await ensureDevModeConfig();
}
startRuntimeReconciler();
registerBackgroundTaskSafetyHandlers();
var basePath = MONITOR_BASE_PATH;
var apiBase = `${basePath}/api`;
var assetsBase = `${basePath}/assets`;
var port = parseInt(process.env.PORT || "3000");
var socketPath = MONITOR_SOCKET_PATH;
app10.use(`${apiBase}/*`, cors());
app10.use(`${apiBase}/*`, async (c3, next) => {
  const startedAt = Date.now();
  console.log(`[api] -> ${c3.req.method} ${c3.req.path}`);
  await next();
  console.log(`[api] <- ${c3.req.method} ${c3.req.path} ${c3.res.status} ${Date.now() - startedAt}ms`);
});
app10.onError((error, c3) => {
  console.error(`[api:error] ${c3.req.method} ${c3.req.path}`);
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  return c3.json({ message: error instanceof Error ? error.message : String(error) }, 500);
});
app10.route(`${apiBase}/status`, status_default);
app10.route(`${apiBase}/install`, install_default);
app10.route(`${apiBase}/gateway`, gateway_default);
app10.route(`${apiBase}/instances`, instances_default);
app10.route(`${apiBase}/models`, models_default);
app10.route(`${apiBase}/channels`, channels_default);
app10.route(`${apiBase}/cloud-config`, cloud_config_default);
app10.route(`${apiBase}/process-governor`, process_governor_default);
app10.route(`${apiBase}/telemetry`, telemetry_default);
app10.get(`${apiBase}/health`, (c3) => {
  return c3.json({
    status: "ok",
    transport: socketPath ? "unix" : "tcp",
    port: socketPath ? null : port,
    socketPath
  });
});
app10.get(`${apiBase}/node-info`, async (c3) => {
  let nodeVersion = "unknown";
  let openclawVersion = OPENCLAW_VERSION;
  try {
    const version = await resolveSystemNodeVersion();
    if (version) nodeVersion = `v${version}`;
  } catch {}
  try {
    const instance = await resolveInstance(DEFAULT_INSTANCE_ID);
    if (instance) {
      const runtime = await probeInstanceRuntime(instance);
      if (runtime.installed) {
        const inst = listInstances().find((i) => i.id === instance.id);
        if (inst?.openclawVersion) openclawVersion = inst.openclawVersion;
      }
    }
  } catch {}
  return c3.json({ nodeVersion, openclawVersion });
});
var staticDir = process.env.STATIC_DIR || resolve2(import.meta.dir, "../../web/dist");
app10.get(`${assetsBase}/*`, async (c3) => {
  const requestPath = basePath !== "" && c3.req.path.startsWith(basePath) ? c3.req.path.slice(basePath.length) : c3.req.path;
  const filePath = join9(staticDir, requestPath);
  const file = Bun.file(filePath);
  if (await file.exists()) {
    const headers = {};
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (["js","mjs","json","css","html","svg","txt","md","ts"].includes(ext)) {
      headers["Content-Type"] = ext === "html" ? "text/html; charset=utf-8"
        : ext === "json" ? "application/json; charset=utf-8"
        : ext === "svg" ? "image/svg+xml; charset=utf-8"
        : ext === "css" ? "text/css; charset=utf-8"
        : "text/javascript; charset=utf-8";
    }
    return new Response(file, headers);
  }
  return c3.notFound();
});
var indexHandler = async (c3) => {
  const indexPath = join9(staticDir, "index.html");
  const file = Bun.file(indexPath);
  if (await file.exists()) {
    return new Response(file, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
  return c3.text("index.html not found. Run 'pnpm build:web' first.", 404);
};
if (basePath === "") {
  app10.get("*", indexHandler);
} else {
  app10.get(basePath, indexHandler);
  app10.get(`${basePath}/`, indexHandler);
  app10.get(`${basePath}/*`, indexHandler);
}
function forwardedClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return;
  }
  const clientIp = forwardedFor.split(",").map((value) => value.trim()).find(Boolean);
  return clientIp || undefined;
}
function resolveClientIp(request, server) {
  return server.requestIP(request)?.address || forwardedClientIp(request) || (socketPath ? "127.0.0.1" : undefined);
}
if (socketPath) {
  console.log(`Server is running on unix socket ${socketPath}`);
} else {
  console.log(`Server is running on http://localhost:${port}`);
}
console.log(`Serving static files from: ${staticDir}`);
console.log(`Base path: ${basePath || "/"}`);
console.log(`fnOS auth enabled: ${FN_AUTH_ENABLED ? "yes" : "no"}`);
console.log(`auth cookie: ${FN_AUTH_COOKIE_NAME}`);
console.log(`fnOS same-origin guard: ${FN_AUTH_REQUIRE_SAME_ORIGIN ? "yes" : "no"}`);
var listenOptions = socketPath ? { unix: socketPath } : { port };
Bun.serve({
  ...listenOptions,
  idleTimeout: 30,
  websocket: proxyWebSocketHandlers,
  async fetch(request, server) {
    const clientIp = resolveClientIp(request, server);
    if (!shouldAllowClientIp(clientIp)) {
      return accessDeniedResponse(clientIp);
    }
    const authResult = await authenticateRequest(request);
    if (!authResult.ok) {
      return authResult.response;
    }
    const proxiedWebSocket = await maybeUpgradeProxyWebSocket(request, server, clientIp);
    if (proxiedWebSocket !== null) {
      return proxiedWebSocket;
    }
    const proxiedHttp = await maybeProxyHttpRequest(request, clientIp);
    if (proxiedHttp !== null) {
      return proxiedHttp;
    }
    return app10.fetch(request);
  }
});
if (socketPath) {
  chmodSync3(socketPath, 511);
  console.log(`Socket permissions set to 777: ${socketPath}`);
}

// 自动批准设备配对 (OpenClaw 2026.9.1: 每个新浏览器首次使用 Control UI 需主机一次性批准)。
// 方案: 用 devices list --json 获取最新 pending 请求 ID, 再 devices approve <id> 精确批准。
// 每 10s 执行, 无需用户手动在主机上操作。--latest 仅"显示"待批准项而非自动批准, 所以不能用它。
async function autoApproveGatewayDevices() {
  try {
    const instance = await resolveInstance(DEFAULT_INSTANCE_ID);
    if (!instance) return;
    let port = null;
    try { port = (await readInstancePort(instance)) ?? instance.gatewayPort ?? null; } catch {}
    if (!port) return;
    try {
      const pids = await findListeningPids(port);
      if (!pids || pids.size === 0) return; // 网关未监听, 跳过
    } catch { return; }
    let token = null;
    try {
      const cfg = await readInstanceConfig(instance);
      token = cfg?.gateway?.auth?.token ?? null;
    } catch {}
    if (!token) return;
    const binaryPath = await requireOpenclawBinary(instance);
    // 1) 列出待配对设备, 获取最新 request ID
    const listProc = Bun.spawn(
      [binaryPath, "devices", "list", "--json"],
      { cwd: openclawSpawnCwd(instance), env: { ...openclawEnv(instance), NODE_TLS_REJECT_UNAUTHORIZED: "0" }, stdout: "pipe", stderr: "pipe" }
    );
    const listOut = await new Response(listProc.stdout).text();
    await listProc.exited;
    let pendingId = null;
    try {
      const list = JSON.parse(listOut);
      const pending = list.pending || [];
      if (Array.isArray(pending) && pending.length > 0) {
        pendingId = pending[pending.length - 1].id || pending[pending.length - 1].requestId || null;
      }
    } catch {}
    if (!pendingId) return; // 无待批准项
    // 2) 精确批准该 request ID
    const approveProc = Bun.spawn(
      [binaryPath, "devices", "approve", pendingId],
      { cwd: openclawSpawnCwd(instance), env: { ...openclawEnv(instance), NODE_TLS_REJECT_UNAUTHORIZED: "0" }, stdout: "pipe", stderr: "pipe" }
    );
    const approveOut = await new Response(approveProc.stdout).text();
    const approveErr = await new Response(approveProc.stderr).text();
    const approveExit = await approveProc.exited;
    if (approveExit === 0) {
      console.log(`[auto-approve] device pairing approved: ${pendingId}`);
    } else {
      console.warn(`[auto-approve] failed to approve ${pendingId}: exit=${approveExit} ${approveOut || approveErr}`);
    }
  } catch (err) {
    console.warn(`[auto-approve] error:`, err instanceof Error ? err.message : String(err));
  }
}
setInterval(autoApproveGatewayDevices, 10000);
console.log("[auto-approve] gateway device-pairing auto-approve enabled (every 10s)");
