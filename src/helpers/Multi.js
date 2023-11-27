export default class Multi
{
  static extend(...params)
  {
    var args = [];

    let length = params.length;
    for (var i = 0; i < length; i++)
    {
      if(i > 0)
      {
        args.push(params[i]);
      }
    }

    const creator = (parts, part) => part(parts);
    const extender = (...parts) => parts.reduce(creator, params[0]);

    return extender(...args)
  }
}