class Role {
	constructor(title, salary, departmentId) {
		this.title = title;
		this.salary = salary;
		this.departmentId = departmentId;
	}

	viewAllRoles(connection, callback) {
		const query = connection.query(
			`
				SELECT role.*, dep.name  as dept_name
				FROM role as role
					LEFT JOIN department as dep ON
					dep.id = role.department_id
			`, this,
			function (err, res) {
				if (err) throw err;
				callback(res);
			});
	}

	addRole(connection, callback) {
		const query = connection.query("INSERT INTO role SET ?", 
			{
				title: this.title,
				salary: this.salary,
				department_id: this.departmentId
			},
			function (err, res) {
				if (err) throw err;
				callback();
			});
	}

	updateRole(connection, id) {
		const query = connection.query(
			"UPDATE role SET ? WHERE ?",
			[
				this,
				{
					id: id
				}
			],
			function (error) {
				if (error) throw err;
				return;
			}
		);
	}
}

module.exports = Role;