import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  isEditMode: boolean = false;
  student: Student = this.getEmptyStudent();
  constructor() { }

  ngOnInit(): void {
    //this.LoadStudent();
  }
  // LoadStudent() {
  //   this.students = [
  //     { id: 1, firstname: 'simran', lastname: 'sharma', email: 'simr8445@gmail.com', country: 'india' },
  //     { id: 2, firstname: 'sona', lastname: 'sharma', email: 'simr8445@gmail.com', country: 'india' }
  //   ];

  // }

  getEmptyStudent(): Student {
    return { id: 0, firstname: '', lastname: '', email: '', country: '' }
  }

  resetForm() {
    this.isEditMode = true;  
    this.student = {
      id: 0,
    
      firstname: '',
      lastname:'',
   
      email: '',
      country: ''
    };
    

  }
  
  saveStudent() {
    if (this.isEditMode) {
      const index = this.students.findIndex(s => s.id === this.student.id);
      if (index > -1) {
        this.students[index] = { ...this.student };
      } else {
        this.student.id = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
        this.students.push({ ...this.student });
      }
      this.resetForm();
      this.isEditMode = false;
    }


  }
  deletestudent(id: any) {
    if (id !== '') {
      const confirmation = confirm("Are you sure you want to delete this student?");
      
      if (confirmation) {
       
        for (let i = 0; i < this.students.length; i++) {
          if (this.students[i].id === id.id) {
            this.students.splice(i, 1); 
            break; 
          }
        }
      } else {
       
        console.log("Delete action was canceled.");
      }
    }
  
    
  }
  

  editstudent(student: Student) {
    this.isEditMode = true;
    this.student = { ...student };

  }


  
  selectAll(event: any) {
    this.students.forEach(student => (student.selected = event.target.checked));
  }

}

interface Student {
  id: number;
  //profilePicture:string;
  firstname: string;
  lastname: string;
  //Department: string;
  email: string;
  country: string;
  selected?: boolean;
}
