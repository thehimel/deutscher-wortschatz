# Generated by Django 4.2.11 on 2024-03-27 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("words", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="language",
            name="name",
            field=models.CharField(default="", editable=False, max_length=100),
            preserve_default=False,
        ),
    ]