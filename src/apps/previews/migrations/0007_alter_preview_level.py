# Generated by Django 4.2.15 on 2024-08-20 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("previews", "0006_preview_plural"),
    ]

    operations = [
        migrations.AlterField(
            model_name="preview",
            name="level",
            field=models.CharField(
                blank=True,
                choices=[("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c1", "C1"), ("c2", "C2")],
                max_length=2,
                null=True,
            ),
        ),
    ]
