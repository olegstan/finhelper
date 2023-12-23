export default class ActiveCustomType
{
  static getColor(budget, types, type)
  {
    let color = null;
    if (budget.type_id === '')
    {
      color = null
    } else
    {
      let typeId = parseInt(budget.type_id);
      let customTypeId = parseInt(budget.custom_type_id);

      types.map((item) =>
      {
        if (typeId === type)
        {
          if (parseInt(item.type_id) === customTypeId)
          {
            color = item.color;
          }
        } else if (item.id === typeId)
        {
          color = item.color;
        }
      });
    }

    return color;
  }

  static getIcon(budget, types, type)
  {
    let icon = null;
    if (budget.type_id === '')
    {
      icon = 'non_category.svg'
    } else
    {
      let typeId = parseInt(budget.type_id);
      let customTypeId = parseInt(budget.custom_type_id);

      types.map((item) =>
      {
        if (typeId === type)
        {
          if (parseInt(item.type_id) === customTypeId)
          {
            icon = item.icon;
          }
        } else if (item.id === typeId)
        {
          icon = item.icon;
        }
      });
    }

    if (icon)
    {
      return icon;
    } else
    {
      return 'non_category.svg';
    }
  }

  static getName(budget, types, type)
  {
    let name = null;
    if (budget.type_id === '')
    {
      name = 'Новая'
    } else
    {
      let typeId = parseInt(budget.type_id);
      let customTypeId = parseInt(budget.custom_type_id);

      types.map((item) =>
      {
        if (typeId === type)
        {
          if (parseInt(item.type_id) === customTypeId)
          {
            name = item.name;
          }
        } else if (item.id === typeId)
        {
          name = item.name;
        }
      });
    }

    return name;
  }

  static getItem(budget, types, type)
  {
    let foundItem = null;
    if (budget.type_id === '')
    {
      foundItem = null;
    } else
    {
      let typeId = parseInt(budget.type_id);
      let customTypeId = parseInt(budget.custom_type_id);

      types.map((item) =>
      {
        if (typeId === type)
        {
          if (parseInt(item.type_id) === customTypeId)
          {
            foundItem = item;
          }
        } else if (item.id === typeId)
        {
          foundItem = item;
        }
      });
    }

    return foundItem;
  }
}
