class ResponseData {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }

  json() {
     return {"status": this.status, "data": this.data};
  }

  // ok
  static ok_200(data) {
    return new ResponseData(200, data)
  }

  // create
  static ok_201(data) {
    return new ResponseData(201, data)
  }

  // no content
  static ok_204(data) {
    return new ResponseData(204, data)
  }

  // bad request
  static fail_400(data) {
    return new ResponseData(400, data)
  }
}

module.exports = ResponseData;
