import Money from "./Money";

export default class Plan
{
  static balance(item)
  {
    let balance = 0;

    if (item.plan_income)
    {
      balance += Money.toDigits(item.plan_income)
    }
    if (item.outcome)
    {
      balance -= Money.toDigits(item.outcome)
    }
    if (item.obligation)
    {
      balance -= Money.toDigits(item.obligation)
    }
    if (item.additional_outcome)
    {
      balance -= Money.toDigits(item.additional_outcome)
    }
    if (item.plan_goals)
    {
      balance -= Money.toDigits(item.plan_goals)
    }
    if (item.retired_goals)
    {
      balance -= Money.toDigits(item.retired_goals)
    }

    return balance;
  }

  static calcIncome(months, item, user)
  {
    let income_neutral = Money.toDigits(item['income_neutral']);
    let income_negative = Money.toDigits(item['income_negative']);
    let income_positive = Money.toDigits(item['income_positive']);
    let add_income = Money.toDigits(item['additional_income']);

    income_neutral = income_neutral > 0 ? income_neutral : 0;
    income_negative = income_negative > 0 ? income_negative : 0;
    income_positive = income_positive > 0 ? income_positive : 0;

    let percent_neutral = Money.toDigits(user['percent_neutral']);
    let percent_negative = Money.toDigits(user['percent_negative']);
    let percent_positive = Money.toDigits(user['percent_positive']);

    if (percent_neutral === 0 && percent_negative === 0)
    {
      percent_positive = 100;
    }

    if (percent_neutral === 0 && percent_positive === 0)
    {
      percent_negative = 100;
    }

    if (percent_negative === 0 && percent_positive === 0)
    {
      percent_neutral = 100;
    }

    //пропорция если одно ищ полей не заполнено, то оставшиеся два будут  делиться
    if (percent_neutral !== 0 && percent_negative !== 0 && percent_positive === 0)
    {
      let sum = percent_neutral + percent_negative;

      percent_neutral = 100 / sum * percent_neutral;
      percent_negative = 100 / sum * percent_negative;
    }

    if (percent_neutral !== 0 && percent_positive !== 0 && percent_negative === 0)
    {
      let sum = percent_neutral + percent_positive;

      percent_neutral = 100 / sum * percent_neutral;
      percent_positive = 100 / sum * percent_positive;
    }

    if (percent_negative !== 0 && percent_positive !== 0 && percent_neutral === 0)
    {
      let sum = percent_negative + percent_positive;

      percent_negative = 100 / sum * percent_negative;
      percent_positive = 100 / sum * percent_positive;
    }

    let tax = Money.toDigits(item['tax']);
    let income = ((income_neutral / 100 * percent_neutral) + (income_negative / 100 * percent_negative) + (income_positive / 100 * percent_positive));

    if (income > 0)
    {
      //по закону если доход больше 5 млн, то подоходный налог будет 15%
      //работает в том случае, если пользователь указано стандартный 13% налог на доходы
      if (tax === 13 && income >= 5000000)
      {
        let firstPart = 5000000;
        let secondPart = income - 5000000;

        return income - ((firstPart / 100 * 13) + (secondPart / 100 * 15)) + add_income;
      } else
      {
        return income - (income / 100 * tax) + add_income;
      }
    } else
    {
      return add_income;
    }
  }
}

export {Plan}