const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const data = await ProductTag.findAll().catch((err) => {
    res.json(err);
  });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id.toLowerCase();
  const data = await ProductTag.findAll({
    where: {
      id: id,
    }
  }).catch((err) => {
    res.json(err);
  });
  res.json(data);
});

router.post('/', async (req, res) => {
  // create a new tag
  const data = await ProductTag.create(req.body);

  return res.json(data);
});

router.put('/:id',  async(req, res) => {
  // update a tag's name by its `id` value
  console.log(req);
  const data = await ProductTag.update(
    {
      id: req.body.id,
      product_id: req.body.product_id,
      tag_id: req.body.tag_id,
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
  const data = await ProductTag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(data);
});

module.exports = router;
