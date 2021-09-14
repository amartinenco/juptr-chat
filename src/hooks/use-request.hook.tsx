import axios from 'axios';
import { IUseRequest } from '../types/use-request.interface';

const useRequest = ({url, method, body, onSuccess}: IUseRequest) => {
    
  const doRequest = async () => {
    try {
      const response = await axios({ 
        url: url, 
        method: method,
        data: body
      });

      if (onSuccess) {
        onSuccess(response.data); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    doRequest
  };
}

export default useRequest;

