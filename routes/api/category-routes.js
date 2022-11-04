const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const data = await Category.findAll({
    include: [{ model: Product }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id.toLowerCase();
  const data = await Category.findAll({
    where: {
      id: id,
    },
    include: [{ model: Product }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(data);
});

router.post('/', async(req, res) => {
  // create a new category
  const data = await Category.create(req.body);

  return res.json(data);
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  console.log(req);
  const data = await Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(data);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const data = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(data);
});

module.exports = router;
