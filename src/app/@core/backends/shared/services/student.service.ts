import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student, StudentCreation } from 'src/app/@core/models/student.interface';
import { TrackHttpError } from 'src/app/@core/models/trackHttpError';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private urlApi = environment.urlApi + 'student';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get<Student[]>(`${this.urlApi}/`);
  }

  public getByIdStudent(id: string) {
    return this.httpClient.get<Student>(`${this.urlApi}/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  public createStudent(student: StudentCreation) {
    return this.httpClient.post(this.urlApi, student)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  public updateStudent(id: string, student: StudentCreation) {
    return this.httpClient.put(`${this.urlApi}/${id}`, student);
  }

  public deleteStudent(id: number) {
    return this.httpClient.delete(`${this.urlApi}/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  private handleHttpError(
    error:HttpErrorResponse
  ):Observable<TrackHttpError>{

    let dataError = new TrackHttpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retrienving data.';
    return throwError(dataError);
  }

}
