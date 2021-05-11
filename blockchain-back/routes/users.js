var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signIn', (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  models.getUserByUsername(username)
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        res.json({ success: false, msg: 'No user found!!!' });
      }
      return hash(querySnapshot.docs[0].data());
    })
    .catch(error => console.log("Error getting documents: ", error));

  const hash = (user) => {
    const check = utils.checkPassword(password, user.password);
    if (check) {
      const jwt = utils.issueJWT(user);
      res.json({ success: true, msg: 'ok', user: user, token: jwt.token });
    }
    else {
      res.json({ success: false, msg: 'Password is incorrect!!!' });
    }
    return null;
  }
});

router.post('/signUp', (req, res, next) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;

  // Check the same username
  models.getUserByUsername(username)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        res.json({ success: false, msg: 'This username is already exist!!!' });
      }
      else {
        const hash = utils.hashPassword(password);
        addUser(hash);
      }
      return null;
    })
    .catch(error => console.log("Error getting documents: ", error));

  const addUser = (hash) => {
    models.addUser(name, username, email, hash)
      .then((data) => {
        console.log("Document successfully written with id: " + data.id);
        updateID(data.id);
        return true;
      })
      .catch(error => console.error("Error writing document: ", error));
  }

  const updateID = (id) => {
    models.updateUserID(id)
      .then(() => {
        res.json({ success: true, msg: 'added' });
        return true;
      })
      .catch(error => console.error(error));
  }
});

router.post('/update', (req, res, next) => {
  const { id, name, email, password } = req.body;

  models.getUserByID(id)
    .then(user => {
      const check = utils.checkPassword(password, user.data().password);
      if (!check) {
        res.json({ success: false, msg: 'Password is incorrect!!!' });
      }
      else {
        updateUser();
      }
      return null;
    })
    .catch(error => console.log(error));

  const updateUser = () => {
    models.updateUser(id, name, email)
      .then(() => {
        return getUser(id);
      })
      .catch(error => console.log(error));
  }

  const getUser = (id) => {
    models.getUserByID(id)
      .then(user => {
        res.json({ success: true, msg: 'Updated successfully!!!', user: user.data() });
        return null;
      })
      .catch(error => console.log(error));
  }
});

module.exports = router;
