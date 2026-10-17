# WORKSPACE RULES & PERMANENT DIRECTORY PROTECTION

## AUTHORISED PROJECT ROOT
All portfolio development must occur exclusively within:
`C:\Users\Asus\Desktop\Portfolio Website`

## FORBIDDEN DEVELOPMENT DIRECTORY
Never read, edit, create, delete, rename or execute project files inside:
`C:\Users\Asus\OneDrive\Desktop\Portfolio Website`

This duplicate is an outdated copy and must NEVER be used for active development.

## MANDATORY VERIFICATION
Before executing every coding task:
1. Verify the absolute project root is `C:\Users\Asus\Desktop\Portfolio Website`.
2. Verify the terminal working directory (`cwd`) is `C:\Users\Asus\Desktop\Portfolio Website`.
3. Verify that any target file for editing, reading, or deletion resides strictly within `C:\Users\Asus\Desktop\Portfolio Website`.
4. Verify that the active development server (e.g. Vite on port 5173) serves from `C:\Users\Asus\Desktop\Portfolio Website`.

If any path points to the OneDrive copy, **STOP IMMEDIATELY**.
Do not silently switch directories or fall back to OneDrive.

## FILE OPERATIONS
- All source modifications, additions, and deletions must remain inside the authorised project: `C:\Users\Asus\Desktop\Portfolio Website`.
- Do not use similarly named files from other portfolio copies.
- Do not modify external directories through absolute paths.
- Do not use the OneDrive project as a fallback.

## DEVELOPMENT SERVER
- Start Vite development servers only from `C:\Users\Asus\Desktop\Portfolio Website`.
- Before starting a server, check for existing Vite processes (`netstat -ano` / `Get-CimInstance Win32_Process`).
- Never start a development server from the OneDrive copy.

## FAILURE BEHAVIOUR
If the authorised project (`C:\Users\Asus\Desktop\Portfolio Website`) cannot be accessed:
**STOP.** Report the problem directly to the user. Do not attempt to modify another project copy.

## REPORTING
For every coding task, report:
- Verified project root (absolute path).
- Files modified (absolute paths).
- Production build result, if performed.
