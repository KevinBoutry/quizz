import { HttpClient } from '@/services/HttpClient';

export class QuizzService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  public createQuizz = async (data) => {
    const formData = new FormData();
    if (data.thumbnail) {
      formData.append('image', data.thumbnail, 'thumbnail.png');
    }
    const dataCopy = { ...data };
    delete dataCopy.thumbnail;
    formData.append('data', JSON.stringify(dataCopy));
    const quizz = await this.http.instance.post('/quizz/create', formData, {
      headers: { ContentType: 'multipart/form-data' },
    });
    return quizz;
  };

  public getAll = async (filter) => {
    return await this.http.instance.get('/quizz', { params: filter });
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

  public getTrending = async () => {
    return await this.http.instance.get('/quizz/trending');
  };

  public publishScore = async (data) => {
    return await this.http.instance.post('score/publish', data);
  };

  public updateScore = async (data) => {
    return await this.http.instance.put('score/update', data);
  };

  public updateStars = async (data) => {
    return await this.http.instance.put('score/stars', data);
  };

  public alreadyPlayed = async (data) => {
    return await this.http.instance.get(
      `score/played/${data.quizz}/${data.user}`
    );
  };

  public getScoresByUserId = async (id) => {
    return await this.http.instance.get(`/score/id/${id}`);
  };
}
