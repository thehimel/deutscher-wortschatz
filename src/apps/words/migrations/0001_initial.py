# Generated by Django 4.2.11 on 2024-03-10 22:14

import apps.base.utils.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(editable=False)),
                ("article", models.CharField(max_length=5, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Bundle",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(editable=False)),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField(blank=True, default="", null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Image",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "title",
                    models.CharField(
                        max_length=100, unique=True, validators=[apps.base.utils.validators.validate_alphanumeric]
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        default="defaults/word/image.jpg",
                        upload_to="words/",
                        validators=[apps.base.utils.validators.validate_file_size],
                    ),
                ),
                ("description", models.TextField(blank=True, default="", null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Language",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "title",
                    models.CharField(
                        choices=[
                            ("af", "Afrikaans"),
                            ("ar", "Arabic"),
                            ("ar-dz", "Algerian Arabic"),
                            ("ast", "Asturian"),
                            ("az", "Azerbaijani"),
                            ("bg", "Bulgarian"),
                            ("be", "Belarusian"),
                            ("bn", "Bengali"),
                            ("br", "Breton"),
                            ("bs", "Bosnian"),
                            ("ca", "Catalan"),
                            ("ckb", "Central Kurdish (Sorani)"),
                            ("cs", "Czech"),
                            ("cy", "Welsh"),
                            ("da", "Danish"),
                            ("de", "German"),
                            ("dsb", "Lower Sorbian"),
                            ("el", "Greek"),
                            ("en", "English"),
                            ("en-au", "Australian English"),
                            ("en-gb", "British English"),
                            ("eo", "Esperanto"),
                            ("es", "Spanish"),
                            ("es-ar", "Argentinian Spanish"),
                            ("es-co", "Colombian Spanish"),
                            ("es-mx", "Mexican Spanish"),
                            ("es-ni", "Nicaraguan Spanish"),
                            ("es-ve", "Venezuelan Spanish"),
                            ("et", "Estonian"),
                            ("eu", "Basque"),
                            ("fa", "Persian"),
                            ("fi", "Finnish"),
                            ("fr", "French"),
                            ("fy", "Frisian"),
                            ("ga", "Irish"),
                            ("gd", "Scottish Gaelic"),
                            ("gl", "Galician"),
                            ("he", "Hebrew"),
                            ("hi", "Hindi"),
                            ("hr", "Croatian"),
                            ("hsb", "Upper Sorbian"),
                            ("hu", "Hungarian"),
                            ("hy", "Armenian"),
                            ("ia", "Interlingua"),
                            ("id", "Indonesian"),
                            ("ig", "Igbo"),
                            ("io", "Ido"),
                            ("is", "Icelandic"),
                            ("it", "Italian"),
                            ("ja", "Japanese"),
                            ("ka", "Georgian"),
                            ("kab", "Kabyle"),
                            ("kk", "Kazakh"),
                            ("km", "Khmer"),
                            ("kn", "Kannada"),
                            ("ko", "Korean"),
                            ("ky", "Kyrgyz"),
                            ("lb", "Luxembourgish"),
                            ("lt", "Lithuanian"),
                            ("lv", "Latvian"),
                            ("mk", "Macedonian"),
                            ("ml", "Malayalam"),
                            ("mn", "Mongolian"),
                            ("mr", "Marathi"),
                            ("ms", "Malay"),
                            ("my", "Burmese"),
                            ("nb", "Norwegian Bokmål"),
                            ("ne", "Nepali"),
                            ("nl", "Dutch"),
                            ("nn", "Norwegian Nynorsk"),
                            ("os", "Ossetic"),
                            ("pa", "Punjabi"),
                            ("pl", "Polish"),
                            ("pt", "Portuguese"),
                            ("pt-br", "Brazilian Portuguese"),
                            ("ro", "Romanian"),
                            ("ru", "Russian"),
                            ("sk", "Slovak"),
                            ("sl", "Slovenian"),
                            ("sq", "Albanian"),
                            ("sr", "Serbian"),
                            ("sr-latn", "Serbian Latin"),
                            ("sv", "Swedish"),
                            ("sw", "Swahili"),
                            ("ta", "Tamil"),
                            ("te", "Telugu"),
                            ("tg", "Tajik"),
                            ("th", "Thai"),
                            ("tk", "Turkmen"),
                            ("tr", "Turkish"),
                            ("tt", "Tatar"),
                            ("udm", "Udmurt"),
                            ("uk", "Ukrainian"),
                            ("ur", "Urdu"),
                            ("uz", "Uzbek"),
                            ("vi", "Vietnamese"),
                            ("zh-hans", "Simplified Chinese"),
                            ("zh-hant", "Traditional Chinese"),
                        ],
                        max_length=7,
                        unique=True,
                    ),
                ),
                ("articles", models.ManyToManyField(blank=True, to="words.article")),
            ],
        ),
        migrations.CreateModel(
            name="PartOfSpeech",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=20, unique=True)),
                (
                    "bundle",
                    models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="words.bundle"),
                ),
            ],
            options={
                "verbose_name": "Part of Speech",
                "verbose_name_plural": "Parts of Speech",
                "unique_together": {("title", "bundle")},
            },
        ),
        migrations.CreateModel(
            name="Word",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(editable=False)),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField(blank=True, default="", null=True)),
                ("sentence", models.TextField(blank=True, default="", null=True)),
                (
                    "level",
                    models.CharField(
                        choices=[("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c1", "C1"), ("c2", "C2")],
                        max_length=2,
                    ),
                ),
                ("hidden", models.BooleanField(default=False)),
                ("articles", models.ManyToManyField(blank=True, to="words.article")),
                ("language", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="words.language")),
                ("parts_of_speech", models.ManyToManyField(to="words.partofspeech", verbose_name="Parts of Speech")),
            ],
            options={
                "unique_together": {("title", "language")},
            },
        ),
        migrations.AddField(
            model_name="language",
            name="parts_of_speech",
            field=models.ManyToManyField(to="words.partofspeech", verbose_name="Parts of Speech"),
        ),
        migrations.AddField(
            model_name="bundle",
            name="image",
            field=models.ManyToManyField(blank=True, to="words.image"),
        ),
        migrations.AddField(
            model_name="bundle",
            name="words",
            field=models.ManyToManyField(blank=True, to="words.word"),
        ),
    ]
