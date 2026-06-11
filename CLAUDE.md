
In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.  

For a given claude code session, determine whether or not claude is running within the docker web container or running on the host OS.  Then, for each instruction below be sure to use the variant of the instruction that applies to running within or outside of docker.
## Sibling Projects

When referring to associated sibling projects in TODOs, requirements, designs, and implementation plans, they can be found in the parent directory of the current project.  If the jetbrains MCP server is connected then you can also use the jetbrains MCP server to access them.

## TODOs

Note that I often keep a list of TODOs in plans/requests/TODOs to keep track of tasks that I might not be able to work on right now - but, don't want to forget to take care of later.  Upon startup, it is a good idea to remind me if there are any incomplete tasks in that list.

## Plans  
  
- At the end of each plan, feel free to give me a list of unresolved questions to answer, if any. Make the questions extremely concise. Sacrifice grammar for the sake of concision.  
- Place all project markdown documents in the Obsidian vault at `notes-<project_name>`, where `<project_name>` is the basename of the project root directory (equivalent to `basename "$PWD"` in a shell).  
- When an implementation plan is complete, write the implementation plan to the `docs/plans` directory.  Be sure that the implementation plan filename ends with "-implementation".  Note that the obsidian vault has a symlink at `notes-<project_name>/plans/implementation` that links to the `docs/plans` dir in the root of the rails project.  Any "References" section links to implementation plans should point to the file in the `notes-<project_name>/plans/implementation` dir.
- When a design is complete, copy the design doc into the `notes-<project_name>/plans/design` directory.  Be sure that the design filename ends with "-design".
- Add a "References" section near the top of each implementation plan and design doc (eg: after the section containing the Overview/Goal/Architecture/Tech Stack items).  The References section should point to any requirements docs, design docs, and implementation plan docs associated with the current doc - but do NOT reference TODOs items.  The associated docs should appear as a list of markdown style links (example format: `- **Design Doc:** [2026-02-10-ad-import-persist-records-design](2026-02-10-ad-import-persist-records-design.md)`).  Common labels for links in the References section are: "Design Doc:", "Implementation Plan:", "Requirements:".  Other labels may be used when appropriate.  References between design and implementation docs should be relative (eg: in example-implementation.md a link to its design doc would look like `[example-design](../design/example-design.md)`)
- Diagram process flows and other charts using mermaid code-blocks where possible instead of text-based diagrams.  Restrict mermaid diagrams to using only GitHub-supported mermaid syntax.
- Prefer vertically oriented linear pipelines when creating mermaid diagrams if the nodes contain enough text to make them take up a lot of horizontal space.
- New design doc: Check `notes-<project_name>/plans/design/`. If more than 8 docs exist, move the oldest into `notes-<project_name>/plans/design/archived/`, keeping the 8 most recent. Check this archive when researching design history.
- New implementation doc: Check `notes-<project_name>/plans/implementation/`. If more than 8 docs exist, move the oldest into `notes-<project_name>/plans/implementation/archived/`, keeping the 8 most recent. Check this archive when researching implementation history.
- Screen mockups should be created as SVG images in the `notes-<project_name>/media/` dir.  They should be embedded into markdown documents using standard HTML notation `<img src="../../media/mockup.svg" alt="mockup" width="100%" />`.
- Create a runbook document under `notes-<project_name>/plans/runbooks/` for any implementation plan that includes manual steps required during deployment to staging or production.
  Manual steps include (but are not limited to): database migrations, rake tasks, cron job changes, data backfills, feature flag toggles, or any action that cannot be performed automatically by the deployment pipeline.
  Name the runbook using a timestamp and a descriptive slug, for example: `2026-04-28-master-search-cutover.md`.
  Each runbook must include:
  - Purpose and context
  - Preconditions and dependencies
  - Step-by-step instructions (ordered)
  - Verification steps
  - Rollback instructions

## Git Usage

- **Adding files to git commit / staging files**
	- Be careful about adding files.  The developer may often leave modified files un-committed while working on other tasks and features.
	- Do NOT add the `scratches/` directory to git.  It is an internal RubyMine dir which is dynamically shared between RubyMine projects.
	- Prefer granular commits instead of one big commit with lots of files.

- **Git Feature Branches**
	- When working on a change that is judged to be large enough to justify writing design and implementation docs, suggest moving to a feature branch if not already on one.  Try not to perform any significant work on the master/main branch.

- **dependabot pull requests**
	- When un-merged dependabot pull requests appear in github, do NOT merge them.
	- When finishing up a feature branch or committing work to main, if un-merged dependabot pull requests exist then remind the developer by listing those outstanding dependabot pull requests.

## ClaudeOnRails Configuration  
  
You are working on a Rails application. Review the ClaudeOnRails context file at @.claude-on-rails/context.md  
  
## Development Commands

All commands on the host OS are run via Docker wrapper scripts from project root.  If claude is running directly on the host OS then use these wrapper scripts:

```bash
./setup              # Initial setup or repair
./serve              # Start web server (port 3000)
./rails console      # Rails console
./rails <command>    # Any rails command
./bundle install     # Install gems
./mysql              # Interactive DB client selector
./bash               # Shell in web container
./backup             # Backup dev databases
./restore <conn> <file>  # Restore database
```

If claude code is running within the web docker container then when claude code needs to run commands, it should run them directly instead of using these docker helper scripts.  Remember to run rails-related scripts with `bundle exec` when claude code is running within the web container.

## Rails Generator Conventions

### Test Framework Decision Point
**IMPORTANT:** Before running any generator that creates test files, ask:
"Should I use RSpec or Test::Unit for this project?"

- If **RSpec**: append `--test-framework=rspec` to all `rails generate model/controller/scaffold` commands
- If **Test::Unit**: use default Rails behavior (no flag)
- Document the choice in this file after first decision

### Current Project Choice
[To be determined on first generator use]

### Generator Usage
If claude code is running within the web docker container then when creating pages, models, locals, etc. for the ad-builder rails app, ALWAYS use the various generators found WITHIN the `scaffold` script in the root of the rails project dir (but, don't use the `scaffold` script itself).  Analyze the script to determine the actual generators that should be used for various situations.  

The most common generators are listed below.  Note that for the ad-builder rails app, all web pages should use the styler:admin_scaffold.  

Be sure to substitute the appropriate model_name, fields, and options values.  If values have not already been provided then please prompt for them.

- Generate admin scaffold:
  ```bash
  bundle exec rails generate styler:admin_scaffold admin/#{model_name} #{fields.join(' ')} #{options.join(' ')} --model-name=#{model_name} --skip
  ```
- Generate model:
  ```bash
  bundle exec rails generate model #{model_name} #{fields.join(' ')} #{options.join(' ')} --test-framework=test_unit
  ```
- Generate locale:
  ```bash
  bundle exec rails generate styler:locale #{model_name} #{fields.join(' ')} #{options.join(' ')} --model-name=#{model_name} --skip
  ```

If claude code is running directly on the host OS then DO use the `scaffold` script because it is designed to be ran external to the docker container.

When claude is running on the host OS, execute the various scaffold generators as follows:

- Generate admin scaffold:
  ```bash
  ./rails generate styler:admin_scaffold admin/#{model_name} #{fields.join(' ')} #{options.join(' ')} --model-name=#{model_name} --skip
  ```
- Generate model:
  ```bash
  ./rails generate model #{model_name} #{fields.join(' ')} #{options.join(' ')} --test-framework=test_unit
  ```
- Generate locale:
  ```bash
  ./rails generate styler:locale #{model_name} #{fields.join(' ')} #{options.join(' ')} --model-name=#{model_name} --skip
  ```

## Running Tests

When running tests manually from the host OS, use the ./rails docker helper script.

```bash
./rails test                           # All tests
./rails test test/models/              # Directory
./rails test test/models/foo_test.rb   # Single file
./rails test test/models/foo_test.rb:42  # Single test (line number)
```

When running tests from claude code, either use the RubyMine MCP server, or run the test commands directly via `bundle exec rails test` when claude code runs from within the web docker container, or run via `./rails test` when running on the host OS directly.

RSpec also available and can be used if directed to do so: `./rails rspec spec/` (or within container with `bundle exec rails rspec spec/`).
  
## Running Browser Tests with Playwright MCP

Playwright MCP is installed and configured allowing control of a chromium browser on the host OS regardless of whether claude code is running within the docker container or directly on the host OS.  Use Playwright MCP for all browser use.  Use Playwright MCP during the design process to display mockups and images as needed.

## RubyMine MCP Server  
  
If claude code is running within the docker web container and Rubymine is running outside the docker web container on the host OS then when sending requests to the RubyMine MCP server, be sure to map project and file paths from `/app` to the actual project path as specified by the "IJ_MCP_SERVER_PROJECT_PATH" attribute for the "jetbrains" mcp server in `.mcp.json`.  
  
## Code Style - Language: Ruby   
  
- When defining class methods in Ruby, always use the `def self.method_name` style. - Do not use `class << self` or `def ClassName.method_name` for new or edited code. - Match this style when editing existing Ruby files in this project.    
- Use yardoc style comments for ruby class and module members.  
- Service class naming conventions:
	- Prefer using service class names that don't end in "service"
	- Avoid using "call" as the main entry point method - prefer a method name that flows with the class name (eg: "SuggestedS3BrowserPath.for(), SuggestedS3BrowserPath.fallback(), etc.")

    
## API Documentation  
  
- Use the routes.rb and controllers in the api/v* dirs to generate a minimal valid OpenAPI 3.1 spec for these endpoints in YAML.  
- Write the OpenAPI doc to `docs/openapi/openapi.yaml`  
- Over time, as new endpoints are added or existing endpoints updated, extend or refactor the OpenAPI docs to reflect those changes.