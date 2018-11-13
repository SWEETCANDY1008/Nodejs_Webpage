SELECT * FROM emp WHERE hiredate between '87/01/01' and '87/12/31';
SELECT * FROM emp where comm=300 or comm=500 or comm=1400;
SELECT * FROM emp where comm in(300,500,1400);
SELECT * FROM emp where comm not in(300,500,1400);
SELECT * FROM emp where ename not like '%A%';
SELECT ename FROM emp where comm is NULL;
DESC emp;
SELECT * FROM emp order by sal desc;
SELECT hiredate, ename FROM emp order by hiredate desc;
SELECT * FROM emp order by sal desc, ename asc;
SELECT * FROM emp where sal>1000 order by sal desc, ename asc;
SELECT sum(sal) FROM emp;
SELECT floor(34.4567) FROM dual;
SELECT mod(34,2) FROM dual;
SELECT power(2,2) FROM dual;
SELECT * FROM emp where mod(EMPNO,2)=1;
SELECT round(6.15684,3) FROM dual;
SELECT round(5316.15684,-4) FROM dual;
SELECT round(5316.15684,-3) FROM dual;
SELECT round(5316.15684,-2) FROM dual;
SELECT round(5316.15684,-1) FROM dual;
SELECT substr('abcd',2) FROM dual;
SELECT substr('abcd',2,2) FROM dual;
SELECT substr('Welcome to Oracle',-4,3) FROM dual;
SELECT substr('한경대학교',3,3) FROM dual;
SELECT substrb('한경대학교',3,7) FROM dual;

SELECT * FROM emp;
SELECT * FROM emp WHERE substr(hiredate,4,2)='02';

SELECT sysdate from dual;
SELECT sysdate-1 from dual;
SELECT ename, round(sysdate-hiredate) "근무일수" from emp;
SELECT ename, round(months_between(sysdate, hiredate)) "근무개월수" from emp;
SELECT next_day(sysdate, '수요일') from dual;
SELECT last_day(sysdate) from dual;
SELECT to_char(sysdate, 'YYYY-MM-DD HH:MI:SS DAY') from dual;

SELECT ename, sal, to_char(sal,'L999,999') from emp;
SELECT sum(sal) from emp;

SELECT deptno FROM emp GROUP BY deptno;

SELECT deptno, to_char(sum(sal),'L999,999') "급여합"
FROM emp
GROUP BY deptno
ORDER BY sum(sal) desc;

SELECT deptno, to_char(round(avg(sal),2),'L999,999') "급여평균"
FROM emp
GROUP BY deptno
ORDER BY deptno desc;

SELECT deptno, avg(sal)
FROM emp
GROUP BY deptno
HAVING avg(sal) > 2000;

SELECT deptno, min(sal), max(sal)
FROM emp
GROUP BY deptno
HAVING max(sal) >= 2900;

SELECT * FROM dept;

SELECT ename, deptno FROM emp WHERE ename='SMITH';
SELECT dname FROM dept WHERE deptno=20;

SELECT * FROM emp, dept;

SELECT * FROM emp, dept WHERE emp.deptno = dept.deptno;

SELECT ename, dname FROM emp, dept WHERE emp.deptno = dept.deptno AND ename='SMITH';

SELECT ename, dname, e.deptno FROM emp e, dept d WHERE e.deptno = d.deptno AND ename='SMITH';

SELECT ename, sal FROM emp e, dept d WHERE e.deptno = d.deptno AND d.LOC = 'NEW YORK';

SELECT e.ename, d.dname, e.job FROM emp e, dept d WHERE e.deptno = d.deptno AND e.job = 'MANAGER';

