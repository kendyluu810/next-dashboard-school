import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  // Create Subject records
  const subjects = await Promise.all(
    subjectData.map((subject) => prisma.subject.create({ data: subject }))
  );

  // TEACHER
  const teachers = await Promise.all(
    Array.from({ length: 15 }, (_, i) =>
      prisma.teacher.create({
        data: {
          id: `teacher${i + 1}`, // Unique ID for the teacher
          username: `teacher${i + 1}`,
          name: `TName${i + 1}`,
          surname: `TSurname${i + 1}`,
          email: `teacher${i + 1}@example.com`,
          phone: `123-456-789${i + 1}`,
          address: `Address${i + 1}`,
          bloodType: "A+",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          birthday: new Date(
            new Date().setFullYear(new Date().getFullYear() - 30)
          ),
        },
      })
    )
  );

  // CLASS
  // Now that teachers are created, let's create classes and assign a supervisor (teacher)
  for (let i = 1; i <= 6; i++) {
    const supervisor = teachers[i % teachers.length]; // Assign supervisor to each class
    await prisma.class.create({
      data: {
        name: `${i}A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
        supervisorId: supervisor.id, // Link supervisorId to the teacher
      },
    });
  }

  // TEACHER-SUBJECT RELATIONSHIP
  for (let i = 0; i < teachers.length; i++) {
    await prisma.teacher.update({
      where: { id: teachers[i].id },
      data: {
        subjects: {
          connect: [{ id: subjects[i % subjects.length].id }], // Assign subject to teacher
        },
        classes: {
          connect: [{ id: (i % 6) + 1 }], // Assign class to teacher
        },
      },
    });
  }

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }

  // PARENT
  const parents = await Promise.all(
    Array.from({ length: 25 }, (_, i) =>
      prisma.parent.create({
        data: {
          id: `parentId${i + 1}`,
          username: `parentId${i + 1}`,
          name: `PName ${i + 1}`,
          surname: `PSurname ${i + 1}`,
          email: `parent${i + 1}@example.com`,
          phone: `123-456-789${i + 1}`,
          address: `Address${i + 1}`,
        },
      })
    )
  );

  // STUDENT
  const students = await Promise.all(
    Array.from({ length: 50 }, (_, i) =>
      prisma.student.create({
        data: {
          id: `student${i + 1}`,
          username: `student${i + 1}`,
          name: `SName${i + 1}`,
          surname: `SSurname ${i + 1}`,
          email: `student${i + 1}@example.com`,
          phone: `987-654-321${i + 1}`,
          address: `Address${i + 1}`,
          bloodType: "O-",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          parentId: `parentId${Math.ceil((i + 1) / 2)}`,
          gradeId: (i % 6) + 1,
          classId: (i % 6) + 1,
          birthday: new Date(
            new Date().setFullYear(new Date().getFullYear() - 10)
          ),
        },
      })
    )
  );

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 5) + 1,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
