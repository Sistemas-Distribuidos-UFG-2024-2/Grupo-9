import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace metric. */
export namespace metric {

    /** Represents a MetricService */
    class MetricService extends $protobuf.rpc.Service {

        /**
         * Constructs a new MetricService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new MetricService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MetricService;

        /**
         * Calls SaveMetric.
         * @param request SaveMetricRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and SaveMetricResponse
         */
        public saveMetric(request: metric.ISaveMetricRequest, callback: metric.MetricService.SaveMetricCallback): void;

        /**
         * Calls SaveMetric.
         * @param request SaveMetricRequest message or plain object
         * @returns Promise
         */
        public saveMetric(request: metric.ISaveMetricRequest): Promise<metric.SaveMetricResponse>;

        /**
         * Calls GetMetrics.
         * @param request GetMetricsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetMetricsResponse
         */
        public getMetrics(request: metric.IGetMetricsRequest, callback: metric.MetricService.GetMetricsCallback): void;

        /**
         * Calls GetMetrics.
         * @param request GetMetricsRequest message or plain object
         * @returns Promise
         */
        public getMetrics(request: metric.IGetMetricsRequest): Promise<metric.GetMetricsResponse>;
    }

    namespace MetricService {

        /**
         * Callback as used by {@link metric.MetricService#saveMetric}.
         * @param error Error, if any
         * @param [response] SaveMetricResponse
         */
        type SaveMetricCallback = (error: (Error|null), response?: metric.SaveMetricResponse) => void;

        /**
         * Callback as used by {@link metric.MetricService#getMetrics}.
         * @param error Error, if any
         * @param [response] GetMetricsResponse
         */
        type GetMetricsCallback = (error: (Error|null), response?: metric.GetMetricsResponse) => void;
    }

    /** Properties of a Metric. */
    interface IMetric {

        /** Metric ip */
        ip?: (string|null);

        /** Metric timestamp */
        timestamp?: (string|null);

        /** Metric usoDeCpuPorcentagemCore0 */
        usoDeCpuPorcentagemCore0?: (number|null);

        /** Metric usoDeCpuPorcentagemCore1 */
        usoDeCpuPorcentagemCore1?: (number|null);

        /** Metric usoDeMemoriaPorcentagemTotal */
        usoDeMemoriaPorcentagemTotal?: (number|null);

        /** Metric usoDeMemoriaPorcentagemCache */
        usoDeMemoriaPorcentagemCache?: (number|null);

        /** Metric usoDeMemoriaBytesTotal */
        usoDeMemoriaBytesTotal?: (number|null);

        /** Metric usoDeArmazenamentoPorcentagemDiscoC */
        usoDeArmazenamentoPorcentagemDiscoC?: (number|null);

        /** Metric usoDeArmazenamentoPorcentagemDiscoD */
        usoDeArmazenamentoPorcentagemDiscoD?: (number|null);

        /** Metric usoDeArmazenamentoBytesDiscoC */
        usoDeArmazenamentoBytesDiscoC?: (number|null);
    }

    /** Represents a Metric. */
    class Metric implements IMetric {

        /**
         * Constructs a new Metric.
         * @param [properties] Properties to set
         */
        constructor(properties?: metric.IMetric);

        /** Metric ip. */
        public ip: string;

        /** Metric timestamp. */
        public timestamp: string;

        /** Metric usoDeCpuPorcentagemCore0. */
        public usoDeCpuPorcentagemCore0: number;

        /** Metric usoDeCpuPorcentagemCore1. */
        public usoDeCpuPorcentagemCore1: number;

        /** Metric usoDeMemoriaPorcentagemTotal. */
        public usoDeMemoriaPorcentagemTotal: number;

        /** Metric usoDeMemoriaPorcentagemCache. */
        public usoDeMemoriaPorcentagemCache: number;

        /** Metric usoDeMemoriaBytesTotal. */
        public usoDeMemoriaBytesTotal: number;

        /** Metric usoDeArmazenamentoPorcentagemDiscoC. */
        public usoDeArmazenamentoPorcentagemDiscoC: number;

        /** Metric usoDeArmazenamentoPorcentagemDiscoD. */
        public usoDeArmazenamentoPorcentagemDiscoD: number;

        /** Metric usoDeArmazenamentoBytesDiscoC. */
        public usoDeArmazenamentoBytesDiscoC: number;

        /**
         * Creates a new Metric instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Metric instance
         */
        public static create(properties?: metric.IMetric): metric.Metric;

        /**
         * Encodes the specified Metric message. Does not implicitly {@link metric.Metric.verify|verify} messages.
         * @param message Metric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: metric.IMetric, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Metric message, length delimited. Does not implicitly {@link metric.Metric.verify|verify} messages.
         * @param message Metric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: metric.IMetric, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Metric message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): metric.Metric;

        /**
         * Decodes a Metric message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): metric.Metric;

        /**
         * Verifies a Metric message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Metric message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Metric
         */
        public static fromObject(object: { [k: string]: any }): metric.Metric;

        /**
         * Creates a plain object from a Metric message. Also converts values to other types if specified.
         * @param message Metric
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: metric.Metric, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Metric to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Metric
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SaveMetricRequest. */
    interface ISaveMetricRequest {

        /** SaveMetricRequest metric */
        metric?: (metric.IMetric|null);
    }

    /** Represents a SaveMetricRequest. */
    class SaveMetricRequest implements ISaveMetricRequest {

        /**
         * Constructs a new SaveMetricRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: metric.ISaveMetricRequest);

        /** SaveMetricRequest metric. */
        public metric?: (metric.IMetric|null);

        /**
         * Creates a new SaveMetricRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SaveMetricRequest instance
         */
        public static create(properties?: metric.ISaveMetricRequest): metric.SaveMetricRequest;

        /**
         * Encodes the specified SaveMetricRequest message. Does not implicitly {@link metric.SaveMetricRequest.verify|verify} messages.
         * @param message SaveMetricRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: metric.ISaveMetricRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SaveMetricRequest message, length delimited. Does not implicitly {@link metric.SaveMetricRequest.verify|verify} messages.
         * @param message SaveMetricRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: metric.ISaveMetricRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SaveMetricRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SaveMetricRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): metric.SaveMetricRequest;

        /**
         * Decodes a SaveMetricRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SaveMetricRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): metric.SaveMetricRequest;

        /**
         * Verifies a SaveMetricRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SaveMetricRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SaveMetricRequest
         */
        public static fromObject(object: { [k: string]: any }): metric.SaveMetricRequest;

        /**
         * Creates a plain object from a SaveMetricRequest message. Also converts values to other types if specified.
         * @param message SaveMetricRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: metric.SaveMetricRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SaveMetricRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SaveMetricRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SaveMetricResponse. */
    interface ISaveMetricResponse {

        /** SaveMetricResponse success */
        success?: (boolean|null);

        /** SaveMetricResponse id */
        id?: (string|null);
    }

    /** Represents a SaveMetricResponse. */
    class SaveMetricResponse implements ISaveMetricResponse {

        /**
         * Constructs a new SaveMetricResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: metric.ISaveMetricResponse);

        /** SaveMetricResponse success. */
        public success: boolean;

        /** SaveMetricResponse id. */
        public id: string;

        /**
         * Creates a new SaveMetricResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SaveMetricResponse instance
         */
        public static create(properties?: metric.ISaveMetricResponse): metric.SaveMetricResponse;

        /**
         * Encodes the specified SaveMetricResponse message. Does not implicitly {@link metric.SaveMetricResponse.verify|verify} messages.
         * @param message SaveMetricResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: metric.ISaveMetricResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SaveMetricResponse message, length delimited. Does not implicitly {@link metric.SaveMetricResponse.verify|verify} messages.
         * @param message SaveMetricResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: metric.ISaveMetricResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SaveMetricResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SaveMetricResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): metric.SaveMetricResponse;

        /**
         * Decodes a SaveMetricResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SaveMetricResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): metric.SaveMetricResponse;

        /**
         * Verifies a SaveMetricResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SaveMetricResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SaveMetricResponse
         */
        public static fromObject(object: { [k: string]: any }): metric.SaveMetricResponse;

        /**
         * Creates a plain object from a SaveMetricResponse message. Also converts values to other types if specified.
         * @param message SaveMetricResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: metric.SaveMetricResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SaveMetricResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SaveMetricResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetMetricsRequest. */
    interface IGetMetricsRequest {
    }

    /** Represents a GetMetricsRequest. */
    class GetMetricsRequest implements IGetMetricsRequest {

        /**
         * Constructs a new GetMetricsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: metric.IGetMetricsRequest);

        /**
         * Creates a new GetMetricsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetMetricsRequest instance
         */
        public static create(properties?: metric.IGetMetricsRequest): metric.GetMetricsRequest;

        /**
         * Encodes the specified GetMetricsRequest message. Does not implicitly {@link metric.GetMetricsRequest.verify|verify} messages.
         * @param message GetMetricsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: metric.IGetMetricsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetMetricsRequest message, length delimited. Does not implicitly {@link metric.GetMetricsRequest.verify|verify} messages.
         * @param message GetMetricsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: metric.IGetMetricsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetMetricsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetMetricsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): metric.GetMetricsRequest;

        /**
         * Decodes a GetMetricsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetMetricsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): metric.GetMetricsRequest;

        /**
         * Verifies a GetMetricsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetMetricsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetMetricsRequest
         */
        public static fromObject(object: { [k: string]: any }): metric.GetMetricsRequest;

        /**
         * Creates a plain object from a GetMetricsRequest message. Also converts values to other types if specified.
         * @param message GetMetricsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: metric.GetMetricsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetMetricsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetMetricsRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetMetricsResponse. */
    interface IGetMetricsResponse {

        /** GetMetricsResponse metrics */
        metrics?: (metric.IMetric[]|null);
    }

    /** Represents a GetMetricsResponse. */
    class GetMetricsResponse implements IGetMetricsResponse {

        /**
         * Constructs a new GetMetricsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: metric.IGetMetricsResponse);

        /** GetMetricsResponse metrics. */
        public metrics: metric.IMetric[];

        /**
         * Creates a new GetMetricsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetMetricsResponse instance
         */
        public static create(properties?: metric.IGetMetricsResponse): metric.GetMetricsResponse;

        /**
         * Encodes the specified GetMetricsResponse message. Does not implicitly {@link metric.GetMetricsResponse.verify|verify} messages.
         * @param message GetMetricsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: metric.IGetMetricsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetMetricsResponse message, length delimited. Does not implicitly {@link metric.GetMetricsResponse.verify|verify} messages.
         * @param message GetMetricsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: metric.IGetMetricsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetMetricsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetMetricsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): metric.GetMetricsResponse;

        /**
         * Decodes a GetMetricsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetMetricsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): metric.GetMetricsResponse;

        /**
         * Verifies a GetMetricsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetMetricsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetMetricsResponse
         */
        public static fromObject(object: { [k: string]: any }): metric.GetMetricsResponse;

        /**
         * Creates a plain object from a GetMetricsResponse message. Also converts values to other types if specified.
         * @param message GetMetricsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: metric.GetMetricsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetMetricsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetMetricsResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
