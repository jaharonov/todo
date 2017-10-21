CREATE TABLE "todo_list" (
	"id" serial primary key,
	"task" varchar(200) not null,
	"notes" varchar(500) not null
);