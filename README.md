Backend de un sistema de universidad (NestJS + Prisma + PostgreSQL)

Usamos las siguientes tecnologías

NestJS – Framework modular backend
Prisma ORM – Acceso a base de datos
PostgreSQL – Base de datos relacional

---

CONFIGURACIÓN INICIAL
Instalar dependencias
npm install

Configurar variables en .env
DATABASE_URL="postgresql://usuario:password@host:puerto/dbname"

Ejecutar migraciones
npx prisma migrate dev --name init

---

## ESTRUCTURA DE MÓDULOS PRINCIPALES

Users → Usuarios, por el momento sin autenticacion
Institutions → Información institucional
Careers → Carreras universitarias
Term Cycles → Ciclos académicos
Subjects → Materias
Teachers → Docentes
Classrooms → Aulas
Academic Periods → Periodos académicos
Students → Estudiantes
Parallels → Paralelos / Ofertas
Cycle Enrollments → Matrículas por ciclo

---

## ENDPOINTS PRINCIPALES

USERS:
POST /users
{
"email": "ejemplo@ejemplo.ec",
"password": "123456",
"status": true,
"role": "ADMIN"
}
GET /users?page=1&limit=10
GET /users/1

INSTITUTIONS:
POST /institutions
{
"name": "Universidad Nacional Experimental",
"location": "Ambato - Ecuador",
"phone": "032567890",
"email": "ejemplo@ejemplo.ec"
}
GET /institutions
GET /institutions/1

CAREERS:
POST /careers
{
"name": "Tecnología Superior en Estética Integral",
"code": "EST-001",
"degree": "Tecnólogo Superior"
}
GET /careers?page=1&limit=10
GET /careers/1

TERM CYCLES:
POST /term-cycles
{
"number": 1,
"description": "Primer ciclo académico"
}
GET /term-cycles

SUBJECTS:
POST /subjects
{
"name": "Anatomía Facial",
"code": "SUBJ-101",
"credits": 4,
"hours": 48,
"careerId": 1,
"cycleId": 1
}
GET /subjects?page=1&limit=10

TEACHERS:
POST /teachers
{
"firstName": "María",
"lastName": "García",
"cedula": "0102345678",
"email": "ejemplo@ejemplo.ec",
"phone": "0998765432"
}
GET /teachers

CLASSROOMS:
POST /classrooms
{
"code": "A101",
"building": "Bloque A"
}
GET /classrooms

ACADEMIC PERIODS:
POST /academic-periods
{
"name": "Periodo Académico 2025-A",
"startDate": "2025-03-01",
"endDate": "2025-08-15",
"state": true
}
GET /academic-periods

STUDENTS:
POST /students
{
"cedula": "0109876543",
"firstName": "Joseph",
"lastName": "Quito",
"email": "ejemplo@ejemplo.ec",
"phone": "0987654321",
"status": true
}
GET /students?page=1&limit=10
GET /students?name=Joseph
GET /students?cedula=0109
GET /students?status=true
GET /students/1

PARALLELS:
POST /parallels
{
"subjectId": 1,
"periodId": 1,
"teacherId": 1,
"classroomId": 1,
"section": "A"
}
GET /parallels?page=1&limit=10

CYCLE ENROLLMENTS:
POST /cycle-enrollments
{
"studentId": 1,
"careerId": 1,
"periodId": 1,
"cycleId": 1,
"status": "ENROLLED",
"enrolledOn": "2025-03-10"
}
GET /cycle-enrollments?page=1&limit=10
GET /cycle-enrollments?studentId=1
GET /cycle-enrollments?careerId=1
GET /cycle-enrollments?status=APPROVED
GET /cycle-enrollments/1

---

## ORDEN RECOMENDADO DE INSERCIÓN DE DATOS

1.  /users
2.  /institutions
3.  /careers
4.  /term-cycles
5.  /subjects
6.  /teachers
7.  /classrooms
8.  /academic-periods
9.  /students
10. /parallels
11. /cycle-enrollments

---

## AUTOR

Joseph Quito
Proyecto académico ITS – 2025
Desarrollo modular NestJS + Prisma + PostgreSQL
