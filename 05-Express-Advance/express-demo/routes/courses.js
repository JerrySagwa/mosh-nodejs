const Joi = require('joi');
const express = require('express')
const router = express.Router();

const courses = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Node.js' },
];

router.get('/', (req, res) => {
  res.send([1, 2, 3]);
});

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    // 404
    res.status(404);
    res.send('Course Not Found!');
  }
  res.send(course);
});

router.get('/post/:year/:month', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(req.params);
});

router.post('/', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  // lookup courses (id) -- 404 if not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('Course Not Found!');
  }
  // req validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  // Update
  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course Not Exist!');

  const idx = courses.indexOf(course);
  courses.splice(idx, 1);

  res.send(courses);
});

module.exports = router;