from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.trans.serializers import TranslateWordRequestSerializer, TranslateWordResponseSerializer

from drf_yasg import openapi
import json

from apps.trans.gen_ai.fetch_openai import fetch_openai
from apps.trans.gen_ai.prompts import translation_prompt


class TranslateWordView(APIView):
    @swagger_auto_schema(
        request_body=TranslateWordRequestSerializer,
        responses={
            200: openapi.Response(description="Successful response", schema=TranslateWordResponseSerializer),
            400: openapi.Response(description="Invalid input"),
            500: openapi.Response(description="Internal Server Error"),
        }
    )
    def post(self, request):
        serializer = TranslateWordRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        word = serializer.validated_data.get('word')
        language = serializer.validated_data.get('language', None)
        prompt = translation_prompt(word=word, language=language)

        try:
            completion = fetch_openai(prompt=prompt)
            content = completion.choices[0].message.content
            data = json.loads(content)

            response_serializer = TranslateWordResponseSerializer(data=data)
            if response_serializer.is_valid():
                return Response(response_serializer.validated_data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Invalid response format from OpenAI."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        except json.JSONDecodeError as e:
            return Response(
                {"error": "Error decoding JSON from OpenAI response."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
