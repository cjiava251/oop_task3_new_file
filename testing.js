class Director {
    constructor() {
        this.projects = [];
        this.employees = [];
        this.quantityOfProjects = 0;
        this.quantityOfEmployees = 0;
    }

    getProjects(day) {
        var num = Math.round(Math.random() * 4);
        if (num > 0)
            for (var i = 0; i <= num - 1; i++)
                this.projects[this.quantityOfProjects++] = new Project(day);
    }

    getEmployees(day, dept) {
        var c;
        if (day != 1) {
            for (var i = 0; i <= this.quantityOfProjects - 1; i++) {
                if ((this.projects[i].dayOfAdding < day) && (this.projects[i].inDevDepartment == false) && (this.projects[i].inTestDepartment == false)) {
                    if (this.projects[i].type == Project.typeOfProject(0))
                        c = 0;
                    else
                        c = 1;
                }
                else if ((this.projects[i].inDevDepartment == true) && (this.projects[i].readyToTest == true)) {
                    c = 2;
                }
                else continue;
                this.employees[this.quantityOfEmployees] = new Employee(Employee.typeOfEmployee(c));
                dept.getEmployees(this.employees[this.quantityOfEmployees]);
                this.quantityOfEmployees++;
                //this.sentEmployeesToDepartment(dept);
            }
        }

    }

    sentProjectsToDepartment(dept) {
        dept.getProjects(this.projects);
    }
}

class Department {
    static typeOfDepartment(i) {
        return ['Department of Web Development', 'Department of Mobile Development', 'Department of QA Testing'][i];
    }
    constructor(type) {
        this.type = Department.typeOfDepartment(type);
        this.employees = [];
        this.projects = [];
        this.quantityOfEmployees = 0;
        this.quantityOfFreeEmployees = 0;
        this.quantityOfProjects = 0;

    }

    getEmployees(emp) {
        this.employees[this.quantityOfEmployees] = emp;
        this.employees[this.quantityOfEmployees].busy = true;
        this.quantityOfEmployees++;
    }

    getProjects(proj) {
        var num;
        var dirProj = proj.filter(function (item) {
            if ((item.inDevDepartment == false) && (item.inTestDepartment == false))
                return item;
        });
        var deptProj = proj.filter(function (item) {
            if ((item.inDevDepartment == true) && (item.inTestDepartment == false) && (item.readyToTest == true))
                return item;
        });
        if (this.type == Department.typeOfDepartment(2)) {
            if (this.quantityOfFreeEmployees != 0) {
                if (this.quantityOfFreeEmployees > deptProj.length)
                    num = deptProj.length;
                else
                    num = this.quantityOfFreeEmployees;
                for (var i = 0; i <= num - 1; i++) {
                    this.projects[this.quantityOfProjects] = deptProj[i];
                    this.projects[this.quantityOfProjects].inDevDepartment = false;
                    this.projects[this.quantityOfProjects].inTestDepartment = true;
                    this.projects[this.quantityOfProjects].readyToTest = false;
                    this.quantityOfProjects++;
                }
            }
        }
        else {
            if (this.quantityOfFreeEmployees != 0) {
                if (this.quantityOfFreeEmployees > dirProj.length)
                    num = dirProj.length;
                else
                    num = this.quantityOfFreeEmployees;
                for (i = 0; i <= num - 1; i++) {
                    this.projects[this.quantityOfProjects] = dirProj[i];
                    this.projects[this.quantityOfProjects].inDevDepartment = true;
                    this.projects[this.quantityOfProjects].inTestDepartment = false;
                    this.projects[this.quantityOfProjects].readyToTest = false;
                    this.quantityOfProjects++;
                }
            }
        }
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
        this.dayOfAdding = day;
        this.inDevDepartment = false;
        this.inTestDepartment = false;
        this.readyToTest = false;
    }
}

var dir = new Director;
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