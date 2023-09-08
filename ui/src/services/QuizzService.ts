import { HttpClient } from '@/services/HttpClient';

export class QuizzService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  public createQuizz = async (data) => {
    console.log(data);
    const quizz = await this.http.instance.post('/quizz/create', data);
    return quizz;
  };
}
