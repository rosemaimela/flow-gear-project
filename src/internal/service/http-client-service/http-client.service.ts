import { v4 } from 'uuid';
import { HTTP_STATUS_CODE } from 'data/const/http-status-code';

export class HttpClientService {

  private baseUrl: string = process.env.REACT_APP_API_BASE_URL;
  private timeout: number = parseInt(process.env.REACT_APP_API_TIMEOUT);

  /**
   * Constructs an instance of HttpClientService.
   * @param http The Http instance to use for making requests.
   */
  public constructor() { }

  /**
   * Executes an HTTP request and handles the response.
   * @param observable The Promise representing an HTTP request call via the Fetch API.
   * @param request The request object.
   * @param customErrorHandlers Custom error handlers.
   * @returns A Promise that resolves to the response.
   */
  private executeMethod = <TRequest, TResponse>(
    fetchPromise,
    request,
    customErrorHandlers
  ): Promise<TResponse> => {
    return new Promise<TResponse>((resolve, reject) => {
      let timeoutId: NodeJS.Timeout = setTimeout(() => reject(this.createTimeoutObject()), this.timeout);

      fetchPromise.then((result: any) => {
        console.log(result);
        if (this.checkStatusForSuccess(result)) {
          clearTimeout(timeoutId);
          resolve(result.json());
          return;
        }
        this.handleErrors({ status: result.status, message: result.statusText, request }, request, customErrorHandlers);
        clearTimeout(timeoutId);
        reject({ status: result.status, message: result.statusText });
      }).catch((error: Error) => {
        this.handleErrors(error, request, customErrorHandlers);
        clearTimeout(timeoutId);
        reject(error);
      });
    });
  }

  /**
   * Handles errors returned from the API.
   * @param error The error object.
   * @param request The request object.
   * @param customErrorHandlers Custom error handlers.
   */
  private handleErrors(error: any, request: any, customErrorHandlers: object = {}) {
    if (
      error?.status !== undefined
    ) {
      let httpError: Response = error as Response;
      switch (httpError.status) {
        case HTTP_STATUS_CODE.UNAUTHORIZED:
          console.error("You are not authorized to perform this action", JSON.stringify(error, null, 2))
          if (customErrorHandlers[HTTP_STATUS_CODE.UNAUTHORIZED] !== undefined) {
            customErrorHandlers[HTTP_STATUS_CODE.UNAUTHORIZED](error);
          }
          return;
        case HTTP_STATUS_CODE.CONFLICT:
          if (customErrorHandlers[HTTP_STATUS_CODE.CONFLICT] !== undefined) {
            customErrorHandlers[HTTP_STATUS_CODE.CONFLICT](error);
          }
          return;
        case HTTP_STATUS_CODE.FORBIDDEN:
          if (customErrorHandlers[HTTP_STATUS_CODE.FORBIDDEN] !== undefined) {
            customErrorHandlers[HTTP_STATUS_CODE.FORBIDDEN](error);
          }
          return;
        case HTTP_STATUS_CODE.REQUEST_TIMEOUT:
          //this.toastrService.error("Unable to establish connection", "Error")
          console.error("Error! Failed to connect ", JSON.stringify(error, null, 2));
          return;
        case HTTP_STATUS_CODE.BAD_REQUEST:
          console.error(`Error! Bad request ${JSON.stringify(request, null, 2)}`)// remove when in production
          return; return;
        case HTTP_STATUS_CODE.NOT_FOUND:
          console.error("Error! Not Found", JSON.stringify(error, null, 2));
          return;
        case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR:
        default:
          console.error("Something went wrong", JSON.stringify(error, null, 2));
          return;
      }
    }
  }

  /**
   * Checks if the response status indicates success.
   * @param response The response object.
   * @returns True if the response status indicates success, false otherwise.
   */
  private checkStatusForSuccess<TResponse>(response: TResponse): boolean {
    const status = (response as Response).status;
    switch (status) {
      case 200:
      case 201: case 202:
      case 203: case 204:
      case 205: case 206:
      case 207: case 208:
      case 226:
        return true;
      default:
        return false;
    }
  }

  /**
   * Adds authentication headers to the request.
   * @param headers The request headers.
   */
  private authenticate({ headers }) {
    (headers as any).Authorization = "Key=" + process.env.REACT_APP_API_AUTH_KEY;
  }

  /**
   * Creates a timeout object.
   * @returns The timeout object.
   */
  private createTimeoutObject() {
    return {
      "type": "https://tools.ietf.org/html/rfc7231#section-6.5.7",
      "title": "Request Timeout",
      "status": `${HTTP_STATUS_CODE.REQUEST_TIMEOUT}`,
      "errors": "Waited too long for response from server: Request Timeout",
      "traceId": v4()
    };
  }

  /**
   * Creates the headers for the request.
   * @returns The request headers.
   */
  private createHeaders(method) {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Timeout': process.env.REACT_APP_API_TIMEOUT,
      "Vary": "Accept-Encoding, Origin",
      "Access-Control-Request-Method": method,
      "Access-Control-Request-Headers": "content-type,x-pingother",
      "Connection": "keep-alive",
      "Host": process.env.REACT_APP_API_BASE_URL
    }
  }

  /**
   * Joins query parameters into a string.
   * @param params The query parameters.
   * @returns The joined query parameters string.
   */
  private joinQueryParams({ params }: { [key: string]: any }): string {
    const queryParams = Object.keys(params)
      .map(objKey => {
        let key = encodeURIComponent(objKey);
        let value = undefined;
        if (Array.isArray(params[objKey]))
          value = params[objKey].map(v => encodeURIComponent(v)).join(",");
        else
          value = encodeURIComponent(params[objKey]);
        return `${key}=${value}`
      }
      ).join('&');
    if (queryParams.length > 0)
      return '?' + queryParams;
    else return '';
  }

  /**
   * Sends a GET request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @param isPrivate Indicates if the request requires authentication.
   * @returns A Promise that resolves to the response.
   */
  public async get<TResponse, TRequest>(
    endpoint: string,
    body: TRequest,
    customErrorHandlers: object = {},
    isPrivate: boolean
  ): Promise<TResponse> {
    const fullUrl = this.baseUrl + endpoint;
    // build headers
    const headers = this.createHeaders("GET");
    // authenticate
    if (isPrivate) {
      this.authenticate({ headers });
    }
    // build params
    let urlWithParams = fullUrl + this.joinQueryParams({ params: body });
    let request = new Request(urlWithParams, {
      headers,
      method: 'GET',
      mode: "cors",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      credentials: "same-origin"
    });

    return this.executeMethod<TRequest, TResponse>(fetch(request), body, customErrorHandlers);
  }

  /**
   * Sends a POST request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @param isPrivate Indicates if the request requires authentication.
   * @returns A Promise that resolves to the response.
   */
  public async post<TResponse, TRequest>(
    endpoint: string,
    body: TRequest,
    customErrorHandlers: object = {},
    isPrivate: boolean
  ): Promise<TResponse> {
    const fullUrl = this.baseUrl + endpoint;
    // build headers
    const headers = this.createHeaders("POST");

    // authenticate
    if (isPrivate) {
      this.authenticate({ headers });
    }
    const request = new Request(fullUrl, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    });
    return this.executeMethod<TRequest, TResponse>(fetch(request), body, customErrorHandlers);

  }

  /**
   * Sends a PUT request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @param isPrivate Indicates if the request requires authentication.
   * @returns A Promise that resolves to the response.
   */
  public async put<TResponse, TRequest>(
    endpoint: string,
    body: TRequest,
    customErrorHandlers: object = {},
    isPrivate: boolean
  ): Promise<TResponse> {
    const fullUrl = this.baseUrl + endpoint;
    // build headers
    const headers = this.createHeaders("PUT");

    // authenticate
    if (isPrivate) {
      this.authenticate({ headers });
    }
    let request = new Request(fullUrl, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT'
    });
    return this.executeMethod<TRequest, TResponse>(fetch(request), body, customErrorHandlers);
  }

  /**
   * Sends a DELETE request to the API.
   * @param endpoint The API endpoint.
   * @param body The request body.
   * @param customErrorHandlers Custom error handlers.
   * @param isPrivate Indicates if the request requires authentication.
   * @returns A Promise that resolves to the response.
   */
  public async delete<TResponse, TRequest>(
    endpoint: string,
    body: TRequest,
    customErrorHandlers: object = {},
    isPrivate: boolean
  ): Promise<TResponse> {
    const fullUrl = this.baseUrl + endpoint;
    // build headers
    const headers = this.createHeaders("DELETE");

    // authenticate
    if (isPrivate) {
      this.authenticate({ headers });
    }
    // build params
    let urlWithParams = fullUrl + this.joinQueryParams({ params: body });
    let request = new Request(urlWithParams, {
      headers,
      method: 'DELETE'
    });
    return this.executeMethod<TRequest, TResponse>(fetch(request), body, customErrorHandlers);
  }
}

