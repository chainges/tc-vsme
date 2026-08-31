import { mkdirSync, readdirSync, lstatSync, statSync, rmSync, symlinkSync, cpSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dir, "..");
const SOURCE = path.join(ROOT, ".agents", "skills");
const FANOUTS = [".claude/skills", ".kiro/skills", ".augment/skills", ".windsurf/skills"];
const COPY_MODE = process.platform === "win32" || process.env.SKILLS_SYNC_COPY === "1";
const CHECK_ONLY = process.argv.includes("--check");

type Problem = { fanout: string; name: string; issue: string };

function sourceSkills(): string[] {
	return readdirSync(SOURCE).filter((name) => {
		const p = path.join(SOURCE, name);
		return statSync(p).isDirectory() && existsSync(path.join(p, "SKILL.md"));
	});
}

function desiredTarget(fanout: string, name: string): string {
	return path.relative(path.join(ROOT, fanout), path.join(SOURCE, name));
}

function entryState(fanout: string, name: string): "missing" | "link-ok" | "link-wrong" | "dir" | "file" {
	const p = path.join(ROOT, fanout, name);
	let st;
	try {
		st = lstatSync(p);
	} catch {
		return "missing";
	}
	if (st.isSymbolicLink()) {
		try {
			const real = statSync(p);
			if (real.isDirectory() && statSync(path.join(SOURCE, name)).isDirectory()) {
				return "link-ok";
			}
			return "link-wrong";
		} catch {
			return "link-wrong";
		}
	}
	if (st.isDirectory()) return "dir";
	return "file";
}

function fix(fanout: string, name: string, state: string): Problem[] {
	const p = path.join(ROOT, fanout, name);
	const problems: Problem = { fanout, name, issue: state };
	if (CHECK_ONLY) return [problems];
	if (state !== "missing") {
		rmSync(p, { recursive: true, force: true });
	}
	if (COPY_MODE) {
		cpSync(path.join(SOURCE, name), p, { recursive: true, force: true });
	} else {
		symlinkSync(desiredTarget(fanout, name), p, "dir");
	}
	console.log(`  ${COPY_MODE ? "copied" : "linked"} ${fanout}/${name} (${state})`);
	return [];
}

function syncFanout(fanout: string, source: string[]): Problem[] {
	const dir = path.join(ROOT, fanout);
	mkdirSync(dir, { recursive: true });
	const problems: Problem[] = [];
	for (const name of source) {
		const state = entryState(fanout, name);
		if (state === "link-ok") continue;
		problems.push(...fix(fanout, name, state));
	}
	const present = new Set(readdirSync(dir));
	for (const extra of present) {
		if (source.includes(extra)) continue;
		const p = path.join(dir, extra);
		const st = lstatSync(p);
		if (st.isSymbolicLink() || st.isFile()) {
			if (CHECK_ONLY) {
				problems.push({ fanout, name: extra, issue: "stale-entry" });
			} else {
				rmSync(p, { recursive: true, force: true });
				console.log(`  removed stale ${fanout}/${extra}`);
			}
		} else if (CHECK_ONLY) {
			problems.push({ fanout, name: extra, issue: "unmirrored-real-dir" });
		} else {
			console.warn(`  WARN: real dir ${fanout}/${extra} not in .agents/skills — left alone`);
		}
	}
	return problems;
}

function main(): number {
	if (!existsSync(SOURCE)) {
		console.error(`source of truth missing: ${SOURCE}`);
		return 1;
	}
	const source = sourceSkills();
	console.log(
		`${CHECK_ONLY ? "checking" : "syncing"} ${source.length} skills from .agents/skills (${COPY_MODE ? "copy mode" : "symlink mode"})`,
	);
	let problems: Problem[] = [];
	for (const fanout of FANOUTS) {
		problems = problems.concat(syncFanout(fanout, source));
	}
	if (problems.length > 0) {
		console.error(`\n${problems.length} problem(s):`);
		for (const { fanout, name, issue } of problems) {
			console.error(`  ${fanout}/${name}: ${issue}`);
		}
		console.error("\nrun: bun run skills:sync");
		return 1;
	}
	console.log("\nall fan-outs match .agents/skills");
	return 0;
}

process.exit(main());
