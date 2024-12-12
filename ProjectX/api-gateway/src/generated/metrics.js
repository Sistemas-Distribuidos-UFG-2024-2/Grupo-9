/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.metric = (function() {

    /**
     * Namespace metric.
     * @exports metric
     * @namespace
     */
    var metric = {};

    metric.MetricService = (function() {

        /**
         * Constructs a new MetricService service.
         * @memberof metric
         * @classdesc Represents a MetricService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function MetricService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (MetricService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MetricService;

        /**
         * Creates new MetricService service using the specified rpc implementation.
         * @function create
         * @memberof metric.MetricService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {MetricService} RPC service. Useful where requests and/or responses are streamed.
         */
        MetricService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link metric.MetricService#saveMetric}.
         * @memberof metric.MetricService
         * @typedef SaveMetricCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {metric.SaveMetricResponse} [response] SaveMetricResponse
         */

        /**
         * Calls SaveMetric.
         * @function saveMetric
         * @memberof metric.MetricService
         * @instance
         * @param {metric.ISaveMetricRequest} request SaveMetricRequest message or plain object
         * @param {metric.MetricService.SaveMetricCallback} callback Node-style callback called with the error, if any, and SaveMetricResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MetricService.prototype.saveMetric = function saveMetric(request, callback) {
            return this.rpcCall(saveMetric, $root.metric.SaveMetricRequest, $root.metric.SaveMetricResponse, request, callback);
        }, "name", { value: "SaveMetric" });

        /**
         * Calls SaveMetric.
         * @function saveMetric
         * @memberof metric.MetricService
         * @instance
         * @param {metric.ISaveMetricRequest} request SaveMetricRequest message or plain object
         * @returns {Promise<metric.SaveMetricResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link metric.MetricService#getMetrics}.
         * @memberof metric.MetricService
         * @typedef GetMetricsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {metric.GetMetricsResponse} [response] GetMetricsResponse
         */

        /**
         * Calls GetMetrics.
         * @function getMetrics
         * @memberof metric.MetricService
         * @instance
         * @param {metric.IGetMetricsRequest} request GetMetricsRequest message or plain object
         * @param {metric.MetricService.GetMetricsCallback} callback Node-style callback called with the error, if any, and GetMetricsResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MetricService.prototype.getMetrics = function getMetrics(request, callback) {
            return this.rpcCall(getMetrics, $root.metric.GetMetricsRequest, $root.metric.GetMetricsResponse, request, callback);
        }, "name", { value: "GetMetrics" });

        /**
         * Calls GetMetrics.
         * @function getMetrics
         * @memberof metric.MetricService
         * @instance
         * @param {metric.IGetMetricsRequest} request GetMetricsRequest message or plain object
         * @returns {Promise<metric.GetMetricsResponse>} Promise
         * @variation 2
         */

        return MetricService;
    })();

    metric.Metric = (function() {

        /**
         * Properties of a Metric.
         * @memberof metric
         * @interface IMetric
         * @property {string|null} [ip] Metric ip
         * @property {string|null} [timestamp] Metric timestamp
         * @property {number|null} [usoDeCpuPorcentagemCore0] Metric usoDeCpuPorcentagemCore0
         * @property {number|null} [usoDeCpuPorcentagemCore1] Metric usoDeCpuPorcentagemCore1
         * @property {number|null} [usoDeMemoriaPorcentagemTotal] Metric usoDeMemoriaPorcentagemTotal
         * @property {number|null} [usoDeMemoriaPorcentagemCache] Metric usoDeMemoriaPorcentagemCache
         * @property {number|null} [usoDeMemoriaBytesTotal] Metric usoDeMemoriaBytesTotal
         * @property {number|null} [usoDeArmazenamentoPorcentagemDiscoC] Metric usoDeArmazenamentoPorcentagemDiscoC
         * @property {number|null} [usoDeArmazenamentoPorcentagemDiscoD] Metric usoDeArmazenamentoPorcentagemDiscoD
         * @property {number|null} [usoDeArmazenamentoBytesDiscoC] Metric usoDeArmazenamentoBytesDiscoC
         */

        /**
         * Constructs a new Metric.
         * @memberof metric
         * @classdesc Represents a Metric.
         * @implements IMetric
         * @constructor
         * @param {metric.IMetric=} [properties] Properties to set
         */
        function Metric(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Metric ip.
         * @member {string} ip
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.ip = "";

        /**
         * Metric timestamp.
         * @member {string} timestamp
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.timestamp = "";

        /**
         * Metric usoDeCpuPorcentagemCore0.
         * @member {number} usoDeCpuPorcentagemCore0
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeCpuPorcentagemCore0 = 0;

        /**
         * Metric usoDeCpuPorcentagemCore1.
         * @member {number} usoDeCpuPorcentagemCore1
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeCpuPorcentagemCore1 = 0;

        /**
         * Metric usoDeMemoriaPorcentagemTotal.
         * @member {number} usoDeMemoriaPorcentagemTotal
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeMemoriaPorcentagemTotal = 0;

        /**
         * Metric usoDeMemoriaPorcentagemCache.
         * @member {number} usoDeMemoriaPorcentagemCache
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeMemoriaPorcentagemCache = 0;

        /**
         * Metric usoDeMemoriaBytesTotal.
         * @member {number} usoDeMemoriaBytesTotal
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeMemoriaBytesTotal = 0;

        /**
         * Metric usoDeArmazenamentoPorcentagemDiscoC.
         * @member {number} usoDeArmazenamentoPorcentagemDiscoC
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeArmazenamentoPorcentagemDiscoC = 0;

        /**
         * Metric usoDeArmazenamentoPorcentagemDiscoD.
         * @member {number} usoDeArmazenamentoPorcentagemDiscoD
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeArmazenamentoPorcentagemDiscoD = 0;

        /**
         * Metric usoDeArmazenamentoBytesDiscoC.
         * @member {number} usoDeArmazenamentoBytesDiscoC
         * @memberof metric.Metric
         * @instance
         */
        Metric.prototype.usoDeArmazenamentoBytesDiscoC = 0;

        /**
         * Creates a new Metric instance using the specified properties.
         * @function create
         * @memberof metric.Metric
         * @static
         * @param {metric.IMetric=} [properties] Properties to set
         * @returns {metric.Metric} Metric instance
         */
        Metric.create = function create(properties) {
            return new Metric(properties);
        };

        /**
         * Encodes the specified Metric message. Does not implicitly {@link metric.Metric.verify|verify} messages.
         * @function encode
         * @memberof metric.Metric
         * @static
         * @param {metric.IMetric} message Metric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Metric.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ip != null && Object.hasOwnProperty.call(message, "ip"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ip);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.timestamp);
            if (message.usoDeCpuPorcentagemCore0 != null && Object.hasOwnProperty.call(message, "usoDeCpuPorcentagemCore0"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.usoDeCpuPorcentagemCore0);
            if (message.usoDeCpuPorcentagemCore1 != null && Object.hasOwnProperty.call(message, "usoDeCpuPorcentagemCore1"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.usoDeCpuPorcentagemCore1);
            if (message.usoDeMemoriaPorcentagemTotal != null && Object.hasOwnProperty.call(message, "usoDeMemoriaPorcentagemTotal"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.usoDeMemoriaPorcentagemTotal);
            if (message.usoDeMemoriaPorcentagemCache != null && Object.hasOwnProperty.call(message, "usoDeMemoriaPorcentagemCache"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.usoDeMemoriaPorcentagemCache);
            if (message.usoDeMemoriaBytesTotal != null && Object.hasOwnProperty.call(message, "usoDeMemoriaBytesTotal"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.usoDeMemoriaBytesTotal);
            if (message.usoDeArmazenamentoPorcentagemDiscoC != null && Object.hasOwnProperty.call(message, "usoDeArmazenamentoPorcentagemDiscoC"))
                writer.uint32(/* id 8, wireType 1 =*/65).double(message.usoDeArmazenamentoPorcentagemDiscoC);
            if (message.usoDeArmazenamentoPorcentagemDiscoD != null && Object.hasOwnProperty.call(message, "usoDeArmazenamentoPorcentagemDiscoD"))
                writer.uint32(/* id 9, wireType 1 =*/73).double(message.usoDeArmazenamentoPorcentagemDiscoD);
            if (message.usoDeArmazenamentoBytesDiscoC != null && Object.hasOwnProperty.call(message, "usoDeArmazenamentoBytesDiscoC"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.usoDeArmazenamentoBytesDiscoC);
            return writer;
        };

        /**
         * Encodes the specified Metric message, length delimited. Does not implicitly {@link metric.Metric.verify|verify} messages.
         * @function encodeDelimited
         * @memberof metric.Metric
         * @static
         * @param {metric.IMetric} message Metric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Metric.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Metric message from the specified reader or buffer.
         * @function decode
         * @memberof metric.Metric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {metric.Metric} Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Metric.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.metric.Metric();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.ip = reader.string();
                        break;
                    }
                case 2: {
                        message.timestamp = reader.string();
                        break;
                    }
                case 3: {
                        message.usoDeCpuPorcentagemCore0 = reader.double();
                        break;
                    }
                case 4: {
                        message.usoDeCpuPorcentagemCore1 = reader.double();
                        break;
                    }
                case 5: {
                        message.usoDeMemoriaPorcentagemTotal = reader.double();
                        break;
                    }
                case 6: {
                        message.usoDeMemoriaPorcentagemCache = reader.double();
                        break;
                    }
                case 7: {
                        message.usoDeMemoriaBytesTotal = reader.double();
                        break;
                    }
                case 8: {
                        message.usoDeArmazenamentoPorcentagemDiscoC = reader.double();
                        break;
                    }
                case 9: {
                        message.usoDeArmazenamentoPorcentagemDiscoD = reader.double();
                        break;
                    }
                case 10: {
                        message.usoDeArmazenamentoBytesDiscoC = reader.double();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Metric message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof metric.Metric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {metric.Metric} Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Metric.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Metric message.
         * @function verify
         * @memberof metric.Metric
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Metric.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ip != null && message.hasOwnProperty("ip"))
                if (!$util.isString(message.ip))
                    return "ip: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isString(message.timestamp))
                    return "timestamp: string expected";
            if (message.usoDeCpuPorcentagemCore0 != null && message.hasOwnProperty("usoDeCpuPorcentagemCore0"))
                if (typeof message.usoDeCpuPorcentagemCore0 !== "number")
                    return "usoDeCpuPorcentagemCore0: number expected";
            if (message.usoDeCpuPorcentagemCore1 != null && message.hasOwnProperty("usoDeCpuPorcentagemCore1"))
                if (typeof message.usoDeCpuPorcentagemCore1 !== "number")
                    return "usoDeCpuPorcentagemCore1: number expected";
            if (message.usoDeMemoriaPorcentagemTotal != null && message.hasOwnProperty("usoDeMemoriaPorcentagemTotal"))
                if (typeof message.usoDeMemoriaPorcentagemTotal !== "number")
                    return "usoDeMemoriaPorcentagemTotal: number expected";
            if (message.usoDeMemoriaPorcentagemCache != null && message.hasOwnProperty("usoDeMemoriaPorcentagemCache"))
                if (typeof message.usoDeMemoriaPorcentagemCache !== "number")
                    return "usoDeMemoriaPorcentagemCache: number expected";
            if (message.usoDeMemoriaBytesTotal != null && message.hasOwnProperty("usoDeMemoriaBytesTotal"))
                if (typeof message.usoDeMemoriaBytesTotal !== "number")
                    return "usoDeMemoriaBytesTotal: number expected";
            if (message.usoDeArmazenamentoPorcentagemDiscoC != null && message.hasOwnProperty("usoDeArmazenamentoPorcentagemDiscoC"))
                if (typeof message.usoDeArmazenamentoPorcentagemDiscoC !== "number")
                    return "usoDeArmazenamentoPorcentagemDiscoC: number expected";
            if (message.usoDeArmazenamentoPorcentagemDiscoD != null && message.hasOwnProperty("usoDeArmazenamentoPorcentagemDiscoD"))
                if (typeof message.usoDeArmazenamentoPorcentagemDiscoD !== "number")
                    return "usoDeArmazenamentoPorcentagemDiscoD: number expected";
            if (message.usoDeArmazenamentoBytesDiscoC != null && message.hasOwnProperty("usoDeArmazenamentoBytesDiscoC"))
                if (typeof message.usoDeArmazenamentoBytesDiscoC !== "number")
                    return "usoDeArmazenamentoBytesDiscoC: number expected";
            return null;
        };

        /**
         * Creates a Metric message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof metric.Metric
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {metric.Metric} Metric
         */
        Metric.fromObject = function fromObject(object) {
            if (object instanceof $root.metric.Metric)
                return object;
            var message = new $root.metric.Metric();
            if (object.ip != null)
                message.ip = String(object.ip);
            if (object.timestamp != null)
                message.timestamp = String(object.timestamp);
            if (object.usoDeCpuPorcentagemCore0 != null)
                message.usoDeCpuPorcentagemCore0 = Number(object.usoDeCpuPorcentagemCore0);
            if (object.usoDeCpuPorcentagemCore1 != null)
                message.usoDeCpuPorcentagemCore1 = Number(object.usoDeCpuPorcentagemCore1);
            if (object.usoDeMemoriaPorcentagemTotal != null)
                message.usoDeMemoriaPorcentagemTotal = Number(object.usoDeMemoriaPorcentagemTotal);
            if (object.usoDeMemoriaPorcentagemCache != null)
                message.usoDeMemoriaPorcentagemCache = Number(object.usoDeMemoriaPorcentagemCache);
            if (object.usoDeMemoriaBytesTotal != null)
                message.usoDeMemoriaBytesTotal = Number(object.usoDeMemoriaBytesTotal);
            if (object.usoDeArmazenamentoPorcentagemDiscoC != null)
                message.usoDeArmazenamentoPorcentagemDiscoC = Number(object.usoDeArmazenamentoPorcentagemDiscoC);
            if (object.usoDeArmazenamentoPorcentagemDiscoD != null)
                message.usoDeArmazenamentoPorcentagemDiscoD = Number(object.usoDeArmazenamentoPorcentagemDiscoD);
            if (object.usoDeArmazenamentoBytesDiscoC != null)
                message.usoDeArmazenamentoBytesDiscoC = Number(object.usoDeArmazenamentoBytesDiscoC);
            return message;
        };

        /**
         * Creates a plain object from a Metric message. Also converts values to other types if specified.
         * @function toObject
         * @memberof metric.Metric
         * @static
         * @param {metric.Metric} message Metric
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Metric.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ip = "";
                object.timestamp = "";
                object.usoDeCpuPorcentagemCore0 = 0;
                object.usoDeCpuPorcentagemCore1 = 0;
                object.usoDeMemoriaPorcentagemTotal = 0;
                object.usoDeMemoriaPorcentagemCache = 0;
                object.usoDeMemoriaBytesTotal = 0;
                object.usoDeArmazenamentoPorcentagemDiscoC = 0;
                object.usoDeArmazenamentoPorcentagemDiscoD = 0;
                object.usoDeArmazenamentoBytesDiscoC = 0;
            }
            if (message.ip != null && message.hasOwnProperty("ip"))
                object.ip = message.ip;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = message.timestamp;
            if (message.usoDeCpuPorcentagemCore0 != null && message.hasOwnProperty("usoDeCpuPorcentagemCore0"))
                object.usoDeCpuPorcentagemCore0 = options.json && !isFinite(message.usoDeCpuPorcentagemCore0) ? String(message.usoDeCpuPorcentagemCore0) : message.usoDeCpuPorcentagemCore0;
            if (message.usoDeCpuPorcentagemCore1 != null && message.hasOwnProperty("usoDeCpuPorcentagemCore1"))
                object.usoDeCpuPorcentagemCore1 = options.json && !isFinite(message.usoDeCpuPorcentagemCore1) ? String(message.usoDeCpuPorcentagemCore1) : message.usoDeCpuPorcentagemCore1;
            if (message.usoDeMemoriaPorcentagemTotal != null && message.hasOwnProperty("usoDeMemoriaPorcentagemTotal"))
                object.usoDeMemoriaPorcentagemTotal = options.json && !isFinite(message.usoDeMemoriaPorcentagemTotal) ? String(message.usoDeMemoriaPorcentagemTotal) : message.usoDeMemoriaPorcentagemTotal;
            if (message.usoDeMemoriaPorcentagemCache != null && message.hasOwnProperty("usoDeMemoriaPorcentagemCache"))
                object.usoDeMemoriaPorcentagemCache = options.json && !isFinite(message.usoDeMemoriaPorcentagemCache) ? String(message.usoDeMemoriaPorcentagemCache) : message.usoDeMemoriaPorcentagemCache;
            if (message.usoDeMemoriaBytesTotal != null && message.hasOwnProperty("usoDeMemoriaBytesTotal"))
                object.usoDeMemoriaBytesTotal = options.json && !isFinite(message.usoDeMemoriaBytesTotal) ? String(message.usoDeMemoriaBytesTotal) : message.usoDeMemoriaBytesTotal;
            if (message.usoDeArmazenamentoPorcentagemDiscoC != null && message.hasOwnProperty("usoDeArmazenamentoPorcentagemDiscoC"))
                object.usoDeArmazenamentoPorcentagemDiscoC = options.json && !isFinite(message.usoDeArmazenamentoPorcentagemDiscoC) ? String(message.usoDeArmazenamentoPorcentagemDiscoC) : message.usoDeArmazenamentoPorcentagemDiscoC;
            if (message.usoDeArmazenamentoPorcentagemDiscoD != null && message.hasOwnProperty("usoDeArmazenamentoPorcentagemDiscoD"))
                object.usoDeArmazenamentoPorcentagemDiscoD = options.json && !isFinite(message.usoDeArmazenamentoPorcentagemDiscoD) ? String(message.usoDeArmazenamentoPorcentagemDiscoD) : message.usoDeArmazenamentoPorcentagemDiscoD;
            if (message.usoDeArmazenamentoBytesDiscoC != null && message.hasOwnProperty("usoDeArmazenamentoBytesDiscoC"))
                object.usoDeArmazenamentoBytesDiscoC = options.json && !isFinite(message.usoDeArmazenamentoBytesDiscoC) ? String(message.usoDeArmazenamentoBytesDiscoC) : message.usoDeArmazenamentoBytesDiscoC;
            return object;
        };

        /**
         * Converts this Metric to JSON.
         * @function toJSON
         * @memberof metric.Metric
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Metric.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Metric
         * @function getTypeUrl
         * @memberof metric.Metric
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Metric.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/metric.Metric";
        };

        return Metric;
    })();

    metric.SaveMetricRequest = (function() {

        /**
         * Properties of a SaveMetricRequest.
         * @memberof metric
         * @interface ISaveMetricRequest
         * @property {metric.IMetric|null} [metric] SaveMetricRequest metric
         */

        /**
         * Constructs a new SaveMetricRequest.
         * @memberof metric
         * @classdesc Represents a SaveMetricRequest.
         * @implements ISaveMetricRequest
         * @constructor
         * @param {metric.ISaveMetricRequest=} [properties] Properties to set
         */
        function SaveMetricRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SaveMetricRequest metric.
         * @member {metric.IMetric|null|undefined} metric
         * @memberof metric.SaveMetricRequest
         * @instance
         */
        SaveMetricRequest.prototype.metric = null;

        /**
         * Creates a new SaveMetricRequest instance using the specified properties.
         * @function create
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {metric.ISaveMetricRequest=} [properties] Properties to set
         * @returns {metric.SaveMetricRequest} SaveMetricRequest instance
         */
        SaveMetricRequest.create = function create(properties) {
            return new SaveMetricRequest(properties);
        };

        /**
         * Encodes the specified SaveMetricRequest message. Does not implicitly {@link metric.SaveMetricRequest.verify|verify} messages.
         * @function encode
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {metric.ISaveMetricRequest} message SaveMetricRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaveMetricRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.metric != null && Object.hasOwnProperty.call(message, "metric"))
                $root.metric.Metric.encode(message.metric, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SaveMetricRequest message, length delimited. Does not implicitly {@link metric.SaveMetricRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {metric.ISaveMetricRequest} message SaveMetricRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaveMetricRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SaveMetricRequest message from the specified reader or buffer.
         * @function decode
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {metric.SaveMetricRequest} SaveMetricRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaveMetricRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.metric.SaveMetricRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.metric = $root.metric.Metric.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SaveMetricRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {metric.SaveMetricRequest} SaveMetricRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaveMetricRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SaveMetricRequest message.
         * @function verify
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SaveMetricRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.metric != null && message.hasOwnProperty("metric")) {
                var error = $root.metric.Metric.verify(message.metric);
                if (error)
                    return "metric." + error;
            }
            return null;
        };

        /**
         * Creates a SaveMetricRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {metric.SaveMetricRequest} SaveMetricRequest
         */
        SaveMetricRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.metric.SaveMetricRequest)
                return object;
            var message = new $root.metric.SaveMetricRequest();
            if (object.metric != null) {
                if (typeof object.metric !== "object")
                    throw TypeError(".metric.SaveMetricRequest.metric: object expected");
                message.metric = $root.metric.Metric.fromObject(object.metric);
            }
            return message;
        };

        /**
         * Creates a plain object from a SaveMetricRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {metric.SaveMetricRequest} message SaveMetricRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SaveMetricRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.metric = null;
            if (message.metric != null && message.hasOwnProperty("metric"))
                object.metric = $root.metric.Metric.toObject(message.metric, options);
            return object;
        };

        /**
         * Converts this SaveMetricRequest to JSON.
         * @function toJSON
         * @memberof metric.SaveMetricRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SaveMetricRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SaveMetricRequest
         * @function getTypeUrl
         * @memberof metric.SaveMetricRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SaveMetricRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/metric.SaveMetricRequest";
        };

        return SaveMetricRequest;
    })();

    metric.SaveMetricResponse = (function() {

        /**
         * Properties of a SaveMetricResponse.
         * @memberof metric
         * @interface ISaveMetricResponse
         * @property {boolean|null} [success] SaveMetricResponse success
         * @property {string|null} [id] SaveMetricResponse id
         */

        /**
         * Constructs a new SaveMetricResponse.
         * @memberof metric
         * @classdesc Represents a SaveMetricResponse.
         * @implements ISaveMetricResponse
         * @constructor
         * @param {metric.ISaveMetricResponse=} [properties] Properties to set
         */
        function SaveMetricResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SaveMetricResponse success.
         * @member {boolean} success
         * @memberof metric.SaveMetricResponse
         * @instance
         */
        SaveMetricResponse.prototype.success = false;

        /**
         * SaveMetricResponse id.
         * @member {string} id
         * @memberof metric.SaveMetricResponse
         * @instance
         */
        SaveMetricResponse.prototype.id = "";

        /**
         * Creates a new SaveMetricResponse instance using the specified properties.
         * @function create
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {metric.ISaveMetricResponse=} [properties] Properties to set
         * @returns {metric.SaveMetricResponse} SaveMetricResponse instance
         */
        SaveMetricResponse.create = function create(properties) {
            return new SaveMetricResponse(properties);
        };

        /**
         * Encodes the specified SaveMetricResponse message. Does not implicitly {@link metric.SaveMetricResponse.verify|verify} messages.
         * @function encode
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {metric.ISaveMetricResponse} message SaveMetricResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaveMetricResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified SaveMetricResponse message, length delimited. Does not implicitly {@link metric.SaveMetricResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {metric.ISaveMetricResponse} message SaveMetricResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaveMetricResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SaveMetricResponse message from the specified reader or buffer.
         * @function decode
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {metric.SaveMetricResponse} SaveMetricResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaveMetricResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.metric.SaveMetricResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                case 2: {
                        message.id = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SaveMetricResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {metric.SaveMetricResponse} SaveMetricResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaveMetricResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SaveMetricResponse message.
         * @function verify
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SaveMetricResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.success != null && message.hasOwnProperty("success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a SaveMetricResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {metric.SaveMetricResponse} SaveMetricResponse
         */
        SaveMetricResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.metric.SaveMetricResponse)
                return object;
            var message = new $root.metric.SaveMetricResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a SaveMetricResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {metric.SaveMetricResponse} message SaveMetricResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SaveMetricResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.success = false;
                object.id = "";
            }
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = message.success;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this SaveMetricResponse to JSON.
         * @function toJSON
         * @memberof metric.SaveMetricResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SaveMetricResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SaveMetricResponse
         * @function getTypeUrl
         * @memberof metric.SaveMetricResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SaveMetricResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/metric.SaveMetricResponse";
        };

        return SaveMetricResponse;
    })();

    metric.GetMetricsRequest = (function() {

        /**
         * Properties of a GetMetricsRequest.
         * @memberof metric
         * @interface IGetMetricsRequest
         */

        /**
         * Constructs a new GetMetricsRequest.
         * @memberof metric
         * @classdesc Represents a GetMetricsRequest.
         * @implements IGetMetricsRequest
         * @constructor
         * @param {metric.IGetMetricsRequest=} [properties] Properties to set
         */
        function GetMetricsRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GetMetricsRequest instance using the specified properties.
         * @function create
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {metric.IGetMetricsRequest=} [properties] Properties to set
         * @returns {metric.GetMetricsRequest} GetMetricsRequest instance
         */
        GetMetricsRequest.create = function create(properties) {
            return new GetMetricsRequest(properties);
        };

        /**
         * Encodes the specified GetMetricsRequest message. Does not implicitly {@link metric.GetMetricsRequest.verify|verify} messages.
         * @function encode
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {metric.IGetMetricsRequest} message GetMetricsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMetricsRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GetMetricsRequest message, length delimited. Does not implicitly {@link metric.GetMetricsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {metric.IGetMetricsRequest} message GetMetricsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMetricsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetMetricsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {metric.GetMetricsRequest} GetMetricsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMetricsRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.metric.GetMetricsRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetMetricsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {metric.GetMetricsRequest} GetMetricsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMetricsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetMetricsRequest message.
         * @function verify
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetMetricsRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GetMetricsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {metric.GetMetricsRequest} GetMetricsRequest
         */
        GetMetricsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.metric.GetMetricsRequest)
                return object;
            return new $root.metric.GetMetricsRequest();
        };

        /**
         * Creates a plain object from a GetMetricsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {metric.GetMetricsRequest} message GetMetricsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetMetricsRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetMetricsRequest to JSON.
         * @function toJSON
         * @memberof metric.GetMetricsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetMetricsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetMetricsRequest
         * @function getTypeUrl
         * @memberof metric.GetMetricsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetMetricsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/metric.GetMetricsRequest";
        };

        return GetMetricsRequest;
    })();

    metric.GetMetricsResponse = (function() {

        /**
         * Properties of a GetMetricsResponse.
         * @memberof metric
         * @interface IGetMetricsResponse
         * @property {Array.<metric.IMetric>|null} [metrics] GetMetricsResponse metrics
         */

        /**
         * Constructs a new GetMetricsResponse.
         * @memberof metric
         * @classdesc Represents a GetMetricsResponse.
         * @implements IGetMetricsResponse
         * @constructor
         * @param {metric.IGetMetricsResponse=} [properties] Properties to set
         */
        function GetMetricsResponse(properties) {
            this.metrics = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetMetricsResponse metrics.
         * @member {Array.<metric.IMetric>} metrics
         * @memberof metric.GetMetricsResponse
         * @instance
         */
        GetMetricsResponse.prototype.metrics = $util.emptyArray;

        /**
         * Creates a new GetMetricsResponse instance using the specified properties.
         * @function create
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {metric.IGetMetricsResponse=} [properties] Properties to set
         * @returns {metric.GetMetricsResponse} GetMetricsResponse instance
         */
        GetMetricsResponse.create = function create(properties) {
            return new GetMetricsResponse(properties);
        };

        /**
         * Encodes the specified GetMetricsResponse message. Does not implicitly {@link metric.GetMetricsResponse.verify|verify} messages.
         * @function encode
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {metric.IGetMetricsResponse} message GetMetricsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMetricsResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.metrics != null && message.metrics.length)
                for (var i = 0; i < message.metrics.length; ++i)
                    $root.metric.Metric.encode(message.metrics[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetMetricsResponse message, length delimited. Does not implicitly {@link metric.GetMetricsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {metric.IGetMetricsResponse} message GetMetricsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetMetricsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetMetricsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {metric.GetMetricsResponse} GetMetricsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMetricsResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.metric.GetMetricsResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.metrics && message.metrics.length))
                            message.metrics = [];
                        message.metrics.push($root.metric.Metric.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetMetricsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {metric.GetMetricsResponse} GetMetricsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetMetricsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetMetricsResponse message.
         * @function verify
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetMetricsResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.metrics != null && message.hasOwnProperty("metrics")) {
                if (!Array.isArray(message.metrics))
                    return "metrics: array expected";
                for (var i = 0; i < message.metrics.length; ++i) {
                    var error = $root.metric.Metric.verify(message.metrics[i]);
                    if (error)
                        return "metrics." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetMetricsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {metric.GetMetricsResponse} GetMetricsResponse
         */
        GetMetricsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.metric.GetMetricsResponse)
                return object;
            var message = new $root.metric.GetMetricsResponse();
            if (object.metrics) {
                if (!Array.isArray(object.metrics))
                    throw TypeError(".metric.GetMetricsResponse.metrics: array expected");
                message.metrics = [];
                for (var i = 0; i < object.metrics.length; ++i) {
                    if (typeof object.metrics[i] !== "object")
                        throw TypeError(".metric.GetMetricsResponse.metrics: object expected");
                    message.metrics[i] = $root.metric.Metric.fromObject(object.metrics[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetMetricsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {metric.GetMetricsResponse} message GetMetricsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetMetricsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.metrics = [];
            if (message.metrics && message.metrics.length) {
                object.metrics = [];
                for (var j = 0; j < message.metrics.length; ++j)
                    object.metrics[j] = $root.metric.Metric.toObject(message.metrics[j], options);
            }
            return object;
        };

        /**
         * Converts this GetMetricsResponse to JSON.
         * @function toJSON
         * @memberof metric.GetMetricsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetMetricsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetMetricsResponse
         * @function getTypeUrl
         * @memberof metric.GetMetricsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetMetricsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/metric.GetMetricsResponse";
        };

        return GetMetricsResponse;
    })();

    return metric;
})();

module.exports = $root;
