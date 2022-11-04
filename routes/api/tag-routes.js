const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const data = await Tag.findAll({
    include: [{ model: Product }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const data = await Tag.create(req.body);
  return res.json(data);
});

router.put('/:id',  async(req, res) => {
  // update a tag's name by its `id` value
  const data = await Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(data);
});

router.delete('/:id',  async(req, res) => {
  // delete on tag by its `id` value
  const data = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(data);
});

module.exports = router;
