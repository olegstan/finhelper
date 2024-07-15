import ActiveConstants from "../constants/ActiveConstants"
import Active from "../helpers/Active"
import ActiveModel from "../models/Active"
import Color from "../helpers/Color"
import Money from "../helpers/Money"

class CaseGroupHelper
{
  static getNameByGroup(item, groupType)
  {
    let name = '';

    if (groupType === ActiveConstants.BY_TYPE)
    {
      name = ActiveConstants.getActiveNameByType(item);
    } else if (groupType === ActiveConstants.BY_GROUP)
    {
      name = ActiveConstants.getActiveNameByGroup(item);
    } else if (groupType === ActiveConstants.BY_ACCOUNT)
    {
      name = ActiveConstants.getAccountNameByActive(item);
    } else if (groupType === ActiveConstants.BY_COMPANY)
    {
      name = ActiveConstants.getActiveCompany(item);
    } else if (groupType === ActiveConstants.BY_NAME)
    {
      name = Active.getName(item);
    } else if (groupType === ActiveConstants.BY_CURRENCY)
    {
      name = ActiveConstants.getActiveCurrency(item);
    } else if (groupType === ActiveConstants.BY_BOND_DATE)
    {
      name = ActiveConstants.getBondDate(item);
    } else if (groupType === ActiveConstants.BY_BROKER_NAME)
    {
      name = ActiveConstants.getBondDate(item);
    }

    return name;
  }

  static prepareSortedItems(actives, firstGroupType)
  {
    let sortedItems = [];
    let activeIndex = [];

    actives.map((item) =>
    {
      if (ActiveConstants.isPackage(item.type_id))
      {
        item.attributes?.buy_trades?.map((trade) =>
        {
          let name = CaseGroupHelper.getNameByGroup(item, firstGroupType);

          let key = item.id + name;

          if (activeIndex.indexOf(key) === -1)
          {
            activeIndex.push(key);
          }

          if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined')
          {
            sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({...item.attributes});

            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
          }

          sortedItems[activeIndex.indexOf(key)].attributes.buy_trades.push({...trade});
        });

        item.attributes?.sell_trades?.map((trade) =>
        {
          let name = CaseGroupHelper.getNameByGroup(item, firstGroupType);

          let key = item.id + name;

          if (activeIndex.indexOf(key) === -1)
          {
            activeIndex.push(key);
          }

          if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined')
          {
            sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({...item.attributes});

            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
          }

          sortedItems[activeIndex.indexOf(key)].attributes.sell_trades.push({...trade});


        });
      } else
      {
        let name = CaseGroupHelper.getNameByGroup(item, firstGroupType);

        let key = item.id + name + 'none';

        if (activeIndex.indexOf(key) === -1)
        {
          activeIndex.push(key);
        }

        if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined')
        {
          sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({...item.attributes});

          sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
          sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
        }
      }
    });

    return [sortedItems, activeIndex];
  }

  static groupThreeLevels(actives, firstGroupType, secondGroupType, getNameFunc)
  {
    let index = [];
    let indexSecond = [];
    let indexThird = [];
    let data = [];

    let [sortedItems, activeIndex] = CaseGroupHelper.prepareSortedItems(actives, firstGroupType)

    sortedItems.map((item) =>
    {
      let name = CaseGroupHelper.getNameByGroup(item, firstGroupType);

      if (index.indexOf(name) === -1)
      {
        index.push(name);

        let itemKey = index.indexOf(name);

        data[itemKey] = {};
        data[itemKey]['name'] = name;
        data[itemKey]['children'] = [];

        indexSecond[itemKey] = [];
        indexThird[itemKey] = [];
      }
    });

    sortedItems.map((item) =>
    {
      let firstName = CaseGroupHelper.getNameByGroup(item, firstGroupType);
      let secondName = CaseGroupHelper.getNameByGroup(item, secondGroupType);

      if (index.indexOf(firstName) !== -1)
      {

        let itemKey = index.indexOf(firstName);

        if (indexSecond[itemKey].indexOf(secondName) === -1)
        {
          indexSecond[itemKey].push(secondName);
        }

        let subItemKey = indexSecond[itemKey].indexOf(secondName);

        data[itemKey]['children'][subItemKey] = {};
        data[itemKey]['children'][subItemKey]['name'] = secondName;
        data[itemKey]['children'][subItemKey]['children'] = [];

        indexThird[itemKey][subItemKey] = [];
      }
    });

    let key = index.length;
    sortedItems.map((item) =>
    {
      let firstName = CaseGroupHelper.getNameByGroup(item, firstGroupType);
      let secondName = CaseGroupHelper.getNameByGroup(item, secondGroupType);

      if (item.valuation > 0)
      {
        let itemKey = index.indexOf(firstName);

        let subItemKey = indexSecond[itemKey].indexOf(secondName);

        let name = getNameFunc(item);

        if (indexThird[itemKey][subItemKey].indexOf(name) === -1)
        {
          indexThird[itemKey][subItemKey].push(name);
        }

        let subSubItemKey = indexThird[itemKey][subItemKey].indexOf(name);

        if (typeof data[itemKey]['children'][subItemKey]['children'][subSubItemKey] === 'undefined')
        {
          data[itemKey]['children'][subItemKey]['children'][subSubItemKey] = {}
          data[itemKey]['children'][subItemKey]['children'][subSubItemKey]['name'] = name;
          data[itemKey]['children'][subItemKey]['children'][subSubItemKey]['value'] = 0;
        }

        data[itemKey]['children'][subItemKey]['children'][subSubItemKey]['value'] += parseFloat(item.valuation)

        key++;
      }
    })

    return data;
  }

  static groupFourLevels(actives, firstGroupType, secondGroupType, thirdGroupType)
  {
    let index = [];
    let indexSecond = [];
    let data = [];

    let [sortedItems, activeIndex] = CaseGroupHelper.prepareSortedItems(actives, firstGroupType)

    let colorIndex = 0;
    let subColorIndex = 0;
    sortedItems.map((item) =>
    {
      let name = CaseGroupHelper.getNameByGroup(item, firstGroupType);

      if (index.indexOf(name) === -1)
      {
        index.push(name);

        let itemKey = index.indexOf(name);

        data[itemKey] = {};
        data[itemKey]['name'] = name;
        data[itemKey]['type'] = 'group';
        data[itemKey]['value1'] = 0;
        data[itemKey]['value2'] = 0;
        data[itemKey]['value3'] = 0;
        data[itemKey]['value4'] = 0;

        if (typeof Color.colors[colorIndex] === 'undefined')
        {
          colorIndex = 0;
        }

        data[itemKey]['colorIndex'] = colorIndex;
        data[itemKey]['color'] = Color.colors[colorIndex].color;
        colorIndex++;
      }
    });

    sortedItems.map((item) =>
    {
      let name = CaseGroupHelper.getNameByGroup(item, secondGroupType);

      if (index.indexOf(name) === -1)
      {
        index.push(name);

        let itemKey = index.indexOf(name);

        data[itemKey] = {};
        data[itemKey]['name'] = name;
        data[itemKey]['type'] = 'group';
        data[itemKey]['value1'] = 0;
        data[itemKey]['value2'] = 0;
        data[itemKey]['value3'] = 0;
        data[itemKey]['value4'] = 0;

        if (typeof Color.colors[colorIndex] === 'undefined')
        {
          colorIndex = 0;
        }

        data[itemKey]['colorIndex'] = colorIndex;
        // data[itemKey]['color'] = Color.colors[colorIndex].color;
        // colorIndex++;
      }
    });

    sortedItems.map((item) =>
    {
      let name = CaseGroupHelper.getNameByGroup(item, thirdGroupType);

      if (index.indexOf(name) === -1)
      {
        index.push(name);

        let itemKey = index.indexOf(name);

        data[itemKey] = {};
        data[itemKey]['name'] = name;
        data[itemKey]['type'] = 'group';
        data[itemKey]['value1'] = 0;
        data[itemKey]['value2'] = 0;
        data[itemKey]['value3'] = 0;
        data[itemKey]['value4'] = 0;

        if (typeof Color.colors[colorIndex] === 'undefined')
        {
          colorIndex = 0;
        }

        data[itemKey]['colorIndex'] = colorIndex;
        // data[itemKey]['color'] = Color.colors[colorIndex].color;
        // colorIndex++;
      }
    });

    let key = index.length;
    sortedItems.map((item) =>
    {
      let firstName = CaseGroupHelper.getNameByGroup(item, firstGroupType);
      let secondName = CaseGroupHelper.getNameByGroup(item, secondGroupType);
      let thirdName = CaseGroupHelper.getNameByGroup(item, thirdGroupType);

      if (item.valuation > 0)
      {
        let percent = item.factPercent;

        let type = Active.getName(item);
        let shortName = type;
        if (type.length > 38)
        {
          shortName = type.slice(0, 39) + '...';
        }

        data[key] = {};
        data[key]['name'] = shortName + ' - дох.: ' + Money.format((percent - 1) * 100, 2, ".", "") + '%';
        data[key]['type'] = 'active';
        data[key]['value1'] = parseFloat(item.valuation);
        data[key]['value2'] = 0;
        data[key]['value3'] = 0;

        let itemKey = index.indexOf(thirdName);

        data[itemKey]['value2'] += parseFloat(item.valuation);
        // colorIndex = data[itemKey]['colorIndex'];

        itemKey = index.indexOf(secondName);

        data[itemKey]['value3'] += parseFloat(item.valuation);

        itemKey = index.indexOf(firstName);

        data[itemKey]['value4'] += parseFloat(item.valuation);
        // colorIndex = data[itemKey]['colorIndex'];

        // let color = Color.colors[colorIndex];


        // if (typeof Color.colors[colorIndex].subColors[subColorIndex] === 'undefined') {
        //   subColorIndex = 0;
        // }
        // data[key]['color'] = Color.colors[colorIndex].subColors[subColorIndex];
        // subColorIndex++;

        key++;
      }
    })

    return data;
  }

  static group(actives, groupType, colors = Color.colors, sortCallback)
  {
    let index = [];
    let data = [];

    let sortedItems = [];
    let activeIndex = [];

    actives.map((item) =>
    {
      if (ActiveConstants.isPackage(item.type_id))
      {
        item.attributes?.buy_trades?.map((trade) =>
        {
          let name = CaseGroupHelper.getNameByGroup(item, groupType);

          let key = item.id + name;

          if (activeIndex.indexOf(key) === -1)
          {
            activeIndex.push(key);
          }

          if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined')
          {
            sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({...item.attributes});

            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
          }

          sortedItems[activeIndex.indexOf(key)].attributes.buy_trades.push({...trade});


        });

        item.attributes?.sell_trades?.map((trade) =>
        {
          let name = CaseGroupHelper.getNameByGroup(item, groupType);

          let key = item.id + name;

          if (activeIndex.indexOf(key) === -1)
          {
            activeIndex.push(key);
          }

          if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined')
          {
            sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({...item.attributes});

            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
          }

          sortedItems[activeIndex.indexOf(key)].attributes.sell_trades.push({...trade});


        });
      } else
      {
        let name = CaseGroupHelper.getNameByGroup(item, groupType);

        let key = item.id + name + 'none';

        if (activeIndex.indexOf(key) === -1)
        {
          activeIndex.push(key);
        }

        if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined')
        {
          sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({...item.attributes});

          sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
          sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
        }
      }
    });

    let colorIndex = 0;
    sortedItems.map((item) =>
    {
      let name = CaseGroupHelper.getNameByGroup(item, groupType);

      if (index.indexOf(name) === -1)
      {
        index.push(name);
      }

      let itemKey = index.indexOf(name);

      if (typeof data[itemKey] === 'undefined')
      {
        data[itemKey] = {};
        data[itemKey]['name'] = name;
        data[itemKey]['type'] = 'group';
        data[itemKey]['value1'] = 0;
        data[itemKey]['value2'] = 0;
        data[itemKey]['value3'] = 0;
      }

      data[itemKey]['value1'] += parseFloat(item.valuation);
    });

    if(typeof sortCallback === 'function')
    {
      data = data.sort(sortCallback);
    }

    data.map((item) =>
    {
      if (typeof colors[colorIndex] === 'undefined')
      {
        colorIndex = 0;
      }

      item.colorIndex = colorIndex;
      item.color = colors[colorIndex].color;
      colorIndex++;

      return item;
    })

    return data;
  }
}


export default CaseGroupHelper;
