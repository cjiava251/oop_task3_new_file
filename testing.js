class Director {
    constructor() {
        this.projects=[];
        this.employees=[];
        this.quantityOfProjects=0;
        this.quantityOfEmployees=0;
    }

    getProjects(day) {
        var num=Math.round(Math.random()*4);
        if (num>0) {
            for (var i=0;i<=num-1;i++) {
                this.projects[this.quantityOfProjects++]=new Project(day);          
            }
        }
        //console.log(this.projects);
    }

    getEmployees(day) {
        if (day!=1) {
            for (var i=0;i<=this.quantityOfEmployees;i++) {

            }
        }
           /* for (var i=0;i<=this.numberOfProjects[day-1]-1;i++) {
                if (this.projects[i][day-1].type=Project.typeOfProject(0)) {
                    this.employees[i]=[];
                    this.employees[i][day-1]=new Employee(0);
                }
                else {
                    this.employees[i]=[];
                    this.employees[i][day-1]=new Employee(1);
                }
            
            }  */
       // console.log(this.employees);  
    }  

    sentEmployees() {

    }

    sentProjectsToDepartment(dept) {
        for (var i=0;i<=this.quantityOfProjects-1;i++) {
            if (this.projects[i].inDepartment==false) {
                if (((dept.type==Department.typeOfDepartment(0)) && (this.projects[i].type==Project.typeOfProject(0))) || ((dept.type=Department.typeOfDepartment(1)) && (this.projects[i].type==Project.typeOfProject(1)))) {
                    if (dept.quantityOfFreeEmployees>0) {
                        for (var j=0;j<=dept.quantityOfEmployees-1;j++) {
                            if (dept.employees[j].busy==false) {
                                dept.projects[dept.quantityOfProjects]=this.projects[i];
                                dept.projects[dept.quantityOfProjects].inDepartment=true;
                                this.projects[i].inDepartment=true;
                                dept.quantityOfProjects++;
                            }
                        }
                    }
                }    
            }
        }
    }
}

class Department {
    static typeOfDepartment(i) {
        return ['Department of Web Development', 'Department of Mobile Development', 'Department of QA Testing'][i];
    }
    constructor() {
        this.employees=[];
        this.projects=[];
        this.quantityOfEmployees=0;
        this.quantityOfFreeEmployees=0;
        this.quantityOfProjects=0;
    }

    getEmployees() {

    }

    getProjects() {

    }
}

class Employee {
    static typeOfEmployee(i) {
        return ['Web developer', 'Mobile developer', 'QA tester'][i];
    }
    constructor(type) {
        this.type = Employee.typeOfEmployee(type);
        this.completedProjects = 0;
        this.busy = false;
    }
}

class Project {
    static typeOfProject(i) {
        return ['Web project', 'Mobile project'][i];
    }
    constructor(day) {
        this.type = Project.typeOfProject(Math.round(Math.random()));
        this.difficulty = Math.round(Math.random() * 2 + 1);
        this.dayOfAdding=day;
        this.inDepartment=false;
    }
}

var dir=new Director;
dir.getEmployees(0);  
dir.getProjects(0);  

/*
var mas=[];
for (var i=0;i<=4;i++) { 
    mas[i]=[];
    for (var j=0;j<=3;j++) {
        mas[i][j]=4;
    }
}

console.log(mas);
*/