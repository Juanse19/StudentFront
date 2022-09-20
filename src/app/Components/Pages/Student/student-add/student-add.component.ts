import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/@core/backends/shared/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  formStudent!: FormGroup;
  private alive = true;
  idStudent!: string | null;
  title = 'Agregar Estudiante'

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                this.idStudent =  this.activatedRoute.snapshot.paramMap.get('id');
              }

  ngOnInit(): void {

    this.formStudent = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      career: ['', Validators.required],
    });

    this.edit();

  }

  edit() {
    if (this.idStudent !== null && this.idStudent !== undefined) {
      this.title = 'Editar Estudiante'
      this.studentService.getByIdStudent(this.idStudent)
      .subscribe((res) => {
        this.formStudent.patchValue(res);
      })
    }
  }

  studentDecision() {
    if (this.idStudent === null) {
      this.createStudent();
    } else {
      this.editStudent(this.idStudent);
    }
  }

  createStudent() {
    let formStudent = this.formStudent.value;
    this.studentService
      .createStudent(formStudent)
      .subscribe(() => {
        Swal.fire({
          title: `Se Creó Exitosamente El Estudiente`,
          timer: 1500,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        })

        this.router.navigate(['/student']);

      }

      );
  }

  editStudent(id: string) {
    let formStudent = this.formStudent.value;
    this.studentService.updateStudent(id, formStudent)
    .subscribe(res => {
      Swal.fire({
        title: `Se Editó Exitosamente El Estudiente`,
        timer: 1500,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      })

      this.router.navigate(['/student']);

    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
