 import axios from 'axios';

const base_url = 'https://zxgn4hjm-8000.inc1.devtunnels.ms/';
const app = axios.create({
    baseURL: base_url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export async function getReport() {
  try {
    const response = await app.get('/');
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error fetching report');
  }
}

  export async function uploadCv(selectedFiles) {
    const formData = new FormData();
    
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]); 
    }
  
    try {
      const response = await app.post('/upload-resumes/', formData);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Error uploading CV');
    }
  }

  export async function uploadJd(jdFile) {
    const formData = new FormData();
    
    formData.append('file', jdFile);  
    try {
      const response = await app.post('/upload-jd/', formData);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Error uploading JD');
    }
  }

/**
 * Generates the report based on given parameters
 * @param {number} skill_weight the weight to be given to skills
 * @param {number} experience_weight the weight to be given to experience
 * @param {number} relevance_weight the weight to be given to relevance
 * @param {number} threshold_score the threshold score
 * @returns {Object} report
 */

export async function generateReport(skill_weight, experience_weight, relevance_weight, threshold_score) {
  try {
    const response = await app.get('/start/', {
      params: {
        skill_weight: Number(skill_weight),
        experience_weight: Number(experience_weight),
        relevance_weight: Number(relevance_weight),
        threshold_score: Number(threshold_score)
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error generating report');
  }
}

export async function downloadReport(report_id) {
  try {
    const response = await app.get('/get_report/', {
      params: {
        report_id: Number(report_id)
      },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error downloading report');
  }
}
export async function listing(start_date,end_date){
  try {
    const response = await app.get('/get_datewise_data/',{
      params: {
        start_date: start_date,
        end_date: end_date
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error fetching data');
  }
}

