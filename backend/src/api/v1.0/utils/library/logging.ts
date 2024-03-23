import colors from "@colors/colors";

export default class Logging {
  public static log = (args: any) => {
    this.info(args);
  };

  public static success = (...args: any) => {
    console.log(
      colors.grey(`[${new Date().toLocaleString()}]`),
      colors.brightGreen(" [SUCCESS]"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      colors.green(args)
    );
  };

  public static info = (...args: any) => {
    console.log(
      colors.grey(`[${new Date().toLocaleString()}]`),
      colors.brightCyan(" [INFO]"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      colors.cyan(args)
    );
  };

  public static warn = (...args: any) => {
    console.log(
      colors.grey(`[${new Date().toLocaleString()}]`),
      colors.brightYellow(" [WARN]"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      colors.yellow(args)
    );
  };

  public static error = (...args: any) => {
    console.log(
      colors.red(`[${new Date().toLocaleString()}]`),
      colors.brightRed(" [ERROR]"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      colors.red(args)
    );
  };
}
