export default class ActiveGoalItemsConstants
{
  static PLAN = 1//'Плановый платёж'
  static ALREADY = 2//'Уже отложено'

  static items()
  {
    return [
      {id: 1, name: 'Плановый платёж'},
      {id: 2, name: 'Уже отложено'}
    ]
  }
}