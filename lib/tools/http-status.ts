export interface HttpStatusCode {
  code: number;
  name: string;
  description: string;
  category: HttpStatusCategory;
}

export type HttpStatusCategory = '1xx' | '2xx' | '3xx' | '4xx' | '5xx';

export interface HttpStatusCategoryInfo {
  label: string;
  description: string;
  variant: 'info' | 'success' | 'warning' | 'error' | 'default';
}

export const categoryInfo: Record<HttpStatusCategory, HttpStatusCategoryInfo> = {
  '1xx': {
    label: 'Informational',
    description: 'Request received, continuing process',
    variant: 'info',
  },
  '2xx': {
    label: 'Success',
    description: 'Request successfully received and processed',
    variant: 'success',
  },
  '3xx': {
    label: 'Redirection',
    description: 'Further action needed to complete request',
    variant: 'warning',
  },
  '4xx': {
    label: 'Client Error',
    description: 'Request contains bad syntax or cannot be fulfilled',
    variant: 'error',
  },
  '5xx': {
    label: 'Server Error',
    description: 'Server failed to fulfill a valid request',
    variant: 'error',
  },
};

export const httpStatusCodes: HttpStatusCode[] = [
  // 1xx Informational
  {
    code: 100,
    name: 'Continue',
    description:
      'The server has received the request headers and the client should proceed to send the request body.',
    category: '1xx',
  },
  {
    code: 101,
    name: 'Switching Protocols',
    description:
      'The server is switching protocols as requested by the client via the Upgrade header.',
    category: '1xx',
  },
  {
    code: 102,
    name: 'Processing',
    description:
      'The server has received and is processing the request, but no response is available yet.',
    category: '1xx',
  },
  {
    code: 103,
    name: 'Early Hints',
    description:
      'Used to return some response headers before final HTTP message, allowing preloading resources.',
    category: '1xx',
  },

  // 2xx Success
  {
    code: 200,
    name: 'OK',
    description:
      'The request has succeeded. The meaning of success depends on the HTTP method used.',
    category: '2xx',
  },
  {
    code: 201,
    name: 'Created',
    description: 'The request has been fulfilled and has resulted in a new resource being created.',
    category: '2xx',
  },
  {
    code: 202,
    name: 'Accepted',
    description:
      'The request has been accepted for processing, but the processing has not been completed.',
    category: '2xx',
  },
  {
    code: 203,
    name: 'Non-Authoritative Information',
    description:
      'The returned metadata is not exactly the same as available from the origin server.',
    category: '2xx',
  },
  {
    code: 204,
    name: 'No Content',
    description: 'The server successfully processed the request and is not returning any content.',
    category: '2xx',
  },
  {
    code: 205,
    name: 'Reset Content',
    description:
      'The server successfully processed the request and asks the client to reset the document view.',
    category: '2xx',
  },
  {
    code: 206,
    name: 'Partial Content',
    description:
      'The server is delivering only part of the resource due to a range header sent by the client.',
    category: '2xx',
  },
  {
    code: 207,
    name: 'Multi-Status',
    description:
      'The message body contains multiple status codes for multiple independent operations (WebDAV).',
    category: '2xx',
  },
  {
    code: 208,
    name: 'Already Reported',
    description:
      'The members of a DAV binding have already been enumerated and are not included again.',
    category: '2xx',
  },
  {
    code: 226,
    name: 'IM Used',
    description:
      'The server has fulfilled a request for the resource with instance-manipulations applied.',
    category: '2xx',
  },

  // 3xx Redirection
  {
    code: 300,
    name: 'Multiple Choices',
    description:
      'The request has more than one possible response. The user or user agent should choose one.',
    category: '3xx',
  },
  {
    code: 301,
    name: 'Moved Permanently',
    description:
      'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
    category: '3xx',
  },
  {
    code: 302,
    name: 'Found',
    description:
      'The URI of the requested resource has been changed temporarily. Further changes might be made in the future.',
    category: '3xx',
  },
  {
    code: 303,
    name: 'See Other',
    description:
      'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
    category: '3xx',
  },
  {
    code: 304,
    name: 'Not Modified',
    description:
      'The resource has not been modified since last requested. The client can use its cached version.',
    category: '3xx',
  },
  {
    code: 305,
    name: 'Use Proxy',
    description:
      'The requested resource must be accessed through the proxy given by the Location field. Deprecated.',
    category: '3xx',
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    description:
      'The server sends this response to redirect the client with the same method that was used in the prior request.',
    category: '3xx',
  },
  {
    code: 308,
    name: 'Permanent Redirect',
    description:
      'The resource is now permanently located at another URI, specified by the Location header. Same method must be used.',
    category: '3xx',
  },

  // 4xx Client Error
  {
    code: 400,
    name: 'Bad Request',
    description:
      'The server cannot process the request due to malformed syntax or invalid request message framing.',
    category: '4xx',
  },
  {
    code: 401,
    name: 'Unauthorized',
    description:
      'Authentication is required and has failed or has not been provided. The response must include a WWW-Authenticate header.',
    category: '4xx',
  },
  {
    code: 402,
    name: 'Payment Required',
    description: 'Reserved for future use. Some APIs use this to indicate a payment is required.',
    category: '4xx',
  },
  {
    code: 403,
    name: 'Forbidden',
    description:
      'The client does not have access rights to the content. Unlike 401, the client identity is known to the server.',
    category: '4xx',
  },
  {
    code: 404,
    name: 'Not Found',
    description:
      'The server cannot find the requested resource. The URL is not recognized or the resource does not exist.',
    category: '4xx',
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    description:
      'The request method is known by the server but not supported by the target resource.',
    category: '4xx',
  },
  {
    code: 406,
    name: 'Not Acceptable',
    description:
      'The server cannot produce a response matching the list of acceptable values defined in the request headers.',
    category: '4xx',
  },
  {
    code: 407,
    name: 'Proxy Authentication Required',
    description: 'Authentication is required by a proxy between the client and server.',
    category: '4xx',
  },
  {
    code: 408,
    name: 'Request Timeout',
    description: 'The server timed out waiting for the request from the client.',
    category: '4xx',
  },
  {
    code: 409,
    name: 'Conflict',
    description:
      'The request conflicts with the current state of the server, usually due to concurrent modifications.',
    category: '4xx',
  },
  {
    code: 410,
    name: 'Gone',
    description:
      'The content has been permanently deleted from the server with no forwarding address.',
    category: '4xx',
  },
  {
    code: 411,
    name: 'Length Required',
    description:
      'The server rejected the request because the Content-Length header is not defined.',
    category: '4xx',
  },
  {
    code: 412,
    name: 'Precondition Failed',
    description:
      'The client has indicated preconditions in its headers which the server does not meet.',
    category: '4xx',
  },
  {
    code: 413,
    name: 'Payload Too Large',
    description: 'The request entity is larger than limits defined by the server.',
    category: '4xx',
  },
  {
    code: 414,
    name: 'URI Too Long',
    description:
      'The URI requested by the client is longer than the server is willing to interpret.',
    category: '4xx',
  },
  {
    code: 415,
    name: 'Unsupported Media Type',
    description: 'The media format of the requested data is not supported by the server.',
    category: '4xx',
  },
  {
    code: 416,
    name: 'Range Not Satisfiable',
    description: 'The range specified in the Range header cannot be fulfilled by the server.',
    category: '4xx',
  },
  {
    code: 417,
    name: 'Expectation Failed',
    description:
      'The expectation given in the Expect request header could not be met by the server.',
    category: '4xx',
  },
  {
    code: 418,
    name: "I'm a Teapot",
    description:
      'The server refuses the attempt to brew coffee with a teapot. An April Fools joke from RFC 2324.',
    category: '4xx',
  },
  {
    code: 421,
    name: 'Misdirected Request',
    description: 'The request was directed at a server that is not able to produce a response.',
    category: '4xx',
  },
  {
    code: 422,
    name: 'Unprocessable Entity',
    description:
      'The request was well-formed but unable to be followed due to semantic errors (WebDAV).',
    category: '4xx',
  },
  {
    code: 423,
    name: 'Locked',
    description: 'The resource that is being accessed is locked (WebDAV).',
    category: '4xx',
  },
  {
    code: 424,
    name: 'Failed Dependency',
    description: 'The request failed because it depended on another request that failed (WebDAV).',
    category: '4xx',
  },
  {
    code: 425,
    name: 'Too Early',
    description: 'The server is unwilling to process a request that might be replayed.',
    category: '4xx',
  },
  {
    code: 426,
    name: 'Upgrade Required',
    description:
      'The server refuses to perform the request using the current protocol but might do so with an upgrade.',
    category: '4xx',
  },
  {
    code: 428,
    name: 'Precondition Required',
    description:
      'The origin server requires the request to be conditional to prevent lost updates.',
    category: '4xx',
  },
  {
    code: 429,
    name: 'Too Many Requests',
    description: 'The user has sent too many requests in a given amount of time (rate limiting).',
    category: '4xx',
  },
  {
    code: 431,
    name: 'Request Header Fields Too Large',
    description:
      'The server is unwilling to process the request because its header fields are too large.',
    category: '4xx',
  },
  {
    code: 451,
    name: 'Unavailable For Legal Reasons',
    description: 'The user agent requested a resource that cannot legally be provided.',
    category: '4xx',
  },

  // 5xx Server Error
  {
    code: 500,
    name: 'Internal Server Error',
    description:
      'The server has encountered an unexpected condition that prevented it from fulfilling the request.',
    category: '5xx',
  },
  {
    code: 501,
    name: 'Not Implemented',
    description: 'The server does not support the functionality required to fulfill the request.',
    category: '5xx',
  },
  {
    code: 502,
    name: 'Bad Gateway',
    description:
      'The server received an invalid response from the upstream server while acting as a gateway.',
    category: '5xx',
  },
  {
    code: 503,
    name: 'Service Unavailable',
    description:
      'The server is not ready to handle the request, usually due to maintenance or overload.',
    category: '5xx',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    description:
      'The server is acting as a gateway and did not get a response in time from the upstream server.',
    category: '5xx',
  },
  {
    code: 505,
    name: 'HTTP Version Not Supported',
    description: 'The HTTP version used in the request is not supported by the server.',
    category: '5xx',
  },
  {
    code: 506,
    name: 'Variant Also Negotiates',
    description:
      'The server has an internal configuration error: transparent content negotiation results in a circular reference.',
    category: '5xx',
  },
  {
    code: 507,
    name: 'Insufficient Storage',
    description:
      'The server is unable to store the representation needed to complete the request (WebDAV).',
    category: '5xx',
  },
  {
    code: 508,
    name: 'Loop Detected',
    description: 'The server detected an infinite loop while processing the request (WebDAV).',
    category: '5xx',
  },
  {
    code: 510,
    name: 'Not Extended',
    description: 'Further extensions to the request are required for the server to fulfill it.',
    category: '5xx',
  },
  {
    code: 511,
    name: 'Network Authentication Required',
    description:
      'The client needs to authenticate to gain network access, typically from a captive portal.',
    category: '5xx',
  },
];

export function searchHttpStatus(query: string): HttpStatusCode[] {
  if (!query.trim()) return httpStatusCodes;
  const q = query.toLowerCase().trim();
  return httpStatusCodes.filter(
    (s) =>
      s.code.toString().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.includes(q)
  );
}

export function getHttpStatusByCode(code: number): HttpStatusCode | undefined {
  return httpStatusCodes.find((s) => s.code === code);
}

export function getHttpStatusByCategory(category: HttpStatusCategory): HttpStatusCode[] {
  return httpStatusCodes.filter((s) => s.category === category);
}

export function getCategories(): HttpStatusCategory[] {
  return ['1xx', '2xx', '3xx', '4xx', '5xx'];
}
