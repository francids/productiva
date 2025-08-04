{ pkgs, ... }: {
  channel = "stable-24.11";
  packages = [
    pkgs.nodejs_22
    pkgs.pnpm
  ];
  idx = {
    extensions = [ "Angular.ng-template" "esbenp.prettier-vscode" ];
    workspace = {
      onCreate = {
        pnpm-setup = "pnpm setup";
        pnpm-install = "pnpm --prefix web install";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["pnpm" "--prefix" "web" "start" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };
  };
}
