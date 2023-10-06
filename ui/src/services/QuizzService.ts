import { HttpClient } from '@/services/HttpClient';

export class QuizzService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  public createQuizz = async (data) => {
    const formData = new FormData();
    formData.append('image', data.thumbnail, 'thumbnail.png');
    const dataCopy = { ...data };
    delete dataCopy.thumbnail;
    formData.append('data', JSON.stringify(dataCopy));
    const quizz = await this.http.instance.post('/quizz/create', formData, {
      headers: { ContentType: 'multipart/form-data' },
    });

    return quizz;
  };

  public getByTheme = async (theme) => {
    return await this.http.instance.get(`/quizz/themes/${theme}`);
  };

  public getById = async (id) => {
    return await this.http.instance.get(`/quizz/${id}`);
  };

  public getByRecent = async () => {
    return await this.http.instance.get('/quizz/recent');
  };
}
