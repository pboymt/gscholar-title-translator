import p from '../package.json';

interface UserScriptOptions {
    name: string;
    namespace: string;
    description: string;
    version: string;
    author: string;
    homepage: string;
    homepageURL: string;
    website: string;
    source: string;
    icon: string;
    iconURL: string;
    defaulticon: string;
    icon64: string;
    icon64URL: string;
    updateURL: string;
    downloadURL: string;
    supportURL: string;
    include: string[];
    match: string[];
    exclude: string[];
    require: string[];
    resources: string[];
    connect: string[];
    'run-at': string;
    grant: string[];
    antifeature: string[];
    noframes: boolean;
    nocompat: string;
}

interface PackageJsonOptions {
    name: string;
    version: string;
    description: string;
    author: string;
    homepage: string;
    userscript: Partial<UserScriptOptions>;
    dependencies: { [key: string]: string };
}

const packageJson = p as Partial<PackageJsonOptions>;
const userscript = p.userscript as Partial<UserScriptOptions>;

export function generateHeader() {
    const dependencyVersionRegExp = /^[\^~]/;
    const headers = ['// ==UserScript=='];
    // name
    if (packageJson.name || userscript.name) {
        headers.push(`// @name ${userscript.name ?? packageJson.name}`);
    } else {
        throw new Error('No name specified in package.json');
    }
    // namespace
    if (userscript.namespace) {
        headers.push(`// @namespace ${userscript.namespace}`);
    }
    // version
    if (packageJson.version || userscript.version) {
        headers.push(`// @version ${userscript.version ?? packageJson.version}`);
    } else {
        throw new Error('No version specified in package.json');
    }
    // description
    if (packageJson.description || userscript.description) {
        headers.push(`// @description ${userscript.description ?? packageJson.description}`);
    }
    // author
    if (packageJson.author || userscript.author) {
        headers.push(`// @author ${userscript.author ?? packageJson.author}`);
    }
    // homepage, homepageURL, website, source
    if (packageJson.homepage || userscript.homepage) {
        headers.push(`// @homepage ${userscript.homepage ?? packageJson['homepage']}`);
    } else if (userscript.homepageURL) {
        headers.push(`// @homepageURL ${userscript.homepageURL}`);
    } else if (userscript.website) {
        headers.push(`// @website ${userscript.website}`);
    } else if (userscript.source) {
        headers.push(`// @source ${userscript.source}`);
    }
    // icon, iconURL, defaulticon
    if (userscript.icon) {
        headers.push(`// @icon ${userscript.icon}`);
    } else if (userscript.iconURL) {
        headers.push(`// @iconURL ${userscript.iconURL}`);
    } else if (userscript.defaulticon) {
        headers.push(`// @defaulticon ${userscript.defaulticon}`);
    }
    // icon64, icon64URL
    if (userscript.icon64) {
        headers.push(`// @icon64 ${userscript.icon64}`);
    } else if (userscript.icon64URL) {
        headers.push(`// @icon64URL ${userscript.icon64URL}`);
    }
    // updateURL
    if (userscript.updateURL) {
        headers.push(`// @updateURL ${userscript.updateURL}`);
    }
    // downloadURL
    if (userscript.downloadURL) {
        headers.push(`// @downloadURL ${userscript.downloadURL}`);
    }
    // supportURL
    if (userscript.supportURL) {
        headers.push(`// @supportURL ${userscript.supportURL}`);
    }
    // include
    if (userscript.include && userscript.include instanceof Array) {
        for (const include of userscript.include) {
            headers.push(`// @include ${include}`);
        }
    }
    // match
    if (userscript.match && userscript.match instanceof Array) {
        for (const match of userscript.match) {
            headers.push(`// @match ${match}`);
        }
    }
    // exclude
    if (userscript.exclude && userscript.exclude instanceof Array) {
        for (const exclude of userscript.exclude) {
            headers.push(`// @exclude ${exclude}`);
        }
    }
    // require
    if (packageJson.dependencies) {
        for (const dependencyName in packageJson.dependencies) {
            const dependencyVersion = packageJson.dependencies[dependencyName].replace(dependencyVersionRegExp, '');
            headers.push(`// @require https://cdn.jsdelivr.net/npm/${dependencyName}@${dependencyVersion}`);
        }
    }
    if (userscript.require && userscript.require instanceof Array) {
        for (const require of userscript.require) {
            headers.push(`// @require ${require}`);
        }
    }
    // resources
    if (userscript.resources && userscript.resources instanceof Array) {
        for (const resource of userscript.resources) {
            headers.push(`// @resource ${resource}`);
        }
    }
    // connect
    if (userscript.connect && userscript.connect instanceof Array) {
        for (const connect of userscript.connect) {
            headers.push(`// @connect ${connect}`);
        }
    }
    // run-at
    if (userscript['run-at']) {
        headers.push(`// @run-at ${userscript['run-at']}`);
    }
    // grant
    if (userscript.grant && userscript.grant instanceof Array) {
        for (const grant of userscript.grant) {
            headers.push(`// @grant ${grant}`);
        }
    }
    // antifeature
    if (userscript.antifeature && userscript.antifeature instanceof Array) {
        for (const antifeature of userscript.antifeature) {
            headers.push(`// @antifeature ${antifeature}`);
        }
    }
    // noframes
    if (userscript.noframes) {
        headers.push('// @noframes');
    }
    // nocompat
    if (userscript.nocompat) {
        headers.push(`// @nocompat ${userscript.nocompat}`);
    }
    headers.push('// ==/UserScript==\n')
    return headers.join('\n');
}