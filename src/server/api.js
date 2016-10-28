class APIHelper {
  json(res, data) {
    let finalData = {};
    finalData.__status = '200';
    finalData.__message = 'Success';
    finalData.data = data;

    res.json(finalData);
  }

  error(res, data, status = '403') {
    let finalData = {};
    finalData.__status = status;
    finalData.__message = 'Error';
    finalData.data = data;

    res.json(finalData);
  }

  notFound(res, data) {
    let finalData = {};
    finalData.__status = '404';
    finalData.__message = 'Not Found';
    finalData.data = data;

    res.json(finalData);
  }

  permission(res) {
    let finalData = {};
    finalData.__status = 403;
    finalData.__message = 'Permission error';

    res.json(finalData);
  }

}

export default new APIHelper();
