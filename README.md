# kv_store
A version controlled key-value store we can query from

#Steps:
1) create mysql database 'kv_store'
2) create table 'store'
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `created_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `key` varchar(40) NOT NULL,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#clone this repository and run following command in the same directory
3) node index.js

#Postman:
GET request
http://localhost:3000/object/myKey?timestamp=1530390646

POST request
http://localhost:3000/object/myKey
post body --> raw --> select JSON(application/json) (Headers: Content-Type -> application/json)
{"object": {"someKey":"someValue"}}

#Extras:
#Preferences.sublime.settings - User
{
	"file_exclude_patterns":
	[
		"*.tmTheme.cache",
		"*.tmPreferences.cache",
		"*.tmLanguage.cache",
		"*.pyc",
		"*.pyo",
		"*.exe",
		"*.dll",
		"*.obj",
		"*.o",
		"*.a",
		"*.lib",
		"*.so",
		"*.dylib",
		"*.ncb",
		"*.sdf",
		"*.suo",
		"*.pdb",
		"*.idb",
		".DS_Store",
		"*.class",
		"*.psd",
		"*.db",
		"*.log",
		"package-lock.json",
		"yarn.lock",
		".gitignore"
	],
	"folder_exclude_patterns":
	[
		".svn/",
		"logs",
		".git",
		".git/",
		".hg",
		"CVS",
		"node_modules",
		"bower_components/"
	],
	"font_size": 12,
	"ignored_packages":
	[
		"Vintage"
	]
}
