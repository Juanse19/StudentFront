import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommandColumnService, CommandModel, EditService, FilterSettingsModel, PageService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { StudentService } from 'src/app/@core/backends/shared/services/student.service';
import { Student } from 'src/app/@core/models/student.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./student-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Injectable({
  providedIn: "root",
})
export class StudentListComponent implements OnInit {

  public studentData?: Student[];
  private alive = true;

  public editSettings?: Object;
  public toolbar!: ToolbarItems[] | object;
  public editparams!: Object;
  public pageSettings!: Object;
  public filterOptions!: FilterSettingsModel;
  public commands!: CommandModel[];

  constructor(private studentService: StudentService,
              private router: Router) { }

  ngOnInit(): void {

    this.getStudent();

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
      type: 'Menu',
   };

   this.commands = [
    {
      type: 'Edit',
      buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' }
    },
    {
      type: 'Delete',
      buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' }
    }
  ];

  }

  getStudent() {
    this.studentService.getAll()
    .subscribe(res => {
      this.studentData = res;
    }, error => console.log(error));
  }

  actionBegin(args: any) {
    if (args.requestType == 'beginEdit') {

      args.cancel = true;
      this.router.navigate([`student/edit/${args.rowData.id}`]);
    }

    if (( args.requestType === 'delete')) {

      Swal.fire({
        title: '¿Estás seguro que quieres eliminar el Estudiente?',
        text: `¡Se eliminará el Estudiente!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, Eliminar!'
      }).then(result => {
        // debugger
        if (result.value) {

          this.studentService.deleteStudent(args.data[0].id)
          .subscribe(res => {

            this.getStudent();

          }, error => console.log(error));

          Swal.fire('¡Se Eliminó Exitosamente', 'success');
        }


       });
      args.cancel = true;
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
