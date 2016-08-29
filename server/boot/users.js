module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create({
    username: 'admin',
    email: 'jefflnorton@gmail.com',
    password: 'password'
  }, function(err, user) {
    if (err) throw err;

    console.log('Created admin user:', user);

    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created admin role:', role);

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: user.id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created admin principal:', principal);
      });
    });
  });
};
